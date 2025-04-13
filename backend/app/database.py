from pymongo import MongoClient
from .config import settings
import logging

logger = logging.getLogger(__name__)

def get_database():
    try:
        client = MongoClient(settings.mongodb_url)
        db = client[settings.db_name]
        # Test the connection
        client.server_info()
        logger.info("Successfully connected to MongoDB")
        return db
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {str(e)}")
        raise

db = get_database()