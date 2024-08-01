from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base

class GameLike(Base):
    __tablename__ = 'game_like'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    game_id = Column(Integer, ForeignKey('games.id', ondelete='CASCADE'), nullable=False)

    user_id_relationship = relationship('User')
    game_id_relationship = relationship('Game')
