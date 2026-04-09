from typing import List 
from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str
    password: str

    elements: List["Element"] = Relationship(back_populates="user")

class Element(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    img_name: str
    title: str
    description: str

    user_id: int = Field(foreign_key="user.id")
    date: str = Field(default_factory=lambda: __import__("datetime").datetime.now().isoformat())
    user: User = Relationship(back_populates="elements")

class Favorite(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    element_id: int = Field(foreign_key="element.id")

    user: User = Relationship()
    element: Element = Relationship()