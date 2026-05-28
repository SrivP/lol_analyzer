# League of Legends Analyzer

A full-stack project that provides meaningful feedback and an aggregation of statistics to improve a summoner's gameplay!

## 🌟 Highlights

- Robust ETL (Extract, Trasnform, Load) data ingestion pipeline that parses deeply nested / multi-layered data from api responses and turns it into a noramalized relational database
- Used custom memory-efficient deduplication methods (use of sets) as a means of handling data quirks (overlapping frames, duplicate time frames)
- Transforms raw match variables into dynamic, real-time coaching analytics, including laning phase gold deltas, vision control tracking, and CS benchmarking
- Implemented a Redis caching layer with a 1-hour TTL on heavy analytical endpoints, drastically reducing PostgreSQL load and ensuring sub-millisecond response times on dashboard reloads.
- Fully containerized stack utilizing FastAPI, React+TypeScript, and PostgreSQL (with redis for repeat requests in a short time) deployed to Oracle Cloud Infrastructure (OCI).

## ℹ️ Overview

The purpose of this software is to take the raw data from the riot api and to build out a dashboard where users can see information such as gold difference between you and your direct enemy (opponent team player who's holding the same position as you), creep score, performance index etc. These may be things you can simply see during the game, but when you're in the middle of a league game and the opps are rage baiting you it's unlikely for you to pay attention to the stats that truly matter. This acts as a way for the user to get a bird-eye view of their current performance and see their pain points (low CS, kills/assists per death etc.) to work on improving their game play.

## ⬇️ Installation Instructions

To run this project locally, you will need **Python 3.10+**, **Node.js 18+**, and **Docker** installed on your machine. You will also need a [Riot Games Developer API Key](https://developer.riotgames.com/).

> **⚠️ Important Note on Riot API Keys:** Standard development keys expire every 24 hours. If the backend fails to ingest data with a 401/403 error, you must regenerate the key in the Riot Developer Portal and restart the backend server.

### 1. Database (PostgreSQL)

We use Docker to quickly spin up the database container.

```bash
docker-compose up -d db
```

### 2. Backend (FastAPI)

The backend utilizes uv for fast, reproducible dependency management.

```bash
cd backend
uv venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
uv pip install -e .

# Run Alembic migrations to build the schema
alembic upgrade head
```

> Create a .env file in the backend/ directory and add your Riot API key:
> RIOT_API_KEY=your_development_key_here

Start the server:

```bash
uvicorn app.main:app --reload
```

### Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at http://localhost:5173.

## 🔮 Roadmap & Next Steps

This project is actively being developed to scale from a local analytics tool into a deployed, ML-enhanced platform.

- [In Progress] Cloud Deployment: Containerizing the full stack (FastAPI, React, PostgreSQL) via Docker Compose and deploying behind an Nginx reverse proxy on an Oracle Cloud Infrastructure (OCI) instance.

- Machine Learning Pipeline: Building an XGBoost/LightGBM win-prediction model leveraging engineered features like Gold Diff @ 15, CS Diff @ 15, and Vision Score.

- Explainable AI: Integrating SHAP (SHapley Additive exPlanations) values so the application can output human-readable, specific coaching advice based on the ML model's feature importance.

- Playstyle Clustering: Utilizing K-Means clustering on historical telemetry to categorize player archetypes.

- CI/CD Integration: Setting up GitHub Actions for automated testing and deployment.

## 💭 Feedback and Contributions

As a first-year engineering student, I built this project to tackle real-world data engineering and full-stack challenges. I am actively looking for feedback on system architecture, database design, and React state management.

If you see an area for optimization, have deployment advice, or just want to discuss the code, please feel free to open an Issue or start a Discussion.
