# generated with AI

# backend/Dockerfile
FROM python:3.13-slim

WORKDIR /app

# Install uv package manager
RUN pip install uv

# Copy the dependency file first to leverage Docker caching
COPY pyproject.toml .

# Install dependencies into the system environment
RUN uv pip install --system -e .

# Copy the rest of your FastAPI code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]