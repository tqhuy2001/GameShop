from pydantic import BaseModel

class GameImages(BaseModel):
    id: int
    game_id: int
    image: str

    class Config:
        from_attributes: True
