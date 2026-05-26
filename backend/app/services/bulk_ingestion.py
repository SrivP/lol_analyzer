from app.services.riot_client import get_match_history, get_puuid
from app.services.ingestion import ingest_match
from app.db.base import get_db 




def bulk_ingest(game_name : str, tag_name : str):
    db = next(get_db())
    puuid = get_puuid(game_name=game_name, tag_name=tag_name)
    matches = get_match_history(puuid=puuid)
    for match in matches:
        ingest_match(match_id=match, db = db)