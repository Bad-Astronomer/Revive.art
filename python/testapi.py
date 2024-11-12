from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import uvicorn
import os

# Configure the generative model
genai.configure(api_key=os.environ["genai_api_key1"])
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash-latest")

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body using Pydantic
class GenerateRequest(BaseModel):
    image_url: str
    prompt: str

@app.get("/")
async def root():
    return {"message": "ok"}

@app.post("/generate")
async def generate(request: GenerateRequest):
    # You can use both image_url and prompt in your logic here
    print(f"Received image URL: {request.image_url}")
    print(f"Received prompt: {request.prompt}")

    response = model.generate_content(request.prompt)
    return {"generated_text": response.text}

if __name__ == "__main__":
    uvicorn.run("testapi:app", host="127.0.0.1", port=8000, reload=True)
