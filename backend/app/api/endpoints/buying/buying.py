from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.api.endpoints.login import oauth2
from app.core.dependencies import get_db
from app.models import buying as buying_models
from app.schemas import buying as buying_schemas
from app.models import game as game_models
from app.models import user as user_models

buying = APIRouter()

@buying.post('/', status_code=status.HTTP_201_CREATED)
def buy_game(id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Customer':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Only customer can buy game')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    db_buying = db.query(buying_models.Buying).filter(
        buying_models.Buying.game_id == id, buying_models.Buying.user_id == current_user.id).first()
    if db_buying:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f'You have already bought on this game')
    if current_user.cash < db_game.price:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='You don\'t have enough cash for buying this game. Please charge more cash')
    new_buying = buying_models.Buying(game_id=id, user_id=current_user.id)
    db.add(new_buying)
    db.commit()
    return {'msg': 'Successfully created buying'}

@buying.delete('/{buying_id}', status_code=status.HTTP_200_OK)
def delete_buying(buying_id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_buying = db.query(buying_models.Buying).filter(buying_models.Buying.id == buying_id).first()
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Only admin can delete buying')
    if not db_buying:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Buying not exists')
    db.delete(db_buying)
    db.commit()
    return {'msg': 'Successfully deleted buying'}

@buying.get('/buyings', response_model=list[buying_schemas.Buying])
def get_all_buyings(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_games = db.query(user_models.User.id, buying_models.Buying.game_id).join(
        buying_models.Buying, buying_models.Buying.user_id == user_models.User.id, isouter=False).all()
    if len(db_games) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any buyings')
    return db_games

