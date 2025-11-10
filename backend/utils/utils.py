import os
import csv
import json
import shutil
from uuid import uuid4
from fastapi import HTTPException
from models.model import Item

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


def valid_or_not_image(image):
    allowed_extensions = {".jpg", ".jpeg", ".png", ".gif"}

    if image.filename is None:
        raise HTTPException(
            status_code=400, detail="No filename provided for the uploaded file"
        )

    file_extension = os.path.splitext(image.filename)[1].lower()

    if file_extension not in allowed_extensions:
        raise HTTPException(
            status_code=400, detail="Invalid file type. Only images are allowed."
        )

    file_id = str(uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_extension}")

    try:
        with open(file_path, "wb") as f:
            shutil.copyfileobj(image.file, f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")

    return [file_id, file_extension]


def valid_or_not_json(data):
    try:
        item_dict = json.loads(data)
        item_model = Item(**item_dict)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Data is not JSON format!")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    return [item_dict, item_model]


def write_csv(products):
    with open("products.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=Item.model_fields.keys())
        writer.writeheader()
        writer.writerows(products)
