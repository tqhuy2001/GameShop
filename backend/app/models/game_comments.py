from sqlalchemy import Column, String, Integer, ForeignKey, TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

from app.core.database import Base

class GameComments(Base):
    __tablename__ = 'game_comments'

    id = Column(Integer, primary_key=True)
    game_id = Column(Integer, ForeignKey('games.id', ondelete='CASCADE'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    content = Column(String(16000), nullable=False, server_default='')
    comment_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    user_id_relationship = relationship('User')
    game_id_relationship = relationship('Game')
