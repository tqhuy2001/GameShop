from pydantic import BaseModel
from datetime import datetime

from .user import UserBase

class GameBase(BaseModel):
    name: str
    price: int
    description: str
    create_at: datetime
    user_created_id: int

    class Config:
        from_attributes = True

class GameIn(BaseModel):
    name: str
    price: int
    description: str

class Game(BaseModel):
    id: int
    name: str
    price: int
    description: str
    create_at: datetime

