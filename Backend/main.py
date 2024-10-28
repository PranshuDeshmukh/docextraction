import os
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import pytesseract
from PIL import Image
import re
from fastapi.middleware.cors import CORSMiddleware

# pytesseract.pytesseract.tesseract_cmd = r"E:\Tesss\tesseract.exe" # your path of tesseract
pytesseract.pytesseract.tesseract_cmd = os.getenv("TESSERACT_CMD_PATH", "/usr/bin/tesseract")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this to restrict to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract_pan_details/")
async def extract_pan_details(
    panCard: UploadFile = File(...)
):
    response_data = {}
    
    try:
        # Define a function to extract text from a file
        def extract_text(file: UploadFile):
            image = Image.open(file.file)
            return pytesseract.image_to_string(image)

        # Process PAN Card
        extracted_text_pan = extract_text(panCard)
        print("Extracted Text from PAN Card:\n", extracted_text_pan)

        # Define regex patterns for PAN Card
        name_pattern = r'(?i)(?:Name\s*)\s*([A-Za-z\s]+)'
        pan_pattern = r'([A-Z]{5}[0-9]{4}[A-Z])'
        dob_pattern = r'(\d{2}/\d{2}/\d{4})'
        father_name_pattern = r"Father's\sName\s*([A-Z\s]+)"

        # Extract values from PAN Card
        Name = re.search(name_pattern, extracted_text_pan)
        PAN = re.search(pan_pattern, extracted_text_pan)
        Date_of_Birth = re.search(dob_pattern, extracted_text_pan)
        Father_Name = re.search(father_name_pattern, extracted_text_pan)

        response_data["Name"] = Name.group(1).strip() if Name else None
        response_data["Name"] = response_data["Name"].split('\n')[0]
        response_data["PAN"] = PAN.group(1).strip() if PAN else None
        response_data["Father_name"] = Father_Name.group(1).strip() if Father_Name else None
        response_data["dob"] = Date_of_Birth.group(1).strip() if Date_of_Birth else None

        
        return JSONResponse(content=response_data)

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
