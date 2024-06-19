from fastapi import APIRouter

from app.api.endpoints.login.login import login

login_router = APIRouter()

login_router.include_router(
    login,
    tags=['login'],
    responses={404: {"description": "Not found"}},
)