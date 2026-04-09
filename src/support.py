import os
import base64
import aiofiles
from uuid import uuid4

from sqlmodel import SQLModel, create_engine

UPLOAD_DIR = "static/img/img_db"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def create_db_and_tables(engine):
    SQLModel.metadata.create_all(engine)

async def uploadImage(img_data: str):
    if "base64," in img_data:
        header, img_data = img_data.split("base64,")

    image_bytes = base64.b64decode(img_data)

    file_name = f"{uuid4()}.png"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    async with aiofiles.open(file_path, "wb") as f:
        await f.write(image_bytes)

    return file_name