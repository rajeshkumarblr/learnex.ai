from typing import List, Optional, Dict
from pydantic import BaseModel, Field
from datetime import datetime

class Chapter(BaseModel):
    title: str
    page_number: int
    parent_id: Optional[str] = None
    book_id: str
    content: str = ""
    embeddings: Optional[List[float]] = None
    metadata: Dict = Field(default_factory=dict)

class Book(BaseModel):
    title: str
    description: str
    pdf_url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    metadata: Dict = Field(default_factory=dict)