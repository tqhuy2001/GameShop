from fastapi import APIRouter, HTTPException, Depends, status
from fastapi import File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional, Annotated
import os

from app.core.dependencies import get_db
from app.schemas import game as game_schemas
from app.api.endpoints.login import oauth2
from app.models import game as game_models
from app.models import game_images as game_images_models
from app.config import settings

game = APIRouter()

@game.get('/get-all-games', response_model=list[game_schemas.Game])
def get_all_games(db: Session = Depends(get_db)):
    db_games = db.query(game_models.Game).all()
    if len(db_games) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any games')
    return db_games


@game.get('/get-game-id/{game_id}', response_model=game_schemas.Game)
def get_game_by_id(game_id: int, db: Session = Depends(get_db)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    return db_game


@game.get('/search', response_model=list[game_schemas.Game])
def search_games_by_name(search: Optional[str] = '', limit: int = 100, db: Session = Depends(get_db)):
    db_game = db.query(game_models.Game).filter(game_models.Game.name.contains(search)).limit(limit).all()
    if len(db_game) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    return db_game


@game.post('/add', status_code=status.HTTP_201_CREATED)
def add_game(game: game_schemas.GameIn, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.name == game.name).first()
    if db_game:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Game already exists')
    new_game = game_models.Game(**game.dict(), user_created_id=current_user.id)
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return {'msg': 'Successfully created game'}


@game.patch('/update-main-image/{game_id}', status_code=status.HTTP_200_OK)
async def update_main_image(game_id: int, main_image: Annotated[UploadFile, File()], db: Session = Depends(get_db),
                            current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')
    contents = await main_image.read()
    parent_dir = settings.games_images_file_path
    directory = 'game' + str(game_id)
    path = os.path.join(parent_dir, directory)
    try:
        os.mkdir(path)
    except:
        pass
    parent_dir = parent_dir + directory + '\\\\'
    main_image_name = 'main_image' + '.png'
    try:
        file_path = f'{parent_dir}{main_image_name}'
        with open(file_path, 'wb') as f:
            f.write(contents)
    except Exception as e:
        return {'msg': e.args}
    db_main_image = parent_dir.replace('\\\\', '/')
    db_game.main_image = db_main_image + main_image_name
    db.commit()
    return {'msg': 'Successfully add main image'}


@game.post('/add-images/{game_id}', status_code=status.HTTP_200_OK)
async def add_images(game_id: int, images: list[UploadFile] = File(...), db: Session = Depends(get_db),
                     current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')
    img_games = db.query(game_images_models.GameImages.game_id,
                         (func.count(game_images_models.GameImages.image)).label('counter')).filter(
        game_images_models.GameImages.game_id == game_id).group_by(game_images_models.GameImages.game_id).first()

    if img_games is None:
        i = 1
    else:
        i = img_games.counter + 1

    for image in images:
        contents = await image.read()
        parent_dir = settings.games_images_file_path
        directory = 'game' + str(game_id)
        path = os.path.join(parent_dir, directory)
        try:
            os.mkdir(path)
        except:
            pass
        parent_dir = parent_dir + directory + '\\\\'
        image_name = 'image' + str(i) + '.png'
        try:
            file_path = f'{parent_dir}' + f'{image_name}'
            with open(file_path, 'wb') as f:
                f.write(contents)
        except Exception as e:
            return {'msg': e.args}
        db_image = file_path.replace('\\\\', '/')
        new_image = game_images_models.GameImages(game_id=game_id, image=db_image)
        db.add(new_image)
        db.commit()
        i += 1

    return {'msg': 'Successfully add images to game'}

@game.delete('/delete/{game_id}', status_code=status.HTTP_200_OK)
def delete_game(game_id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    db.delete(db_game)
    db.commit()
    return {'msg': 'Successfully deleted game'}


@game.put('/update-game/{game_id}', status_code=status.HTTP_200_OK)
def update_game(game_id: int, update_game: game_schemas.GameIn, db: Session = Depends(get_db),
                current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    db_game.name = update_game.name
    db_game.price = update_game.price
    db_game.description = update_game.description
    db.commit()
    db.refresh(db_game)
    return {'msg': 'Successfully updated game'}
