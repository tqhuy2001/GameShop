from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base

class GameImages(Base):
    __tablename__ = 'game_images'

    id = Column(Integer, primary_key=True)
    game_id = Column(Integer, ForeignKey(('games.id'), ondelete='CASCADE'), nullable=False)
    image = Column(String(1000), nullable=False, server_default='')

    game_id_rela = relationship('Game')
