from datetime import datetime

from pydantic import BaseModel

class CustomerCreate(BaseModel):
    username: str
    email: str
    password: str

class StaffCreate(BaseModel):
    username: str
    email: str
    password: str

class AdminCreate(BaseModel):
    username: str
    email: str
    password: str

class UserBase(BaseModel):
    username: str
    email: str
    cash: int
    create_at: datetime
    permission: str

    class Config:
        from_attributes = True

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    cash: int
    create_at: datetime

class UserInfo(BaseModel):
    username: str
    email: str
    cash: int
    avatar: str
    permission: str
    create_at: datetime

    class Config:
        from_attributes = True
