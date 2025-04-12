from app.database import db
from app.models import Book, Chapter

def setup_db():
    print("Creating collections...")
    # Drop existing collections for clean slate
    db.books.drop()
    db.chapters.drop()
    print("Database collections cleared!")

def add_sample_data():
    try:
        # Add OpenStax Python book
        book = {
            "title": "Introduction to Python Programming",
            "description": "A comprehensive introduction to Python programming covering fundamentals, data structures, algorithms, and applications.",
            "pdf_url": "https://openstax.org/books/introduction-python-programming/pages/1-introduction"
        }
        book_id = db.books.insert_one(book).inserted_id

        # Add main chapters
        chapters = [
            {"title": "Introduction", "page_number": 1},
            {"title": "Basic Python Programming", "page_number": 15},
            {"title": "Numbers and Data Types", "page_number": 45},
            {"title": "Control Structures", "page_number": 89},
            {"title": "Functions", "page_number": 147},
            {"title": "Strings", "page_number": 195},
            {"title": "Lists and Tuples", "page_number": 251},
            {"title": "Dictionaries and Sets", "page_number": 301},
            {"title": "Files and Exceptions", "page_number": 355},
            {"title": "Classes and Objects", "page_number": 401}
        ]

        # Insert main chapters and store their IDs
        chapter_ids = []
        for chapter in chapters:
            chapter["book_id"] = str(book_id)
            result = db.chapters.insert_one(chapter)
            chapter_ids.append(result.inserted_id)

        # Add subchapters for Introduction
        intro_subchapters = [
            {"title": "What is a Computer Program?", "page_number": 2},
            {"title": "Computer Hardware Architecture", "page_number": 5},
            {"title": "Python as a Programming Language", "page_number": 8},
            {"title": "Installing Python", "page_number": 11}
        ]

        for subchapter in intro_subchapters:
            subchapter["book_id"] = str(book_id)
            subchapter["parent_id"] = str(chapter_ids[0])
            db.chapters.insert_one(subchapter)

        print("Sample data added successfully!")

    except Exception as e:
        print(f"Error adding sample data: {e}")
        raise

if __name__ == "__main__":
    setup_db()
    add_sample_data()