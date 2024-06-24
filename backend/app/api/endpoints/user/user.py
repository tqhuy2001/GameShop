from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from fastapi import File, UploadFile
import base64

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.api.endpoints.login import oauth2

user = APIRouter()

@user.get('/', response_model=user_schemas.UserInfo)
def get_info_user(current_user = Depends(oauth2.get_current_user)):
    return current_user

@user.post('/user', status_code=status.HTTP_200_OK)
async def upload_avatar(db: Session = Depends(get_db), file: UploadFile = File(...), current_user = Depends(oauth2.get_current_user)):
    contents = await file.read()
    db_user = db.query(user_models.User).filter(user_models.User.id == current_user.id).first()
    binary_data = base64.b64encode(contents)
    db_user.avatar = binary_data
    db.commit()
    return {'msg': 'Successfully updated avatar'}

@user.get('/user')
async def get_avatar(current_user = Depends(oauth2.get_current_user)):
    if current_user.avatar is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User has not upload avatar')
    binary_data = base64.b64decode(current_user.avatar)
    return {'msg': f'{binary_data}'}