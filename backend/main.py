from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create pdfs directory if it doesn't exist
os.makedirs("pdfs", exist_ok=True)

# Mount the PDF directory with logging
@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    return response

# Mount static files after middleware
app.mount("/pdfs", StaticFiles(directory="pdfs"), name="pdfs")