from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from .config import settings
import logging

logger = logging.getLogger(__name__)

def init_mongodb():
    try:
        client = MongoClient(settings.mongodb_url)
        db = client[settings.db_name]
        # Test the connection
        client.server_info()
        logger.info("Successfully connected to MongoDB!")
        return db, client
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {str(e)}")
        raise

# Initialize database connections
try:
    db, client = init_mongodb()
    async_client = AsyncIOMotorClient(settings.mongodb_url)
    async_db = async_client[settings.db_name]
except Exception as e:
    logger.error(f"Failed to initialize database: {e}")
    raise