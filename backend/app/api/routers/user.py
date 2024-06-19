from fastapi import APIRouter

from app.api.endpoints.user.user import user

user_router = APIRouter()

user_router.include_router(
    user,
    prefix="/user",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)