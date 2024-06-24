from fastapi import APIRouter

from app.api.endpoints.user.manager import manager

manager_router = APIRouter()

manager_router.include_router(
    manager,
    prefix="/manager",
    tags=["Managers"],
    responses={404: {"description": "Not found"}},
)