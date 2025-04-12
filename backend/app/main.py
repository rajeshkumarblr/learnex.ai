from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, RedirectResponse
from pathlib import Path
from .database import db
from .config import settings
import validators
from typing import List

app = FastAPI(title="LearnEx API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a pdfs directory if it doesn't exist
PDFS_DIR = Path("pdfs")
PDFS_DIR.mkdir(exist_ok=True)

# Mount the pdfs directory with proper configuration
app.mount("/pdfs", StaticFiles(directory=str(PDFS_DIR), html=True), name="pdfs")

@app.get("/")
async def root():
    return {"message": "Welcome to LearnEx API"}

@app.get("/api/books")
async def get_books():
    books = list(db.books.find())
    for book in books:
        book["_id"] = str(book["_id"])
        pdf_url = book.get("pdf_url", "")
        # Only modify if it's not already a complete URL
        if pdf_url and not validators.url(pdf_url):
            # Remove any existing /pdfs/ prefix
            pdf_path = pdf_url.replace('/pdfs/', '').strip('/')
            book["pdf_url"] = f"{settings.base_url}/pdfs/{pdf_path}"
    return books

@app.get("/api/books/{book_id}")
async def get_book(book_id: str):
    book = db.books.find_one({"_id": book_id})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    book["_id"] = str(book["_id"])
    pdf_url = book.get("pdf_url", "")
    if pdf_url and not validators.url(pdf_url):
        pdf_path = pdf_url.replace('/pdfs/', '').strip('/')
        book["pdf_url"] = f"{settings.base_url}/pdfs/{pdf_path}"
    return book

@app.get("/api/books/{book_id}/download")
async def download_book(book_id: str):
    book = db.books.find_one({"_id": book_id})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    pdf_url = book.get("pdf_url", "")
    if not pdf_url:
        raise HTTPException(status_code=404, detail="PDF URL not found")

    # If it's an external URL (like OpenStax)
    if validators.url(pdf_url):
        # Instead of trying to serve it directly, redirect to the URL
        return RedirectResponse(url=pdf_url)
    
    # For local files
    try:
        pdf_filename = pdf_url.split("/")[-1]
        pdf_path = PDFS_DIR / pdf_filename
        
        if not pdf_path.exists():
            raise HTTPException(
                status_code=404, 
                detail=f"PDF file not found: {pdf_filename}"
            )
        
        return FileResponse(
            path=str(pdf_path),
            media_type="application/pdf",
            filename=pdf_filename
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Error downloading PDF: {str(e)}"
        )

@app.get("/api/categories")
async def get_categories():
    categories = list(db.categories.find())
    for category in categories:
        category["_id"] = str(category["_id"])
        if "parent_id" in category:
            category["parent_id"] = str(category["parent_id"])
    return categories

@app.get("/api/categories/{category_id}/books")
async def get_books_by_category(category_id: str):
    books = list(db.books.find({"category_id": category_id}))
    for book in books:
        book["_id"] = str(book["_id"])
    return books