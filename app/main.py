# Create FastAPI instance and register routes

from fastapi import FastAPI
from .routers import router

app = FastAPI(title="Concurrent File Processor")
app.include_router(router, prefix="", tags=["routes"])




