from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import Optional

from app.core.dependencies import get_db
from app.schemas import game as game_schemas
from app.models import game as game_models
from app.api.endpoints.login import oauth2

game = APIRouter()

@game.get('/games', response_model=list[game_schemas.GameBase])
def get_all_games(db: Session = Depends(get_db)):
    db_games = db.query(game_models.Game).all()
    if len(db_games) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any games')
    return db_games

@game.get('/id_game/{id}', response_model=game_schemas.GameBase)
def get_game_by_id(id: int, db: Session = Depends(get_db)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    return db_game

@game.get('/search', response_model=list[game_schemas.GameBase])
def get_games(search: Optional[str] = '', limit: int = 100, db: Session = Depends(get_db)):
    db_game = db.query(game_models.Game).filter(game_models.Game.name.contains(search)).limit(limit).all()
    if len(db_game) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    return db_game

@game.post('/', response_model=game_schemas.GameBase)
def add_game(game: game_schemas.GameIn, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_game = db.query(game_models.Game).filter(game_models.Game.name == game.name).first()
    if db_game:
        raise HTTPException(status_code=status.HTTP_201_CREATED, detail='Game already exists')
    new_game = game_models.Game(**game.dict(), owner_id=current_user.id)
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game

@game.delete('/id_game/{id}', response_model=game_schemas.GameBase)
def delete_game(id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    if db_game.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized to delete this game')
    db.delete(db_game)
    db.commit()
    return db_game

@game.put('/id_game/{id}', response_model=game_schemas.GameBase)
def update_game(id: int, update_game: game_schemas.GameIn, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    if db_game.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Not authorized to update this game')
    db_game.name = update_game.name
    db_game.price = update_game.price
    db_game.description = update_game.description
    db.commit()
    db.refresh(db_game)
    return db_game



