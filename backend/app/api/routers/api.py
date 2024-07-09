from fastapi import APIRouter
from fastapi.responses import FileResponse
import base64

from .game import game_router
from .customer import customer_router
from .manager import manager_router
from .login import login_router
from .user import user_router

routers = APIRouter()

@routers.get("/get_image")
async def get_image(image_path: str):
    url_decoded = base64.b64decode(image_path)
    return FileResponse(url_decoded.decode())

routers.include_router(customer_router)
routers.include_router(manager_router)
routers.include_router(game_router)
routers.include_router(login_router)
routers.include_router(user_router)