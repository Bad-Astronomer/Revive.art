from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class ImagePrompt(BaseModel):
    image_url: str
    prompt: str

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/process/")
def process_image_prompt(image_prompt: ImagePrompt):
    # Process the image URL and prompt here
    return {"image_url": image_prompt.image_url, "prompt": image_prompt.prompt}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)