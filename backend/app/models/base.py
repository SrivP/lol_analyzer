from sqlalchemy.orm import DeclarativeBase # type: ignore


# Note to self: need to make engine, nope, alembic handles that. It helps with version control and migrations. It can generate migration scripts based on changes to the models, and it can apply those migrations to the database. This allows you to keep your database schema in sync with your application code as it evolves.

class Base(DeclarativeBase):
    pass