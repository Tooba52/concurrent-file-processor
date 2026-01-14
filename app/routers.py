#API endpoints links, https request -> functions -> https responses

from fastapi import UploadFile, File, APIRouter, HTTPException
from .processors.loader import upload_file
from .processors.concurrency import concurrent_processing
from .core.config import *

router = APIRouter()

# Root endpoint
@router.get("/")
async def root():
    return {"Hello" : "World"}


@router.post("/uploadfiles")
async def upload_files_endpoint(files: list[UploadFile] = File(...)):
    if len(files) > MAX_UPLOADS:
        raise HTTPException(status_code=400, detail=f"Too many files. Max allowed is {MAX_UPLOADS}.")
    # Delegate processing to concurrency module
    return await concurrent_processing(files)

