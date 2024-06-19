from sqlalchemy.orm import Session

from app.models.game import Game
from app.schemas.game import GameBase, GameAdd

def get_all_games(db: Session, skip: int = 0, limit: int = 100):
    db_games = db.query(Game).offset(skip).limit(limit).all()
    return db_games

def get_game_by_id(db: Session, id: int):
    db_game = db.query(Game).filter(Game.id == id).first()
    return db_game

def get_game_by_name(db: Session, game_name: str):
    db_game = db.query(Game).filter(Game.name == game_name).first()
    return db_game

def add_game(db: Session, game: GameAdd):
    db_game = Game(**game.dict())
    db.add(db_game)
    db.commit()
    db.refresh(db_game)
    return db_game

def delete_game(db: Session, id: int):
    db_game = db.query(Game).filter(Game.id == id).first()
    db.delete(db_game)
    db.commit()
    return db_game
