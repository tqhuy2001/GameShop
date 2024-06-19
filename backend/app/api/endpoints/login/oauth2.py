from datetime import datetime, timedelta
import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

from app.schemas import token as tk


pass_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def hash(password: str):
    return pass_context.hash(password)

def verify(plain_password, hashed_password):
    return pass_context.verify(plain_password, hashed_password)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

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
        token_data = tk.TokenData(id=id)
    except InvalidTokenError:
        raise login_exception
    return token_data

def get_current_user(token: str = Depends(oauth2_scheme)):
    login_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Could not validate login', headers={'WWW-Authenticate': 'Bearer'})
    return verify_access_token(token, login_exception)

