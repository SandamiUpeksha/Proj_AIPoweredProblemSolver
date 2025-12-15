from fastapi import FastAPI
from pydantic import BaseModel

# >>> Step 01 - Initialize the App <<<
app = FastAPI()

# >>> Step 02 - Define the data shape <<<
class ProblemInput(BaseModel):
    text: str

# >>> Step 03 - The Logic (Vending Machine Rules) <<<
def find_solution(text):
    text = text.lower()

    # Category : Chores
    if any(word in text for word in ["clean", "dishes", "laundry", "trash", "messy"]):
        return "Chores", ["Create a shared chore chart", "Do the task together with music on"]
    
    # Category : Finances
    elif any(word in text for word in ["money", "expensive", "bill", "cost", "spend"]):
        return "Finances", ["Set a weekly budget review", "Agree on a spending limit"]
    
    # Category : Affection/Attention
    elif any(word in text for word in ["ignore", "love", "sex", "kiss", "time", "phone", "call", "answer"]):
        return "Affection", ["Schedule a date night", "No-phone rule after 8 PM"]
    
    # Default : (If we don't know)
    else:
        return "General", ["Use 'I feel' statements", "Take a calm timeout before talking"]

# >>> Step 04 - The API Endpoint <<<
@app.post("/predict")
async def predict_solution(input_data: ProblemInput):
    category, solutions = find_solution(input_data.text)

    return {
        "category": category,
        "suggested_solutions": solutions
    }

# >>> Step 05 - Simple check to see whether the running is okay <<<
@app.get("/")
def home():
    return {"message": "ResolveAI is running"}
