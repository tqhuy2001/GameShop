from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.schemas import game as game_schemas
from app.models import user as user_models
from app.models import game as game_models
from app.models import buying as buying_models
from app.api.endpoints.login import oauth2

user = APIRouter()

@user.get('/users', response_model=list[user_schemas.UserBase])
def get_all_users(db: Session = Depends(get_db)):
    db_users = db.query(user_models.User).all()
    if len(db_users) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any users')
    return db_users

@user.get('/id_user/{id}', response_model=user_schemas.UserBase)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    return db_user

@user.get('/game_bought/{id}', response_model=list[user_schemas.GameBought])
def get_game_bought(id: int, db: Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    db_games = db.query(user_models.User.id, buying_models.Buying.game_id.label('game_bought')).join(
        buying_models.Buying, buying_models.Buying.user_id == user_models.User.id, isouter=False).filter(user_models.User.id == id).all()
    return db_games

@user.post('/', response_model=user_schemas.UserBase)
def create_user(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    db_user1 = db.query(user_models.User).filter(user_models.User.username == user.username).first()
    db_user2 = db.query(user_models.User).filter(user_models.User.email == user.email).first()
    if db_user1:
        raise HTTPException(status_code=status.HTTP_201_CREATED_NOT_FOUND, detail='Username already exists')
    if db_user2:
        raise HTTPException(status_code=status.HTTP_201_CREATED_NOT_FOUND, detail='Email already exists')
    hashed_pwd = oauth2.hash(user.password)
    user.password = hashed_pwd
    new_user = user_models.User(**user.dict())
    db.add(new_user)
    db.commit()
    return new_user

@user.delete('/id_user/{id}', response_model=user_schemas.UserBase)
def delete_user(id: int, db: Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    db.delete(db_user)
    db.commit()
    return db_user

@user.put('/id_user/{id}', response_model=user_schemas.UserBase)
def update_cash_user(id: int, cash: int, db: Session = Depends(get_db), ):
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    db_user.cash = cash
    db.commit()
    db.refresh(db_user)
    return db_user
