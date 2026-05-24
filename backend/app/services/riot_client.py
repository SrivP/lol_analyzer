import requests #type:ignore
import os
from dotenv import load_dotenv, find_dotenv # pyright: ignore[reportMissingImports]

# loading .env files
load_dotenv(find_dotenv())
riot_api_key = os.getenv("RIOT_API_KEY")
payload = {'api_key': riot_api_key}

if not riot_api_key:
    print("Warning: API Key not found!")


def get_puuid(game_name : str, tag_name : str):
    # retrieve PUUIDs based on tagline and username (ign)
    account_response = requests.get(f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_name}", params=payload)
    puuid = account_response.json().get("puuid")
    return puuid


def get_match_history(puuid):
    # retrieve last 10 matches
    match_history_response = requests.get(
        f'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids',
        params={'api_key': riot_api_key, 'queue': 420, 'count': 10}
    )
    return match_history_response.json()

def get_match_data(match_id: str):
    match_data_response = requests.get(f'https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}', params=payload)
    return match_data_response.json()

def get_match_timeline_data(match_id: str):
    match_timeline_response = requests.get(f'https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}/timeline', params=payload)
    return match_timeline_response.json()