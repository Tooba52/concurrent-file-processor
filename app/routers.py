#API endpoints links, https request -> functions -> https responses

from fastapi import UploadFile, File, APIRouter
from .processors.loader import upload_file
from typing import Annotated

router = APIRouter()

# Root endpoint
@router.get("/")
async def root():
    return {"Hello" : "World"}

# File upload endpoint
@router.post("/uploadfiles")
async def upload_file_endpoint(uploaded_file: UploadFile = File(...)):
    return await upload_file(uploaded_file)

# async def upload_file_endpoint(files: list[UploadFile]):
#     return {"filenames": [file.filename for file in files]}
    