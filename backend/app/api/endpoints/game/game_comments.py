from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.api.endpoints.login import oauth2
from app.models import game as game_models
from app.models import game_comments as game_comments_models
from app.schemas import game_comments as game_comments_schemas
from app.models import user as user_models

game_comments = APIRouter()

@game_comments.post('/add-comments/{game_id}', status_code=status.HTTP_200_OK)
async def add_comments(game_id: int, content: game_comments_schemas.GameCommentsIn, db: Session = Depends(get_db), current_user=Depends(oauth2.get_current_user)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')
    new_comments = game_comments_models.GameComments(**content.model_dump(), game_id=game_id, user_id=current_user.id)
    db.add(new_comments)
    db.commit()
    db.refresh(new_comments)
    return {'detail': 'OK'}

@game_comments.get('/get-comments/{game_id}', response_model=list[game_comments_schemas.GameCommentsOut])
async def get_comments(game_id: int, db: Session = Depends(get_db)):
    db_game = db.query(game_models.Game).filter(game_models.Game.id == game_id).first()
    if db_game is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Game not found')
    db_comments = (db.query(game_comments_models.GameComments, user_models.User.username.label('user_username'), user_models.User.permission.label('user_permission'), user_models.User.avatar.label('user_avatar'))
                   .join(user_models.User, game_comments_models.GameComments.user_id == user_models.User.id, isouter=False)
                    .filter(game_comments_models.GameComments.game_id == game_id)
                    .order_by(game_comments_models.GameComments.comment_at.desc())
                   .all())
    return db_comments

@game_comments.get('/get-all-comments', response_model=list[game_comments_schemas.GameCommentsOut])
async def get_all_comments(db: Session = Depends(get_db)):
    db_comments = (db.query(game_comments_models.GameComments, user_models.User.username.label('user_username'), user_models.User.permission.label('user_permission'), user_models.User.avatar.label('user_avatar'))
                   .join(user_models.User, game_comments_models.GameComments.user_id == user_models.User.id, isouter=False)
                    .order_by(game_comments_models.GameComments.comment_at.desc())
                    .limit(6)
                   .all())
    return db_comments
