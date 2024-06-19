from datetime import datetime

from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserBase(BaseModel):
    username: str
    email: str
    cash: int
    create_at: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    cash: int

class UserLogin(BaseModel):
    username: str
    password: str

