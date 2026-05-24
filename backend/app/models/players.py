# dropped because I realized AI halucinated a pointless schema/model that didn't add anything of value

from app.models.base import Base
from sqlalchemy import String, func # type: ignore
from sqlalchemy.orm import Mapped, mapped_column # type: ignore
from datetime import datetime
from typing import Optional

class Player(Base):
    __tablename__ = "players"
    puuid : Mapped[str] = mapped_column(String(78), primary_key=True)
    game_name : Mapped[str] = mapped_column(String(64))
    tag_line : Mapped[str] =  mapped_column(String(64))
    summoner_id : Mapped[Optional[str]]
    updated_at : Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())


