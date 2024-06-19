from sqlalchemy import Column, String, Integer, TIMESTAMP
from sqlalchemy.sql.expression import text

from app.core.database import Base

class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(String(10000))
    create_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
