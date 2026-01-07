from fastapi import FastAPI, Body, HTTPException
from pydantic import BaseModel

app = FastAPI()

class File(BaseModel):
    text: str = None
    is_uploaded : bool = False

files= []

@app.get("/") #Defines path for root
def root():
    return {"Hello" : "World"}

@app.post("/files") #add file to list
def create_file(file: File = Body(..., embed=True)):
    files.append(file)
    return files

@app.get("/files", response_model=list[File]) #return all files in list, default 10
def list_files(limit:int = 10):
    return files[0:limit]

@app.get("/files/{file_id}", response_model=File) #return file based off its index in the list
def get_file(file_id:int):
    if file_id < len(files):
        return files[file_id]
    else:
        raise HTTPException(status_code=404, detail="file not found")
