from uuid import uuid4
from typing import List
from pydantic import BaseModel, Field


class Item(BaseModel):
    id: str = str(uuid4())
    name: str = Field(..., max_length=30, min_length=3)
    price: float = Field(..., ge=0)
    badge: str = Field(..., max_length=15, min_length=3)
    materials: List[str] = Field(...)
    swatches: List[str] = Field(...)
    quickLookImages: List[str] = Field(...)
    dimensions: str = Field(...)
