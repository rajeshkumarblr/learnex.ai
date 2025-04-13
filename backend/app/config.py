from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    base_url: str = "http://localhost:8000"
    mongodb_url: str = "mongodb://mongodb:27017"  # No auth credentials needed
    db_name: str = "learnex"
    api_host: str = "0.0.0.0"  # Updated for Docker
    api_port: int = 8000

    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()