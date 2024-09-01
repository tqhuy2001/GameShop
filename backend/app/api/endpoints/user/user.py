from datetime import timedelta
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from fastapi import File, UploadFile
from firebase_admin import storage

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.api.endpoints.login import oauth2
from app.schemas import game_like as game_like_schemas
from app.models import game_like as game_like_models

user = APIRouter()

@user.get('/get-info', response_model=user_schemas.UserInfo)
async def get_info_user(current_user = Depends(oauth2.get_current_user)):
    return current_user

@user.get('/get-games-liked', response_model=list[game_like_schemas.CustomerLike])
async def get_all_games_liked(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_games_liked = db.query(game_like_models.GameLike.game_id).filter(
        game_like_models.GameLike.user_id == current_user.id).all()
    return db_games_liked

@user.patch('/update-avatar', status_code=status.HTTP_200_OK)
async def upload_avatar(db: Session = Depends(get_db), image: UploadFile = File(...), current_user = Depends(oauth2.get_current_user)):
    bucket = storage.bucket()
    blob = bucket.blob(f'images/users/user{current_user.id}.png')
    blob.upload_from_file(image.file, content_type=image.content_type)
    url = blob.generate_signed_url(expiration=timedelta(days=1000))

    current_user.avatar = url
    db.commit()

    return {'detail': 'Successfully updated main image'}

@user.patch('/change-password', status_code=status.HTTP_200_OK)
async def change_password(form_password: user_schemas.ChangePassword, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if not oauth2.verify(form_password.current_password, current_user.password):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Incorrect password!')
    if form_password.current_password == form_password.new_password:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='New password must not be the same as old password!')
    db_user = db.query(user_models.User).filter(user_models.User.id == current_user.id).first()
    new_hash_pwd = oauth2.hash(form_password.new_password)
    db_user.password = new_hash_pwd
    db.commit()
    return {'detail': 'Successfully change password'}
