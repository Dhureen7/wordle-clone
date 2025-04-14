# Wordle Project

This repository contains a Wordle game implementation with a **frontend** built using [Next.js](https://nextjs.org) and a **backend** powered by [FastAPI](https://fastapi.tiangolo.com/) to provide word data for the game.

## Overview

- **Frontend**: A Next.js application that serves as the user interface for the Wordle game. It is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and includes features like automatic font optimization with [Geist](https://vercel.com/font).
- **Backend**: A FastAPI service that supplies the frontend with a curated list of five-letter words from a database, enabling the Wordle gameplay logic.

## Getting Started

### Prerequisites
- Node.js and npm (for the frontend)
- Python 3.8+ and pip (for the backend)
- Optional: Yarn, pnpm, or Bun for frontend development

### Frontend Setup
1. Navigate to the `frontend` directory:
   cd frontend
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

4. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
    
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Backend Setup
1. Navigate to the `backend` directory:
   cd backend
2. Create a virtual environment (optional but recommended):
   python -m venv venv
3. Activate the virtual environment:
   - Windows (PowerShell):
     .\venv\Scripts\Activate.ps1
   - Other systems:
     source venv/bin/activate
4. Install dependencies:
   pip install -r requirements.txt
5. Run the FastAPI server:
   uvicorn app:app --reload
6. The backend will be available at [http://localhost:8000](http://localhost:8000). The frontend can fetch word data from defined API endpoints (e.g., `/words`).

### Project Structure
- `backend/`: Contains the FastAPI application (`app.py`), word database (`words.db`), and word list (`five_letter_words.txt`).
- `frontend/`: Contains the Next.js application with source files in `src/app/` and public assets in `public/`.

## Learn More

### Frontend
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

### Backend
To learn more about FastAPI, check out:
- [FastAPI Documentation](https://fastapi.tiangolo.com/) - Learn about building APIs with Python.
- [FastAPI GitHub Repository](https://github.com/tiangolo/fastapi) - Contribute or explore the codebase.

## Deploying the Project

### Frontend Deployment
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Backend Deployment
You can deploy the FastAPI backend to platforms like:
- [Vercel](https://vercel.com/) (with a serverless function setup).
- [Heroku](https://www.heroku.com/) or [Render](https://render.com/) for a traditional server.
Refer to the respective platform’s documentation for deployment steps, ensuring the `words.db` and `five_letter_words.txt` are included or managed appropriately.

