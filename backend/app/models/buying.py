from sqlalchemy import Column, Integer, ForeignKey, String

from app.core.database import Base

class Buying(Base):
    __tablename__ = 'buying'

    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), primary_key=True)
    game_id = Column(Integer, ForeignKey('games.id', ondelete='CASCADE'), primary_key=True)
