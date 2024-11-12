from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import uvicorn
import os
import requests
from PIL import Image
from io import BytesIO

genai.configure(api_key=os.environ["genai_api_key1"])
gemini = genai.GenerativeModel(model_name="models/gemini-1.5-flash-latest")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    image_url: str
    prompt: str

@app.get("/")
async def root():
    return {"message": "ok"}

@app.post("/generate")
async def generate(request: GenerateRequest):
    print(f"Received image URL: {request.image_url}")
    print(f"Received prompt: {request.prompt}")

    try:
        response = requests.get(request.image_url)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Failed to download image: {e}")

    os.makedirs("uploads", exist_ok=True)
    image_path = os.path.join("uploads", "downloaded_image.jpg")
    with open(image_path, "wb") as f:
        f.write(response.content)

    image = Image.open(BytesIO(response.content))

    response = gemini.generate_content(request.prompt)
    return {"generated_text": response.text, "image_path": image_path}

if __name__ == "__main__":
    uvicorn.run("testapi:app", host="127.0.0.1", port=8000, reload=True)
