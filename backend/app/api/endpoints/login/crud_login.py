from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

from app.models.user import User

def login(user: OAuth2PasswordRequestForm, db: Session):
    db_user = db.query(User).filter(User.username == user.username).first()
    return db_user