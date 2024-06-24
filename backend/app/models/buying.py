from sqlalchemy import Column, Integer, ForeignKey, String

from app.core.database import Base

class Buying(Base):
    __tablename__ = 'buying'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    game_id = Column(Integer, ForeignKey('games.id', ondelete='CASCADE'), nullable=False)
