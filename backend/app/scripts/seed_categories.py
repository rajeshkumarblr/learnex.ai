from pymongo import MongoClient
from bson import ObjectId

categories_data = [
    {
        "_id": "python",
        "name": "Python",
        "order": 1
    },
    {
        "_id": "python_basic",
        "name": "Basic",
        "parent_id": "python",
        "order": 1
    },
    {
        "_id": "python_advanced",
        "name": "Advanced",
        "parent_id": "python",
        "order": 2
    }
]

def seed_categories():
    client = MongoClient("mongodb://localhost:27017")
    db = client.learnex
    
    # Clear existing categories
    db.categories.drop()
    
    # Insert new categories
    db.categories.insert_many(categories_data)
    
    # Update books to include category_id
    db.books.update_many({}, {"$set": {"category_id": "python_basic"}})

if __name__ == "__main__":
    seed_categories()