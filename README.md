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

### Running with DevContainer (Recommended)
1. Prerequisites:
   - Visual Studio Code
   - Docker Desktop
   - VS Code Remote - Containers extension

2. Setup Steps:
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/learnex.ai.git
   cd learnex.ai

   # Open in VS Code
   code .
   ```

3. When VS Code opens, you'll be prompted to "Reopen in Container" - click this to start
4. The DevContainer will build and install all dependencies automatically
5. Once the container is ready, open two terminals in VS Code:
   ```bash
   # Terminal 1 - Start Backend
   cd /workspace/backend
   python run.py

   # Terminal 2 - Start Frontend
   cd /workspace/frontend
   npm run dev
   ```

### Manual Setup (Alternative)

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

#### Frontend Setup
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

## Using LearnEx.AI

### Dashboard Overview
![Dashboard Overview](/docs/images/dashboard.png)
The main dashboard provides:
- Left sidebar: Document categories and navigation
- Center: PDF viewer with adaptive width
- Right sidebar: AI assistance and notes

### Key Features

#### 1. Document Navigation
![Document Navigation](/docs/images/navigation.png)
- Use the expandable sidebar to browse documents
- Click category headers to view available documents
- Recent documents appear at the top

#### 2. PDF Reading Experience
![PDF Viewer](/docs/images/pdf-viewer.png)
- Zoom controls (+ / -)
- Page navigation
- Bookmark important pages
- Adjust viewer width

#### 3. AI Assistance
![AI Assistant](/docs/images/ai-assistant.png)
- Ask questions about the content
- Get summaries of sections
- Request explanations of complex topics
- Save important insights

#### 4. Document Management
![Document Management](/docs/images/document-management.png)
- Upload new PDFs
- Organize into categories
- Add tags and descriptions
- Search across all documents

### Keyboard Shortcuts
| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Toggle Sidebar | `Ctrl + B` | `⌘ + B` |
| Next Page | `→` | `→` |
| Previous Page | `←` | `←` |
| Zoom In | `Ctrl + +` | `⌘ + +` |
| Zoom Out | `Ctrl + -` | `⌘ + -` |
| Search | `Ctrl + F` | `⌘ + F` |

### Best Practices
1. **Organization**: Keep documents organized in relevant categories
2. **Tagging**: Use descriptive tags for easier search
3. **AI Interaction**: Be specific with questions to get better responses
4. **Regular Backups**: Export important notes and bookmarks regularly

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
