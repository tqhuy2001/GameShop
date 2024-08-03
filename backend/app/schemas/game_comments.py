from pydantic import BaseModel
from datetime import datetime

class GameComments(BaseModel):

    id: int
    game_id: int
    user_id: int
    content: str
    comment_at: datetime

    class Config:
        from_attributes: True

class GameCommentsOut(BaseModel):

    GameComments: GameComments
    user_username: str
    user_permission: str
    user_avatar: str

    class Config:
        from_attributes: True

class GameCommentsIn(BaseModel):

    content: str