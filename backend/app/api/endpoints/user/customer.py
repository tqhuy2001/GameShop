from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.schemas import buying as buying_schemas
from app.models import buying as buying_models
from app.models import game as game_models
from app.api.endpoints.login import oauth2
from app.config import settings

customer = APIRouter()

@customer.post('/add', status_code=status.HTTP_201_CREATED)
def create_customer(user: user_schemas.CustomerCreate, db: Session = Depends(get_db)):
    db_user1 = db.query(user_models.User).filter(user_models.User.username == user.username).first()
    db_user2 = db.query(user_models.User).filter(user_models.User.email == user.email).first()
    if db_user1:
        raise HTTPException(status_code=status.HTTP_201_CREATED_NOT_FOUND, detail='Username has already existed')
    if db_user2:
        raise HTTPException(status_code=status.HTTP_201_CREATED_NOT_FOUND, detail='Email has already existed')
    hashed_pwd = oauth2.hash(user.password)
    user.password = hashed_pwd
    new_user = user_models.User(**user.dict(), permission='Customer', avatar=settings.default_avatar_path)
    db.add(new_user)
    db.commit()
    return {'msg': 'Successfully created account'}

@customer.put('/update-cash', status_code=status.HTTP_200_OK)
def recharge_cash(cash: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Customer':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not customer')
    current_user.cash += cash
    db.commit()
    return {'msg': 'Successfully charged your cash'}

@customer.get('/get-games-bought', response_model=list[buying_schemas.CustomerBought])
def get_all_games_bought(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Customer':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not customer')
    db_games = db.query(buying_models.Buying.game_id).filter(
        buying_models.Buying.user_id == current_user.id).all()
    if len(db_games) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='You have not bought anygames')
    return db_games

@customer.post('/add-buying/{game_id}', status_code=status.HTTP_201_CREATED)
def buy_game(game_id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Customer':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Only the customers can buy game')
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found game')
    db_buying = db.query(buying_models.Buying).filter(
        buying_models.Buying.game_id == game_id, buying_models.Buying.user_id == current_user.id).first()
    if db_buying:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='You have already bought on this game')
    if current_user.cash < db_game.price:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='You don\'t have enough cash for buying this game. Please charge more cash')
    current_user.cash -= db_game.price
    new_buying = buying_models.Buying(game_id=game_id, user_id=current_user.id)
    db.add(new_buying)
    db.commit()
    return {'msg': 'Successfully created buying'}