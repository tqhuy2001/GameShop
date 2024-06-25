from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas import user as user_schemas
from app.models import user as user_models
from app.api.endpoints.login import oauth2

manager = APIRouter()

@manager.post('/staff', status_code=status.HTTP_201_CREATED)
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
    new_user = user_models.User(**staff.dict())
    db.add(new_user)
    db.commit()
    return {'msg': 'Successfully created staff user'}

@manager.post('/admin', status_code=status.HTTP_201_CREATED)
def create_admin(admin: user_schemas.AdminCreate, db: Session = Depends(get_db)):
    db_user = db.query(user_models.User).all()
    if len(db_user) != 0:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Admin user has already existed')
    hashed_pwd = oauth2.hash(admin.password)
    admin.password = hashed_pwd
    new_user = user_models.User(**admin.dict())
    db.add(new_user)
    db.commit()
    return {'msg': 'Successfully created admin user'}

@manager.delete('/id_user/{id}', status_code=status.HTTP_200_OK)
def delete_user(id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    db.delete(db_user)
    db.commit()
    return {'msg': 'Successfully deleted user'}

@manager.get('/users', response_model=list[user_schemas.UserBase])
def get_all_users(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_users = db.query(user_models.User).all()
    if len(db_users) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found any users')
    return db_users

@manager.get('/id_user/{id}', response_model=user_schemas.UserBase)
def get_user_by_id(id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    if current_user.permission != 'Admin' and current_user.permission != 'Staff':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='You are not permitted')
    db_user = db.query(user_models.User).filter(user_models.User.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Not found user')
    return db_user
