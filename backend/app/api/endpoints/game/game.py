from datetime import timedelta

from fastapi import APIRouter, HTTPException, Depends, status
from fastapi import File, UploadFile
from sqlalchemy.orm import Session
from sqlalchemy import func
from firebase_admin import storage
from sqlalchemy.sql.functions import count

from app.core.dependencies import get_db
from app.schemas import game as game_schemas
from app.api.endpoints.login import oauth2
from app.models import game as game_models
from app.models import game_like as game_like_models
from app.models import game_categories as game_categories_models
from app.schemas import game_categories as game_categories_schemas
from app.models import game_images as game_images_models

game = APIRouter()

@game.get('/get-all-games', response_model=list[game_schemas.Game])
async def get_all_games(db: Session = Depends(get_db)):
    db_games = db.query(game_models.Game).all()
    return db_games

@game.options('/like/{game_id}', status_code=status.HTTP_200_OK)
async def like_game(game_id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game has not existed')
    db_like_game = db.query(game_like_models.GameLike).filter(game_like_models.GameLike.user_id == current_user.id,
                                                              game_like_models.GameLike.game_id == game_id).first()
    if db_like_game is None:
        new_like = game_like_models.GameLike(user_id=current_user.id, game_id=game_id)
        db.add(new_like)
        db.commit()
        return {'detail': 'Liked game'}
    else:
        db.delete(db_like_game)
        db.commit()
        return {'detail': 'Disliked game'}

@game.get('/get-game-id/{game_id}', response_model=game_schemas.Game)
async def get_game_by_id(game_id: int, db: Session = Depends(get_db)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    return db_game

@game.get('/get-images/{game_id}', response_model=list[game_schemas.GameImage])
async def get_images_by_id(game_id: int, db: Session = Depends(get_db)):
    db_game = db.query(game_images_models.GameImages).filter(game_images_models.GameImages.game_id == game_id).all()
    return db_game

@game.post('/add', status_code=status.HTTP_201_CREATED)
async def add_game(game: game_schemas.GameIn, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.name == game.name).first()
    if db_game:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Game already exists')
    new_game = game_models.Game(**game.model_dump(), user_created_name=current_user.username)
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return {'detail': 'Successfully created game'}

@game.get('/get-categories-id/{game_id}', response_model=list[game_categories_schemas.GameCategoryOut])
async def get_categories_by_gameid(game_id: int, db: Session = Depends(get_db)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')
    db_game = db.query(game_categories_models.GameCategories.category).filter(game_categories_models.GameCategories.game_id == game_id).all()
    return db_game

@game.post('/add-category', status_code=status.HTTP_201_CREATED)
async def add_category(game_id: int, category: str, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')
    db_game = db.query(game_categories_models.GameCategories).filter(game_categories_models.GameCategories.category == category, game_categories_models.GameCategories.game_id == game_id).first()
    if db_game:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Category has already existed')
    new_category = game_categories_models.GameCategories(game_id=game_id, category=category)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return {'detail': 'Successfully created category'}

@game.delete('/delete-category/{id}', status_code=status.HTTP_200_OK)
async def delete_category(id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game_category = db.query(game_categories_models.GameCategories).filter(game_categories_models.GameCategories.id == id).first()
    if db_game_category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found category of game')
    db.delete(db_game_category)
    db.commit()
    return {'detail': 'Successfully deleted category of game'}

@game.put('/update-category/{id}', status_code=status.HTTP_200_OK)
async def update_category(id: int, category: str, db: Session = Depends(get_db),
                current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_category = db.query(game_categories_models.GameCategories).filter(game_categories_models.GameCategories.id == id).first()
    if db_category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found category of game')
    db_category.category = category
    db.commit()
    db.refresh(db_category)
    return {'detail': 'Successfully updated category of game'}

@game.patch('/update-main-image/{game_id}', status_code=status.HTTP_200_OK)
async def update_main_image(game_id: int, main_image: UploadFile = File(...), db: Session = Depends(get_db),
                            current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You do not have permission')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if not db_game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')

    bucket = storage.bucket()
    blob = bucket.blob(f'images/games/game{game_id}/main_image.png')
    blob.upload_from_file(main_image.file, content_type=main_image.content_type)
    url = blob.generate_signed_url(expiration=timedelta(days=1000))

    db_game.main_image = url
    db.commit()

    return {'detail': 'Successfully updated main image'}


@game.post('/add-images/{game_id}', status_code=status.HTTP_200_OK)
async def add_images(game_id: int, images: list[UploadFile] = File(...), db: Session = Depends(get_db),
                     current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You do not have permission')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if not db_game:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')

    bucket = storage.bucket()
    current_amount_images = db.query(func.count(game_images_models.GameImages.image).label('amount')).filter(game_images_models.GameImages.game_id == game_id).first()
    current_amount_images = current_amount_images.amount + 1

    for image in images:
        blob = bucket.blob(f'images/games/game{game_id}/image{current_amount_images}.png')
        blob.upload_from_file(image.file, content_type=image.content_type)
        url = blob.generate_signed_url(expiration=timedelta(days=1000))
        db.add(game_images_models.GameImages(game_id=game_id, image=url))
        current_amount_images += 1
    db.commit()
    return {'detail': 'Successfully updated main image'}

@game.delete('/delete/{game_id}', status_code=status.HTTP_200_OK)
async def delete_game(game_id: int, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    db.delete(db_game)
    db.commit()
    return {'detail': 'Successfully deleted game'}


@game.put('/update-game/{game_id}', status_code=status.HTTP_200_OK)
async def update_game(game_id: int, update_game: game_schemas.GameIn, db: Session = Depends(get_db),
                current_user=Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    db_game.name = update_game.name
    db_game.price = update_game.price
    db_game.description = update_game.description
    db_game.download_link = update_game.download_link
    db.commit()
    db.refresh(db_game)
    return {'detail': 'Successfully updated game'}
