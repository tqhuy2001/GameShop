from fastapi import APIRouter

from app.api.endpoints.game.game import game

game_router = APIRouter()

game_router.include_router(
    game,
    prefix="/game",
    tags=["Games"],
    responses={404: {"description": "Not found"}},
)