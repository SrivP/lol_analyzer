from fastapi import FastAPI # type: ignore
import requests
import os
from dotenv import load_dotenv, find_dotenv # pyright: ignore[reportMissingImports]

app = FastAPI()

load_dotenv(find_dotenv())
riot_api_key = os.getenv("RIOT_API_KEY")
payload = {'api_key': riot_api_key}

if not riot_api_key:
    print("Warning: API Key not found!")

# retrieve PUUIDs based on tagline and username (ign)
account_response = requests.get('https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/vulcan/ak47', params=payload)
puuid = account_response.json().get("puuid")



# retrieve last 10 matches
match_history_response = requests.get(
    f'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids',
    params={'api_key': riot_api_key, 'queue': 420, 'count': 10}
)


# retrieve detailed stats about 1 match

@app.get("/")
def read_root():
    return account_response.json()

@app.get("/matches")
def matches():
    return match_history_response.json()

@app.get('/match/{match_id}')
def match_data(match_id: str):
    match_data_response = requests.get(f'https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}', params=payload)
    return match_data_response.json()


@app.get('/match/{match_id}/timeline')
def match_timeline_data(match_id: str):
    match_timeline_response = requests.get(f'https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}/timeline', params=payload)
    return match_timeline_response.json()