from fastapi import FastAPI, HTTPException, UploadFile, File
# from pydantic import BaseModel
import json

app = FastAPI()

# class File(BaseModel):
#     text: str = None
#     is_uploaded : bool = False

files = []


@app.get("/") #Defines path for root
def root():
    return {"Hello" : "World"}


@app.post("/upload") #endpoint for uploading a file
async def upload_file(uploaded_file: UploadFile = File(...)):
    if uploaded_file.content_type != "application/json" : #check type is correct
        raise HTTPException(status_code=404, detail="Invalid document type")
    else:
        data = await uploaded_file.read() #await - pause async function and resume when ready since reading is slow 
        content = json.loads(data.decode("utf-8")) #convert bytes to json 
    return {"content":content, "filename":uploaded_file.filename}


