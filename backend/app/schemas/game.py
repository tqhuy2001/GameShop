from pydantic import BaseModel
from datetime import datetime

class GameBase(BaseModel):
    name: str
    price: int
    description: str
    create_at: datetime

    class Config:
        orm_mode = True

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

