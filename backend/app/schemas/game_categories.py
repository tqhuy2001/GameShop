from pydantic import BaseModel

class GameCategory(BaseModel):
    id: int
    game_id: int
    category: str

class GameCategoryOut(BaseModel):
    category: str

    class Config:
        from_attributes = True