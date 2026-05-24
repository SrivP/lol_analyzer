# lol_analyzer

### Database Schema

CREATE TABLE players (
puuid TEXT PRIMARY KEY,
game_name TEXT NOT NULL,
tag_line TEXT NOT NULL,
summoner_id TEXT,
updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE matches (
match_id TEXT PRIMARY KEY,
game_start TIMESTAMPTZ NOT NULL,
game_duration INTEGER NOT NULL, -- seconds
game_version TEXT,
queue_id INTEGER NOT NULL, -- 420 = ranked solo
map_id INTEGER NOT NULL
);

CREATE TABLE match_participants (
id SERIAL PRIMARY KEY,
match_id TEXT REFERENCES matches(match_id),
puuid TEXT REFERENCES players(puuid),
participant_id INTEGER NOT NULL, -- 1-10, links to timeline
champion_id INTEGER NOT NULL,
champion_name TEXT NOT NULL,
team_id INTEGER NOT NULL, -- 100 or 200
individual_position TEXT, -- TOP, JUNGLE, etc.
team_position TEXT,
win BOOLEAN NOT NULL,

    -- End-of-game stats
    kills                 INTEGER, deaths              INTEGER, assists            INTEGER,
    cs_total              INTEGER, cs_per_min          FLOAT,
    vision_score          INTEGER, wards_placed        INTEGER,
    wards_killed          INTEGER, control_wards       INTEGER,
    gold_earned           INTEGER, gold_spent          INTEGER,
    damage_to_champions   INTEGER, damage_taken        INTEGER,
    kill_participation    FLOAT,
    kda                   FLOAT,
    gold_per_min          FLOAT,
    damage_per_min        FLOAT,
    lane_cs_at_10         INTEGER,

    UNIQUE(match_id, participant_id)

);

CREATE TABLE timeline_frames (
id SERIAL PRIMARY KEY,
match_id TEXT REFERENCES matches(match_id),
participant_id INTEGER NOT NULL,
timestamp_min INTEGER NOT NULL, -- 1, 2, 3... (minute mark)

    -- Gold
    current_gold                INTEGER,
    total_gold                  INTEGER,
    gold_per_second             INTEGER,

    -- CS
    minions_killed              INTEGER,
    jungle_minions_killed       INTEGER,

    -- Combat
    level                       INTEGER,
    xp                          INTEGER,
    time_enemy_spent_controlled INTEGER,

    -- Position (for heatmaps later)
    pos_x                       INTEGER,
    pos_y                       INTEGER,

    -- Damage (cumulative at this frame)
    physical_damage_to_champs   INTEGER,
    magic_damage_to_champs      INTEGER,
    total_damage_to_champs      INTEGER,
    total_damage_taken          INTEGER,

    UNIQUE(match_id, participant_id, timestamp_min)

);
