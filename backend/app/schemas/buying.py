from pydantic import BaseModel

class Buying(BaseModel):
    id: int
    user_id: int
    game_id: int

    class Config:
        from_attributes: True

class CustomerBought(BaseModel):
    game_id: int

    class Config:
        from_attributes: True
