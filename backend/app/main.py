from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers.api import routers
from app.core.firebase import firebase_init

app = FastAPI()

origins = [
    '*',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

firebase_init()

app.include_router(routers)