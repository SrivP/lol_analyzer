from sqlalchemy.orm import Session #type:ignore
from app.db.base import get_db
from app.models.match_participant import MatchParticipant
from sqlalchemy import and_ #type:ignore
from app.models.timeline_frame import TimelineFrame

def get_cs_analysis(puuid : str, db : Session):
    select_player_row = db.query(MatchParticipant).filter(MatchParticipant.puuid == puuid).all()
    player_stats = [
        {"match_id": select_player.match_id, "lane_cs_at_10": select_player.lane_cs_at_10, "cs_per_min": select_player.cs_per_min, "cs_total": select_player.cs_total, "win" : select_player.win}
        for select_player in select_player_row
    ]
    avg_cs_at_10 = sum(row["lane_cs_at_10"] for row in player_stats) / len(player_stats) if len(player_stats) > 0 else 0
    avg_cs_per_min = sum(row["cs_per_min"] for row in player_stats) / len(player_stats) if len(player_stats) > 0 else 0

    summary = {
    "avg_cs_at_10": avg_cs_at_10,
    "avg_cs_per_min": avg_cs_per_min,
    "benchmark": 85,
    "games_meeting_benchmark": sum(1 for row in player_stats if row["lane_cs_at_10"] >= 85)
    }
    
    return {"matches": player_stats, "summary": summary}

def get_vision_analysis(puuid : str, db : Session):
    selected_player_row = db.query(MatchParticipant).filter(MatchParticipant.puuid == puuid).all()
    player_stats = [
        {"match_id": select_player.match_id, "vision_score": select_player.vision_score, "wards_placed": select_player.wards_placed, "wards_killed": select_player.wards_killed, "control_wards": select_player.control_wards}
        for select_player in selected_player_row
    ]
    avg_vision_score = sum(row["vision_score"] for row in player_stats) / len(player_stats) if len(player_stats) > 0 else 0
    avg_wards_placed = sum(row["wards_placed"] for row in player_stats) / len(player_stats) if len(player_stats) > 0 else 0

    summary = {
    "avg_vision_score": avg_vision_score,
    "avg_wards_placed": avg_wards_placed
    }

    return {"matches": player_stats, "summary": summary}

def get_gold_diff_analysis(puuid : str, match_id : str, db : Session):
    player = db.query(MatchParticipant).filter(and_(MatchParticipant.puuid == puuid, MatchParticipant.match_id == match_id)).first()
    enemy = db.query(MatchParticipant).filter(and_(MatchParticipant.match_id == match_id, MatchParticipant.team_id != player.team_id, MatchParticipant.team_position == player.team_position)).first()
    player_frames = db.query(TimelineFrame).filter(TimelineFrame.participant_id == player.participant_id).order_by(TimelineFrame.timestamp_min).all()
    enemy_frames = db.query(TimelineFrame).filter(TimelineFrame.participant_id == enemy.participant_id).order_by(TimelineFrame.timestamp_min).all()

    enemy_frame_map = {frame.timestamp_min: frame for frame in enemy_frames}

    timeline_data = []

    for p_frame in player_frames:
        minute = p_frame.timestamp_min
    
        # Safely get the enemy's frame for this exact minute
        e_frame = enemy_frame_map.get(minute)
        
        if e_frame:
            timeline_data.append({"timestamp_min": minute, "player_gold": p_frame.current_gold, "enemy_gold": e_frame.current_gold, "gold_diff": p_frame.total_gold - e_frame.total_gold})
    key_minutes = {5, 10, 15}
    laning_phase = {
        entry["timestamp_min"]: entry["gold_diff"]
        for entry in timeline_data
        if entry["timestamp_min"] in key_minutes
    }
    return {"match_id": match_id, "position": player.team_position, "laning_phase": {
        "5m": laning_phase.get(5),
        "10m": laning_phase.get(10),
        "15m": laning_phase.get(15),
    }, "timeline": timeline_data}        

def get_kda_analysis(puuid : str, db : Session):
    select_player_row = db.query(MatchParticipant).filter(MatchParticipant.puuid == puuid).all()
    player_stats = [
        {"match_id": select_player.match_id, "kills": select_player.kills, "deaths": select_player.deaths, "assists": select_player.assists, "kda": select_player.kda, "win": select_player.win, "kill_participation": select_player.kill_participation}
        for select_player in select_player_row
    ]

    avg_kill_participation = sum(row["kill_participation"] for row in player_stats) / len(player_stats) if len(player_stats) > 0 else 0
    lifetime_kills = sum(row["kills"] for row in player_stats) 
    lifetime_deaths = sum(row["deaths"] for row in player_stats) 
    lifetime_assists = sum(row["assists"] for row in player_stats)
    avg_win_rate = sum(row["win"] for row in player_stats) / len(player_stats) if len(player_stats) > 0 else 0
    
    avg_kda = (lifetime_kills + lifetime_assists) / lifetime_deaths if lifetime_deaths != 0 else "Perfect"
    

    summary = {
        "avg_kill_participation" : avg_kill_participation,
        "lifetime_kills": lifetime_kills,
        "lifetime_deaths": lifetime_deaths,
        "lifetime_assists": lifetime_assists,
        "avg_kda": avg_kda,
        "avg_win_rate": avg_win_rate

    }
    return {"matches" : player_stats, "summary": summary}