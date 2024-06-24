from datetime import datetime

from pydantic import BaseModel

class CustomerCreate(BaseModel):
    username: str
    email: str
    password: str
    permission: str = 'Customer'

class StaffCreate(BaseModel):
    username: str
    email: str
    password: str
    permission: str = 'Staff'

class AdminCreate(BaseModel):
    username: str
    email: str
    password: str
    permission: str = 'Admin'

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

    class Config:
        from_attributes = True
