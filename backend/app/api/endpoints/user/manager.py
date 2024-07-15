from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
import base64

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.schemas import buying as buying_schemas
from app.models import user as user_models
from app.models import buying as buying_models
from app.api.endpoints.login import oauth2
from app.config import settings

manager = APIRouter()

@manager.post('/add-staff', status_code=status.HTTP_201_CREATED)
def create_staff(staff: user_schemas.StaffCreate, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_user1 = db.query(user_models.User).filter(user_models.User.username == staff.username).first()
    db_user2 = db.query(user_models.User).filter(user_models.User.email == staff.email).first()
    if db_user1:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Username already exists')
    if db_user2:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Email already exists')
    hashed_pwd = oauth2.hash(staff.password)
    staff.password = hashed_pwd
    t = settings.default_avatar_path
    db_avt = base64.b64encode(t.encode())
    new_user = user_models.User(**staff.dict(), permission='Staff', avatar=db_avt)
    db.add(new_user)
    db.commit()
    return {'detail': 'Successfully created staff user'}

@manager.post('/add-admin', status_code=status.HTTP_201_CREATED)
def create_admin(admin: user_schemas.AdminCreate, db: Session = Depends(get_db)):
    db_user = db.query(user_models.User).filter(user_models.User.permission == 'Admin').first()
    if db_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Admin user has already existed')
    hashed_pwd = oauth2.hash(admin.password)
    admin.password = hashed_pwd
    t = settings.default_avatar_path
    db_avt = base64.b64encode(t.encode())
    new_user = user_models.User(**admin.dict(), permission='Admin', avatar=db_avt)
    db.add(new_user)
    db.commit()
    return {'detail': 'Successfully created admin user'}

@manager.delete('/delete-user/{user_id}', status_code=status.HTTP_200_OK)
def delete_user(user_id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    db.delete(db_user)
    db.commit()
    return {'detail': 'Successfully deleted user'}

@manager.get('/get-all-users', response_model=list[user_schemas.UserBase])
def get_all_users(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_users = db.query(user_models.User).all()
    if len(db_users) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any users')
    return db_users

@manager.get('/get-user/{user_id}', response_model=user_schemas.UserBase)
def get_user_by_id(user_id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_user = db.query(user_models.User).filter(user_models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    return db_user

@manager.delete('/delete/{buying_id}', status_code=status.HTTP_200_OK)
def delete_buying(buying_id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_buying = db.query(buying_models.Buying).filter(buying_models.Buying.id == buying_id).first()
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Only admin can delete buying')
    if not db_buying:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Buying does not exist')
    db.delete(db_buying)
    db.commit()
    return {'detail': 'Successfully deleted buying'}

@manager.get('/get-all-buyings', response_model=list[buying_schemas.Buying])
def get_all_buyings(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_games = db.query(buying_models.Buying).all()
    if len(db_games) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any buyings')
    return db_games