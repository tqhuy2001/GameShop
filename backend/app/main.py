from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import game
from app.models import user
from app.api.routers.api import router
from app.core.database import engine

app = FastAPI()

user.Base.metadata.create_all(bind=engine)
game.Base.metadata.create_all(bind=engine)


origins = [
    'http://localhost:8001',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(router)