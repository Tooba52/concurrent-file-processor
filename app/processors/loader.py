from app.core.config import *
from fastapi import UploadFile, HTTPException
from pandas import pd

# 1. accept uplaoded file
# 2. check type and size are valid
# 3. convert to dataframe
# 4. return the dataframe
async def upload_file(uploaded_file: UploadFile):
    if uploaded_file not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Invalid document type")
    elif uploaded_file.size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="Document is too large")
    else:
        if uploaded_file == "application/json":
            pass
