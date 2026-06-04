import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://shopflow:shopflow@localhost:5432/shopflow"
)