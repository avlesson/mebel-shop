import csv
from pydantic import BaseModel, EmailStr
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/auth", tags=["auth"])


class Register(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirmPassword: str


class Login(BaseModel):
    email: EmailStr
    password: str


@router.post("/register")
def register(data: Register):
    name = data.name
    email = data.email
    password = data.password
    confirmPassword = data.confirmPassword

    if not password == confirmPassword:
        return {
            "msg": "Error",
            "redirect": "/register",
            "error": "Password do not match",
        }

    with open("users.csv", "a", newline="") as f:
        writer = csv.DictWriter(f, ["name", "email", "password"])
        if f.tell() == 0:
            writer.writeheader()
        writer.writerow({"name": name, "email": email, "password": password})

    return {"msg": "Success", "redirect": "/login"}


@router.post("/login")
def login(data: Login):
    email = data.email
    password = data.password

    with open("users.csv", "r") as f:
        users = csv.DictReader(f)
        for user in users:
            if user["email"] == email:
                if user["password"] == password:
                    return {"msg": "Success", "redirect": "/"}

    return JSONResponse(
        {
            "msg": "Error",
            "redirect": "/login",
            "errors": "Email or password is incorrect!",
        },
        status_code=status.HTTP_301_MOVED_PERMANENTLY,
    )
