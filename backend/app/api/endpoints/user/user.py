from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.user import UserCreate, UserBase
from . import crud_user

user = APIRouter()

@user.get('/users', response_model=list[UserBase])
def get_all_users(db: Session = Depends(get_db)):
    db_users = crud_user.get_all_users(db)
    if len(db_users) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any users')
    return db_users

@user.get('/id_user/{id}', response_model=UserBase)
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    db_user = crud_user.get_user_by_id(db, id)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    return db_user

@user.post('/', response_model=UserBase)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user1 = crud_user.get_user_by_username(db, user.username)
    db_user2 = crud_user.get_user_by_email(db, user.email)
    if db_user1 or db_user2:
        raise HTTPException(status_code=status.HTTP_201_CREATED_NOT_FOUND, detail='User already exists')
    new_user = crud_user.create_user(db, user)
    return new_user

@user.delete('/id_user/{id}', response_model=UserBase)
def delete_user(id: int, db: Session = Depends(get_db)):
    db_user = crud_user.delete_user(db, id)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    return db_user

@user.put('/id_user/{id}', response_model=UserBase)
def update_cash_user(id: int, cash: int, db: Session = Depends(get_db), ):
    db_user = crud_user.update_cash(db, id, cash)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    return db_user
