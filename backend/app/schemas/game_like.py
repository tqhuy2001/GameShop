from pydantic import BaseModel

class GameLike(BaseModel):
    id: int
    user_id: int
    game_id: int

    class Config:
        from_attributes: True

class CustomerLike(BaseModel):
    game_id: int

    class Config:
        from_attributes: True
