from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from app.api.endpoints.login import oauth2
from app.core.dependencies import get_db
from app.models import buying as buy_models
from app.schemas import buying as buy_schemas

buying = APIRouter()

@buying.post('/', status_code=status.HTTP_201_CREATED)
def add_buying(buying: buy_schemas.Buying, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    query_buying = db.query(buy_models.Buying).filter(
        buy_models.Buying.game_id == buying.game_id, buy_models.Buying.user_id == current_user.id)
    db_buying = query_buying.first()
    if buying.dir == 1:
        if db_buying:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f'user {current_user.id} has already bought on game {buying.game_id}')
        new_buying = buy_models.Buying(game_id=buying.game_id, user_id=current_user.id)
        db.add(new_buying)
        db.commit()
        return {'msg': 'successfully created buying'}
    else:
        if not db_buying:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Buying not exists')
        db.delete(db_buying)
        db.commit()

        return {'msg': 'successfully deleted buying'}



