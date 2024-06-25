from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.schemas import buying as buying_schemas
from app.models import buying as buying_models
from app.api.endpoints.login import oauth2

customer = APIRouter()

@customer.post('/customer', status_code=status.HTTP_201_CREATED)
def create_customer(user: user_schemas.CustomerCreate, db: Session = Depends(get_db)):
    db_user1 = db.query(user_models.User).filter(user_models.User.username == user.username).first()
    db_user2 = db.query(user_models.User).filter(user_models.User.email == user.email).first()
    if db_user1:
        raise HTTPException(status_code=status.HTTP_201_CREATED_NOT_FOUND, detail='Username has already existed')
    if db_user2:
        raise HTTPException(status_code=status.HTTP_201_CREATED_NOT_FOUND, detail='Email has already existed')
    hashed_pwd = oauth2.hash(user.password)
    user.password = hashed_pwd
    new_user = user_models.User(**user.dict())
    db.add(new_user)
    db.commit()
    return {'msg': 'Successfully created account'}

@customer.put('/recharge', status_code=status.HTTP_200_OK)
def recharge_cash(cash: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Customer':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not customer')
    current_user.cash += cash
    db.commit()
    return {'msg': 'Successfully charged your cash'}

@customer.get('/game_bought', response_model=list[buying_schemas.CustomerBought])
def get_all_games_bought(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_games = db.query(buying_models.Buying.game_id).filter(
        buying_models.Buying.user_id == current_user.id).all()
    return db_games

