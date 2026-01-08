# 1. create fastapi app
# 2. config (title,verison)
# 3. routers

from fastapi import FastAPI, HTTPException, UploadFile, File
import json

app = FastAPI()

allowed_doc_types = ["application/json", "text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]

@app.get("/") #Defines path for root
def root():
    return {"Hello" : "World"}


@app.post("/upload") #endpoint for uploading a file
async def upload_file(uploaded_file: UploadFile = File(...)):
    pass
    
    # return {"content":content, "filename":uploaded_file.filename}


