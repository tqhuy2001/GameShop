from pydantic import BaseModel
from datetime import datetime

class GameBase(BaseModel):
    name: str
    price: int
    description: str
    create_at: datetime
    owner_id: int

    class Config:
        orm_mode = True

class GameUpdate(BaseModel):
    name: str
    price: int
    description: str

class GameAdd(BaseModel):
    name: str
    price: int
    description: str

class Game(BaseModel):
    id: int
    name: str
    price: int
    description: str
    create_at: datetime

