from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.route import router as auth
from products.route import router as product

app = FastAPI()
app.include_router(auth)
app.include_router(product)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
