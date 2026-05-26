from fastapi import FastAPI, Depends # type: ignore
from app.services.riot_client import get_match_history, get_puuid, get_match_data, get_match_timeline_data
from app.db.base import get_db 
from app.services.ingestion import ingest_match
from app.services.bulk_ingestion import bulk_ingest
from app.services.analysis import get_cs_analysis, get_vision_analysis
import redis #type:ignore
import os
import json
from fastapi.middleware.cors import CORSMiddleware #type:ignore

app = FastAPI()
redis_client = redis.Redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"))
puuid = get_puuid("vulcan", "ak47")


origins =[

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return puuid

@app.get("/matches")
def matches():
    return get_match_history(puuid=puuid)

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
    cache_key = f"cs_analysis:{puuid}"
    cached_data = redis_client.get(cache_key)
    if cached_data:
        print("Cache hit, returning data")
        return json.loads(cached_data)
    
    print("Cache not present, running query")
    cs_analysis_result = get_cs_analysis(puuid=puuid, db = db)
    # ex=3600 tells the cache to delete the data after 1 hour, so we get fresh data every hour
    redis_client.set(cache_key, json.dumps(cs_analysis_result), ex=3600) 
    return cs_analysis_result


@app.get('/analysis/vision/{puuid}')
def vision_analysis_endpoint(puuid : str, db = Depends(get_db)):
    # if i ended up having a match id and a puuid as a parameter, I would go in order of least to most specific
    # so something like vision_analysis:{match_id}:{puuid}
    cache_key = f"vision_analysis:{puuid}"
    cached_data = redis_client.get(cache_key)
    if cached_data:
        print("Cache hit, returning data")
        return json.loads(cached_data)
    print("Cache not present, running query")
    vision_analysis_result = get_vision_analysis(puuid=puuid, db = db)
    redis_client.set(cache_key, json.dumps(vision_analysis_result), ex=3600)

    