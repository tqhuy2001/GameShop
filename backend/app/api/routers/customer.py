from fastapi import APIRouter

from app.api.endpoints.user.customer import customer

customer_router = APIRouter()

customer_router.include_router(
    customer,
    prefix="/customer",
    tags=["Customers"],
    responses={404: {"description": "Not found"}},
)