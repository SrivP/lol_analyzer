from sqlalchemy import create_engine #type:ignore
import os
from dotenv import load_dotenv, find_dotenv # pyright: ignore[reportMissingImports]
from sqlalchemy.orm import sessionmaker # type: ignore


load_dotenv(find_dotenv())

engine = create_engine(os.getenv("DATABASE_URL"), echo=True)

Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()