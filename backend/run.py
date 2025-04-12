import uvicorn
from app.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.api_host,  # Changed from API_HOST to api_host
        port=settings.api_port,  # Changed from API_PORT to api_port
        reload=True
    )