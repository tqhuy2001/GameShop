from datetime import datetime, timedelta
import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.core.database import SessionLocal

from app.schemas import token as token_schemas
from app.core.dependencies import get_db
from app.models import user
from app.config import settings


pass_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def hash(password: str):
    return pass_context.hash(password)

def verify(plain_password, hashed_password):
    return pass_context.verify(plain_password, hashed_password)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str, login_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

        id: str = payload.get('id')

        if id is None:
            raise login_exception
        token_data = token_schemas.TokenData(id=id)
    except InvalidTokenError:
        raise login_exception
    return token_data

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    login_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate login', headers={'WWW-Authenticate': 'Bearer'})

    token = verify_access_token(token, login_exception)
    db_user = db.query(user.User).filter(user.User.id == token.id).first()

    return db_user

def get_current_user_by_token(token: str):
    db: Session = SessionLocal()
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)

        id: str = payload.get('id')

        if id is None:
            return None

        token_data = token_schemas.TokenData(id=id)
        db_user = db.query(user.User).filter(user.User.id == token_data.id).first()
        db.close()
    except InvalidTokenError:
        return None

    return db_user
