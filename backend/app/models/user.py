from sqlalchemy import Column, String, Integer, TIMESTAMP
from sqlalchemy.sql.expression import text

from ..core.database import Base
from app.config import settings

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(30), unique=True, nullable=False)
    password = Column(String(500), nullable=False)
    cash = Column(Integer, nullable=False, server_default=text('0'))
    create_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    permission = Column(String(50), nullable=False, server_default=text('\'Customer\''))
    avatar = Column(String(1000), nullable=False, server_default=text(f'\'{settings.default_avatar_path}\''))