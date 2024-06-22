from pydantic import BaseModel

from pydantic.types import conint

class Buying(BaseModel):
    game_id: int
    dir: conint(le=1)