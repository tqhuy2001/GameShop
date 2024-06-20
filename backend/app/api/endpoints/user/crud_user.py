from sqlalchemy.orm import Session

from app.api.endpoints.login import oauth2
from app.models.user import User
from app.schemas.user import UserCreate

def get_all_users(db: Session):
    db_users = db.query(User).all()
    return db_users

def get_user_by_id(db: Session, id: int):
    db_user = db.query(User).filter(User.id == id).first()
    return db_user

def get_user_by_username(db: Session, username: str):
    db_user = db.query(User).filter(User.username == username).first()
    return db_user

def get_user_by_email(db: Session, email: str):
    db_user = db.query(User).filter(User.email == email).first()
    return db_user

def create_user(db: Session, user: UserCreate):
    hashed_pwd = oauth2.hash(user.password)
    user.password = hashed_pwd
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    return db_user

def delete_user(db: Session, id: int):
    db_user = db.query(User).filter(User.id == id).first()
    db.delete(db_user)
    db.commit()
    return db_user

def update_cash(db: Session, id: int, cash: int):
    db_user = db.query(User).filter(User.id == id).first()
    db_user.cash = cash
    db.commit()
    db.refresh(db_user)
    return db_user