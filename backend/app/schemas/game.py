from pydantic import BaseModel
from datetime import datetime

from .user import UserBase

class GameBase(BaseModel):
    name: str
    price: int
    description: str
    create_at: datetime
    owner_id: int
    owner: UserBase

    class Config:
        from_attrbutes = True

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

