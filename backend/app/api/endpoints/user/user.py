from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from fastapi import File, UploadFile
import base64

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.api.endpoints.login import oauth2
from app.config import settings

user = APIRouter()

@user.get('/get-info', response_model=user_schemas.UserInfo)
def get_info_user(current_user = Depends(oauth2.get_current_user)):
    return current_user

@user.post('/update-avatar', status_code=status.HTTP_200_OK)
async def upload_avatar(db: Session = Depends(get_db), file: UploadFile = File(...), current_user = Depends(oauth2.get_current_user)):
    contents = await file.read()
    db_user = db.query(user_models.User).filter(user_models.User.id == current_user.id).first()
    parent_dir = settings.avatar_users_file_path
    avatar_name = 'user' + str(current_user.id) + '.png'
    try:
        file_path = f'{parent_dir}{avatar_name}'
        with open(file_path, 'wb') as f:
            f.write(contents)
    except Exception as e:
        return {'msg': e.args}
    db_avatar = parent_dir.replace('\\\\', '/')
    t = db_avatar + avatar_name
    db_avt = base64.b64encode(t.encode())
    db_user.avatar = db_avt
    db.commit()
    return {'msg': 'Successfully updated avatar'}
