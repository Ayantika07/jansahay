# JanSahay FastAPI Backend Service

This is the Python FastAPI backend service powering the JanSahay Citizen Welfare & Scheme Portal.

## Features
- **Authentication**: JWT-based secure user register/login endpoints.
- **Government Scheme Directory**: Full search, state & category filtering.
- **Eligibility Engine**: Multi-criteria matching algorithm evaluating citizen age, income, state, and occupation against scheme criteria.
- **Public Grievance Redressal**: Register complaints and track status via unique 12-digit reference IDs.
- **Gemini AI Multilingual Chatbot**: Powered by Google Gemini SDK (`@google/genai`) providing responses in English, Hindi (हिंदी), and Bengali (বাংলা).

## Prerequisites
- Python 3.10 or higher
- Google Gemini API Key
- Supabase Project URL & Anon Key (Optional)

## Local Setup

1. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Fill in `GEMINI_API_KEY`, `SUPABASE_URL`, and `SUPABASE_KEY`.

4. Run the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

5. Access interactive Swagger API documentation at:
`http://localhost:8000/docs`
