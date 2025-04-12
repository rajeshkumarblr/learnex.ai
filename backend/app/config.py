from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    base_url: str = "http://localhost:8000"
    mongodb_url: str = "mongodb://localhost:27017"
    db_name: str = "learnex"
    api_host: str = "127.0.0.1"  # Added API host setting
    api_port: int = 8000         # Added API port setting

    class Config:
        env_file = ".env"
        case_sensitive = False

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()