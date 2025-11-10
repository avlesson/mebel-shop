import os
import csv
from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from models.model import Item
from utils.utils import valid_or_not_image, valid_or_not_json, write_csv

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/")
def get_products():
    products = []

    with open("products.csv", "r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            products.append(row)

    return products


@router.post("/create")
def create(data: str = Form(...), image: UploadFile = File(...)):

    valid_image = valid_or_not_image(image)
    valid_json = valid_or_not_json(data)

    with open("products.csv", "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=Item.model_fields.keys())

        if f.tell() == 0:
            writer.writeheader()

        item_dict = valid_json[1].model_dump()  # {}
        item_dict["quickLookImages"] = [f"{valid_image[0]}{valid_image[1]}"]
        writer.writerow(item_dict)

    return {"ok": True, "id": valid_json[1].id}


@router.put("/update/{product_id}")
def update(
    product_id: str, new_data: str = Form(...), new_image: UploadFile = File(None)
):
    valid_json = valid_or_not_json(new_data)

    file_id = None
    file_extension = None

    if new_image and new_image.filename:
        valid_image = valid_or_not_image(new_image)
        file_id = valid_image[0]
        file_extension = valid_image[1]

    products = []
    found = False

    with open("products.csv", "r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            if row["id"] == product_id:
                found = True
                item_dict = valid_json[1].model_dump()

                if file_id and file_extension:
                    item_dict["quickLookImages"] = [f"{file_id}{file_extension}"]

                    old_file_name = (
                        row["quickLookImages"].replace("['", "").replace("']", "")
                    )
                    old_file_path = f"uploads/{old_file_name}"
                    os.remove(old_file_path)
                else:
                    item_dict["quickLookImages"] = row["quickLookImages"]

                products.append(item_dict)
            else:
                products.append(row)

    write_csv(products)

    if not found:
        raise HTTPException(status_code=404, detail="Product not found!")

    return {"ok": True, "id": valid_json[1].id}


@router.delete("delete/{product_id}")
def delete(product_id: str):
    products = []
    found = False

    with open("products.csv", "r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            if row["id"] == product_id:
                found = True
                old_file_name = (
                    row["quickLookImages"].replace("['", "").replace("']", "")
                )
                old_file_path = f"uploads/{old_file_name}"
                os.remove(old_file_path)
                continue

            else:
                products.append(row)

    write_csv(products)

    if not found:
        raise HTTPException(status_code=404, detail="Product not found!")

    return {"ok": True, "id": product_id}


@router.get("/detail/{product_id}")
def detail(product_id: str):

    with open("products.csv", "r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            if row["id"] == product_id:
                return row

            else:
                raise HTTPException(status_code=404, detail="Product not found!")
