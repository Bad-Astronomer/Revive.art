import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from dotenv import load_dotenv
load_dotenv('.env')
cloudinary.config(
    cloud_name=os.environ["CLOUDINARY_CLOUD_NAME"],
    api_key=os.environ["CLOUDINARY_API_KEY"],
    api_secret=os.environ["CLOUDINARY_API_SECRET"]
)

def upload_to_cloudinary(file_path):
    try:
        response = cloudinary.uploader.upload(file_path)
        return response['secure_url']
    except Exception as e:
        print(f"An error occurred: {e}")
        return None