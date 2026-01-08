# Dockerfile, Image, Container
#may need to add docker-compose for database

#Base image
FROM python:3.13.5-slim

# Set working directory
WORKDIR /app

# Copy requirements to docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt 

# Copy the rest of the app
COPY app/ .

# Expose port
EXPOSE 8000

# Run FastAPI with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]