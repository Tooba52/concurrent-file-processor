# Checked uplaoded file is valid, converts to dataframe and returns

from app.core.config import *
from fastapi import UploadFile, HTTPException
import pandas as pd
from pandas import json_normalize
import json


async def upload_file(uploaded_file: UploadFile):
    # File type check
    if uploaded_file.content_type not in ALLOWED_MIME_TYPES: 
        raise HTTPException(status_code=400, detail="Invalid document type")
    
    # File size check
    rawData = await uploaded_file.read()
    if len(rawData) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=400, detail="Document is too large")
    
    # JSON case
    if uploaded_file.content_type == "application/json":
        return json_convertor(rawData)
    # CSV case
    elif uploaded_file.content_type == "text/csv":
        return csv_convertor(rawData)
    # Excel case
    elif uploaded_file.content_type in ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]:
        return excel_convertor(rawData)
    
# Conversion helper functions
def json_convertor(rawData: bytes):
    json_data = json.loads(rawData.decode("utf-8")) # converts bytes to string
    try: #if directly convertibale 
        dataFrame = pd.DataFrame(json_data)
    except: #if not directly convertibale 
        dataFrame = json_normalize(json_data)
    return dataFrame.to_dict(orient="records")

def csv_convertor(rawData: bytes):
    pass

def excel_convertor(rawData: bytes):
    pass