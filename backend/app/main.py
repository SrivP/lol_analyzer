from fastapi import FastAPI, Depends # type: ignore
from app.services.riot_client import get_match_history, get_puuid, get_match_data, get_match_timeline_data
from app.db.base import get_db 
from app.services.ingestion import ingest_match
from app.services.bulk_ingestion import bulk_ingest
from app.services.analysis import get_cs_analysis

app = FastAPI()
puuid = get_puuid("vulcan", "ak47")


@app.get("/")
def read_root():
    return puuid

@app.get("/matches")
def matches():
    return get_match_history(puuid=puuid)

# @app.get('/match/{match_id}')
# def match_data(match_id: str):
#     return get_match_data(match_id=match_id)


# @app.get('/match/{match_id}/timeline')
# def match_timeline_data(match_id: str):
#     return get_match_timeline_data(match_id=match_id)

@app.post('/ingest/player/{game_name}/{tag_name}')
def ingest_last_10_matches(game_name: str, tag_name : str):
    bulk_ingest(game_name=game_name, tag_name=tag_name)
    return {"status": "ok"}


@app.post('/ingest/{match_id}')
# personal note, Depends like a way to tell fast api to run this specific funcition and pass it's returned value as a parameter? -> still learning 😅
# the use of Depends was reccomended by AI
def ingest_data(match_id : str, db = Depends(get_db)):
    ingest_match(match_id=match_id, db=db)
    return {"status": "ok", "match_id": match_id}

@app.get('/analysis/cs/{puuid}')
def cs_analysis_endpoint(puuid : str, db = Depends(get_db)):
    return get_cs_analysis(puuid=puuid, db = db)