from fastapi import FastAPI

app = FastAPI()

@app.get("/") #Defines path for http GET mthod
def root():
    return {"Hello" : "World"}