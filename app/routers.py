#API endpoints links, https request -> functions -> https responses

from fastapi import UploadFile, File, APIRouter, HTTPException, Query
from .processors.exporter import export_to_csv, export_to_excel
from .core.config import *

router = APIRouter()

# Root endpoint
@router.get("/")
async def root():
    return {"message": "Concurrent File Processor API. Use /merge to upload and combine files."}

# Export uploaded files by selected format
@router.post("/merge")
async def merge_files(
    files: list[UploadFile] = File(...),format: str = Query("excel", enum=["csv", "excel"])):

    # Minimum uploads
    if files == None or len(files) < MIN_UPLOADS:
        raise HTTPException(status_code=400, detail="You must upload at least 2 files to merge.")
    
    # Max uploads
    if len(files) > MAX_UPLOADS:
        raise HTTPException(status_code=400,detail="Too many files. Max allowed is {MAX_UPLOADS}.")
    
    # Export format
    if format == "csv":
        return await export_to_csv(files)
    return await export_to_excel(files)