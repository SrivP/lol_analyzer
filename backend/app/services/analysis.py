from sqlalchemy.orm import Session #type:ignore
from app.db.base import get_db
from app.models.match_participant import MatchParticipant

def get_cs_analysis(puuid : str, db : Session):
    select_player_row = db.query(MatchParticipant).filter(MatchParticipant.puuid == puuid).all()
    player_stats = [
        {"match_id": select_player.match_id, "lane_cs_at_10": select_player.lane_cs_at_10, "cs_per_min": select_player.cs_per_min, "cs_total": select_player.cs_total, "win" : select_player.win}
        for select_player in select_player_row
    ]
    avg_cs_at_10 = sum(row["lane_cs_at_10"] for row in player_stats) / len(player_stats)
    avg_cs_per_min = sum(row["cs_per_min"] for row in player_stats) / len(player_stats)

    summary = {
    "avg_cs_at_10": avg_cs_at_10,
    "avg_cs_per_min": avg_cs_per_min,
    "benchmark": 85,
    "games_meeting_benchmark": sum(1 for row in player_stats if row["lane_cs_at_10"] >= 85)
    }
    
    return {"matches": player_stats, "summary": summary}