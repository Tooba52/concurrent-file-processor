#API endpoints links, https request -> functions -> https responses

from fastapi import UploadFile, File, APIRouter
from .processors.loader import upload_file

router = APIRouter()

# Root endpoint
@router.get("/")
async def root():
    return {"Hello" : "World"}

# File upload endpoint
@router.post("/")
async def upload_file_endpoint(uploaded_file: UploadFile = File(...)):
    result = await upload_file(uploaded_file)
    return result