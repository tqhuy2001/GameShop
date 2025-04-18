from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas import token as token_schemas
from . import oauth2
from app.models import user as user_models

login = APIRouter()

@login.post('/login', response_model=token_schemas.Token)
async def user_login(user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Account has not existed')
    if not oauth2.verify(user.password, db_user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Invalid login')
    access_token = oauth2.create_access_token(data={'id': db_user.id})

    return {'access_token': access_token, 'token_type': 'bearer'}

