from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="JanSahay Citizen Portal Backend",
    description="FastAPI service for JanSahay government scheme discovery, eligibility evaluation, grievance redressal & Gemini AI assistant.",
    version="1.0.0"
)

# CORS setup
origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "service": "JanSahay FastAPI Backend",
        "gemini_configured": bool(os.getenv("GEMINI_API_KEY")),
        "supabase_configured": bool(os.getenv("SUPABASE_URL"))
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
