from sqlalchemy import Column, String, Integer, TIMESTAMP, ForeignKey
from sqlalchemy.sql.expression import text
from sqlalchemy.orm import relationship

from app.core.database import Base

class Game(Base):
    __tablename__ = 'games'

    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(String(100000),nullable=False, server_default='')
    create_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    user_created_name = Column(String(50), ForeignKey(('users.username'), ondelete='NO ACTION'), nullable=False)
    main_image = Column(String(100), nullable=False, server_default='')
    main_category = Column(String(100), nullable=False, server_default='')

    user_created = relationship('User')
