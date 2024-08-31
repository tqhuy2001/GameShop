from sqlalchemy import Column, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

from app.core.database import Base

class Buying(Base):
    __tablename__ = 'buying'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    game_id = Column(Integer, ForeignKey('games.id', ondelete='CASCADE'), nullable=False)
    bought_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    user_id_relationship = relationship('User')
    game_id_relationship = relationship('Game')
