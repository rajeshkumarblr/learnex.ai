# LearnEx.AI - AI-Assisted Learning IDE

An intelligent learning platform that provides an AI-assisted IDE experience for reading and understanding educational content. The platform helps users learn efficiently by providing interactive PDF reading with AI assistance.

## Project Overview

LearnEx.AI aims to transform traditional document reading into an interactive learning experience by:
- Providing a clean, IDE-like interface for educational content
- Organizing learning materials in a structured hierarchy
- Offering AI-powered assistance while reading
- Maintaining context across learning sessions
- Supporting both local and external educational resources

## Project Structure

```
learnex.ai/
├── backend/
│   ├── app/
│   │   ├── config.py      # Application configuration
│   │   ├── database.py    # MongoDB connection handling
│   │   ├── main.py        # FastAPI application
│   │   └── scripts/       # Database seeding and utilities
│   ├── pdfs/             # Local PDF storage
│   ├── requirements.txt   # Python dependencies
│   ├── run.py            # Application entry point
│   └── .env              # Environment variables
│
└── frontend/
    ├── app/              # Next.js pages and layouts
    ├── components/       # React components
    │   ├── CustomSidebar.tsx
    │   ├── PDF/
    │   └── ui/          # Shared UI components
    ├── lib/             # Utilities and providers
    ├── public/          # Static files and PDFs
    ├── services/        # API service layers
    ├── styles/          # Global styles
    └── types/           # TypeScript definitions
```

## Technologies Used

### Backend
- FastAPI - Modern Python web framework
- MongoDB - Document database
- Motor - Async MongoDB driver
- PyDantic - Data validation
- Python-dotenv - Environment management

### Frontend
- Next.js 14 - React framework
- React-PDF - PDF viewer
- TailwindCSS - Styling
- TypeScript - Type safety
- Lucide Icons - UI icons

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- MongoDB 7.0+

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Configuration
1. Backend (.env):
```plaintext
BASE_URL=http://localhost:8000
MONGODB_URL=mongodb://localhost:27017
DB_NAME=learnex
API_HOST=127.0.0.1
API_PORT=8000
```

2. Start MongoDB:
```bash
sudo systemctl start mongodb
```

## Running the Application

1. Start the backend server:
```bash
cd backend
source venv/bin/activate
python run.py
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:3000`

## Features

- 📚 Hierarchical content organization
- 📖 Integrated PDF viewer with bookmarks
- 🔍 Auto-expanding table of contents
- 🎯 Page width optimization
- 🔄 Smooth navigation between documents
- 📱 Responsive sidebar management
- 🚀 Fast local PDF serving

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
