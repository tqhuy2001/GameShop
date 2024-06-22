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
        from_attrbutes = True

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    cash: int
    create_at: datetime

class GameBought(BaseModel):
    game_bought: int

    class Config:
        from_attrbutes = True

