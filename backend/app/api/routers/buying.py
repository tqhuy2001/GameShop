from fastapi import APIRouter

from app.api.endpoints.buying.buying import buying

buying_router = APIRouter()

buying_router.include_router(
    buying,
    prefix="/buying",
    tags=["Buyings"],
    responses={404: {"description": "Not found"}},
)