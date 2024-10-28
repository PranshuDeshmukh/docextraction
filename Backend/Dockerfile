# Use an official Python image as a parent image
FROM python:3.9-slim

# Install Tesseract OCR and related packages
RUN apt-get update && \
    apt-get install -y tesseract-ocr libtesseract-dev && \
    apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy the backend code to the container
COPY . /app

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set the Tesseract path if needed in the application (optional)
ENV TESSERACT_CMD_PATH=/usr/bin/tesseract

# Expose the port the app runs on
EXPOSE 8000

# Run the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
