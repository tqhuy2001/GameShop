from fastapi import APIRouter

from app.api.endpoints.game.game_comments import game_comments

game_comments_router = APIRouter()

game_comments_router.include_router(
    game_comments,
    prefix="/game_comments",
    tags=["Game Comments"],
    responses={404: {"description": "Not found"}},
)