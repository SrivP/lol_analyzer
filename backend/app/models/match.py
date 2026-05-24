from app.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column # type: ignore
from datetime import datetime

class Match(Base):
    __tablename__ = "matches"
    match_id : Mapped[str] = mapped_column(primary_key= True)
    game_start : Mapped[datetime]
    game_duration : Mapped[int] # seconds
    game_version : Mapped[str | None]
    queue_id : Mapped [int] # i.e. 420 = ranked solo
    map_id : Mapped[int]
