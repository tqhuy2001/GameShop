from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.api.endpoints.login import oauth2
from app.core.dependencies import get_db
from app.models import buying as buy_models
from app.models import game as game_models

buying = APIRouter()

@buying.post('/', status_code=status.HTTP_201_CREATED)
def buy_game(id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Customer':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Only customer can buy game')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    db_buying = db.query(buy_models.Buying).filter(
        buy_models.Buying.game_id == id, buy_models.Buying.user_id == current_user.id).first()
    if db_buying:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f'User {current_user.id} has already bought on game {id}')
    new_buying = buy_models.Buying(game_id=id, user_id=current_user.id)
    db.add(new_buying)
    db.commit()
    return {'msg': 'successfully created buying'}

@buying.delete('/{id}', status_code=status.HTTP_200_OK)
def delete_buying(id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_buying = db.query(buy_models.Buying).filter(buy_models.Buying.id == id).first()
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Only admin can delete buying')
    if not db_buying:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Buying not exists')
    db.delete(db_buying)
    db.commit()
    return {'msg': 'successfully deleted buying'}



