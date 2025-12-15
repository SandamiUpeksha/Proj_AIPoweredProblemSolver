from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="ResolveAI Service")

# CORS configuration - allow all origins for now
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProblemRequest(BaseModel):
    text: str

class PredictionResponse(BaseModel):
    predicted_category: str

# Simple keyword-based categorization
def categorize_problem(text: str) -> str:
    text_lower = text.lower()
    
    # Communication issues
    if any(word in text_lower for word in ['talk', 'communication', 'listen', 'understand', 'express', 'conversation']):
        return 'Communication Issues'
    
    # Trust issues
    elif any(word in text_lower for word in ['trust', 'lie', 'honest', 'secret', 'hide', 'cheating', 'faithful']):
        return 'Trust Issues'
    
    # Time management
    elif any(word in text_lower for word in ['time', 'busy', 'schedule', 'work', 'balance', 'quality time']):
        return 'Time Management'
    
    # Financial disagreements
    elif any(word in text_lower for word in ['money', 'financial', 'budget', 'expense', 'spend', 'save', 'bill', 'debt']):
        return 'Financial Disagreements'
    
    # Intimacy concerns
    elif any(word in text_lower for word in ['intimacy', 'sex', 'physical', 'affection', 'romance', 'love']):
        return 'Intimacy Concerns'
    
    # Family & in-laws
    elif any(word in text_lower for word in ['family', 'parents', 'in-laws', 'mother', 'father', 'relatives']):
        return 'Family & In-laws'
    
    # Different values
    elif any(word in text_lower for word in ['values', 'beliefs', 'religion', 'politics', 'principles', 'opinions']):
        return 'Different Values'
    
    # Jealousy
    elif any(word in text_lower for word in ['jealous', 'envy', 'insecure', 'possessive', 'attention']):
        return 'Jealousy'
    
    # Default category
    else:
        return 'Other'

@app.get("/")
async def root():
    return {"message": "ResolveAI Service is running", "status": "healthy"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: ProblemRequest):
    category = categorize_problem(request.text)
    return {"predicted_category": category}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
