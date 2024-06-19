from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.game import GameBase, GameAdd
from . import crud_game
from app.api.endpoints.login import oauth2

game = APIRouter()

@game.get('/games', response_model=list[GameBase])
def get_all_games(db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    db_games = crud_game.get_all_games(db)
    if len(db_games) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any games')
    return db_games

@game.get('/{id}', response_model=GameBase)
def get_game_by_id(id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    db_game = crud_game.get_game_by_id(db, id)
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    return db_game

@game.post('/', response_model=GameBase)
def add_game(game: GameAdd, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    db_game = crud_game.get_game_by_name(db, game.name)
    if db_game:
        raise HTTPException(status_code=status.HTTP_201_CREATED, detail='Game already exists')
    new_game = crud_game.add_game(db, game)
    return new_game

@game.delete('/{id}', response_model=GameBase)
def delete_game(id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.get_current_user)):
    db_game = crud_game.delete_game(db, id)
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    return db_game



