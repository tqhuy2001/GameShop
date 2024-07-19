from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base

class GameCategories(Base):
    __tablename__ = 'game_categories'

    id = Column(Integer, primary_key=True)
    game_id = Column(Integer, ForeignKey('games.id', ondelete='CASCADE'), nullable=False)
    category = Column(String(100), nullable=False, server_default='')

    game_id_relationship = relationship('Game')
