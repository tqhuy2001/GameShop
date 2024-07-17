from pydantic import BaseModel
from datetime import datetime

class GameBase(BaseModel):
    name: str
    price: int
    description: str
    create_at: datetime
    user_created_name: str

    class Config:
        from_attributes = True

class GameIn(BaseModel):
    name: str
    price: int
    description: str

class GameImage(BaseModel):
    image: str

    class Config:
        from_attributes = True

class Game(BaseModel):
    id: int
    name: str
    price: int
    description: str
    create_at: datetime
    user_created_name: str
    main_image: str

    class Config:
        from_attributes = True

