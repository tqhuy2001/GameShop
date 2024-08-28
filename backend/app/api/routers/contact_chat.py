from fastapi import APIRouter

from app.api.endpoints.user.contact_chat import contact_chat

contact_chat_router = APIRouter()

contact_chat_router.include_router(
    contact_chat,
    prefix="/contact-chat",
    tags=["Contact Chat"],
    responses={404: {"description": "Not found"}},
)