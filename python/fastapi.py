from fastapi import FastAPI, Form
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class Item(BaseModel):
    prompt: str
    image_url: str

@app.post("/items/")
async def create_item(item: Item):
    return item

@app.post("/form/")
async def create_form_item(prompt: str = Form(...), image_url: str = Form(...)):
    return {"prompt": prompt, "image_url": image_url}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)