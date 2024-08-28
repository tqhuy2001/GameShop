from sqlalchemy import Column, String, Integer, TIMESTAMP, ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

from app.core.database import Base

class Game(Base):
    __tablename__ = 'contact_chat'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    sender = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    content = Column(String(5000), nullable=False)
    send_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    user_id_relationship = relationship('User')
