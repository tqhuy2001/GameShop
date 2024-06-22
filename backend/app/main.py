from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers.api import routers
from app.core.database import engine

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

@app.get('/')
def hello():
    return {'msg': 'Hello'}

app.include_router(routers)