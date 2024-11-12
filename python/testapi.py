import google.generativeai as genai
from fastapi import FastAPI, HTTPException
import uvicorn
import os

genai.configure(api_key=os.environ["genai_api_key1"])
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash-latest")

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "ok"}

@app.post("/generate")
async def generate(prompt: str):
    # result = model.generate_content(
    #     prompt,
    #     generation_config=genai.GenerationConfig(
    #         response_mime_type="application/json",
    #         response_schema=list[dict]),
    #     request_options={"timeout": 600},
    # )
    response = model.generate_content(prompt)
    return response.text

if __name__ == "__main__":
    uvicorn.run("testapi:app", host="127.0.0.1", port=8000, reload=True)