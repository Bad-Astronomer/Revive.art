from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import uvicorn
import os
import requests
from PIL import Image
from io import BytesIO
from uuid import uuid4
from colorize import colourize_image
from utils.cludinary_util import upload_to_cloudinary

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
    image_name = f"{uuid4()}.jpg"
    image_path = os.path.join("uploads", image_name)
    with open(image_path, "wb") as f:
        f.write(response.content)

    image = Image.open(BytesIO(response.content))

    prompt_template = """
        Given the image and user prompt, prompt engineer a better version 
        of the user prompt to colorize the image using Control Net 2.1. 
        The prompt should be in English. Do not mention name of any characters. 
        Do not mention the name of the image, model used, or the user. 
        Important: Keep the colors as described in the user prompt. 
        If colors are not mentioned in the user prompt, 
        Imagine how a colored version would look and describe the image with colors. 
        \n\n User prompt: {prompt}
    """

    image = genai.upload_file(image_path)
    response = gemini.generate_content(
        [image, "\n\n", prompt_template.format(prompt=request.prompt)],
    )
    colourised_image = colourize_image(filename=image_name, prompt=response.text)
    colour_image_url = upload_to_cloudinary(file_path=colourised_image)
    return {"generated_text": response.text, "image_url": colour_image_url}

if __name__ == "__main__":
    uvicorn.run("testapi:app", host="127.0.0.1", port=8000, reload=True)
