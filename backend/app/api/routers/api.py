from fastapi import APIRouter

from .game import game_router
from .user import user_router
from .login import login_router

router = APIRouter()

router.include_router(user_router)
router.include_router(game_router)
router.include_router(login_router)