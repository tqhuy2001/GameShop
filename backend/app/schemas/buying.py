from datetime import datetime

from pydantic import BaseModel

class Buying(BaseModel):
    id: int
    user_id: int
    game_id: int
    bought_at: datetime

    class Config:
        from_attributes: True

class CustomerBought(BaseModel):
    game_id: int
    name: str
    download_link: str
    bought_at: datetime

    class Config:
        from_attributes: True
