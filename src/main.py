from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from httpx import request
from pydantic import BaseModel
from sqlmodel import Session, create_engine, SQLModel

import time
import logging

import support as sup
from models import Favorite, User, Element

arquivo_sqlite = "database.db"
url_sqlite = f"sqlite:///{arquivo_sqlite}"

engine = create_engine(url_sqlite)

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("API")

templates = Jinja2Templates(directory="pages")

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    # 1. Código executado ANTES da rota
    start_time = time.perf_counter()
    
    # 2. A requisição viaja até a rota e volta como resposta
    response = await call_next(request)
    
    # 3. Código executado DEPOIS da rota
    process_time = time.perf_counter() - start_time
    
    # Adicionamos um header customizado na resposta para o cliente ver
    response.headers["X-Process-Time"] = str(process_time)
    
    logger.info(f"Rota: {request.url.path} | Tempo: {process_time:.4f}s")
    
    return response

@app.on_event("startup")
def on_startup() -> None:
    sup.create_db_and_tables(engine)

@app.get("/")
async def root(request: Request):
    page_name = "welcome.html"
    if(request.cookies.get("session_user")):
        page_name = "home.html"
    return templates.TemplateResponse(
        request = request, 
        name=page_name,
        context={"request": request}
    )

# -------- User handler -----------

@app.get("/signup")
async def signup(request: Request):
    return templates.TemplateResponse(
        request = request,
        name="login.html",
        context={"type": "signup"}
    )

@app.post("/signup")
async def signup_submit(user: User):
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

@app.get("/login")
async def login(request: Request):
    return templates.TemplateResponse(
        request = request,
        name="login.html",
        context={"type": "login"}
    )

@app.post("/login")
async def login_submit(user: User, response: Response):
    with Session(engine) as session:
        db_user = session.query(User).filter(User.username == user.username).first()
        if db_user and db_user.password == user.password:
            response.set_cookie(key="session_user", value=db_user.username)
            return {"message": "Logado com sucesso"}
        else:
            return {"error": "Invalid credentials"}

@app.get("/logout")
async def logout(response: Response):
    response.delete_cookie(key="session_user")
    return {"message": "Deslogado com sucesso"}

# -------- Image handler -----------

class ImageUpload(BaseModel):
    image: str
    title: str
    description: str

@app.post("/upload")
async def upload_image(data: ImageUpload, request: Request):
    if not request.cookies.get("session_user"):
        raise HTTPException(status_code=401, detail="Unauthorized")

    try:
        file_name = await sup.uploadImage(data.image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    with Session(engine) as session:
        user = session.query(User).filter(User.username == request.cookies.get("session_user")).first()
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        element = Element(img_name=file_name, user_id=user.id, title=data.title, description=data.description)
        session.add(element)
        session.commit()
        session.refresh(element)
        return element
        
@app.get("/RecentImages")
async def get_recent_images(quant: int, page: int, request: Request):
    username = request.cookies.get("session_user")
    with Session(engine) as session:
        images = session.query(Element).order_by(Element.date.desc()).limit(quant).offset(page * quant).all()

        favorited_ids = []
        if username:
            user = session.query(User).filter(User.username == username).first()
            if user:
                favorited_ids = [fav.element_id for fav in session.query(Favorite).filter(Favorite.user_id == user.id).all()]

    return templates.TemplateResponse(
        request=request, 
        name="partials/image_list.html", 
        context={"imagens": images, "favorited_ids": favorited_ids, "next_page": page + 1}
    )

@app.post("/favorite/{element_id}")
async def favorite_image(element_id: int, request: Request):
    username = request.cookies.get("session_user")
    if not username:
        raise HTTPException(status_code=401, detail="Unauthorized")

    with Session(engine) as session:
        user = session.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        existing_fav = session.query(Favorite).filter(Favorite.user_id == user.id, Favorite.element_id == element_id).first()
        if existing_fav:
            session.delete(existing_fav)
            session.commit()
            return False
        
        new_fav = Favorite(user_id=user.id, element_id=element_id)
        session.add(new_fav)
        session.commit()
        return True

@app.get("/e/{element_id}")
async def get_element(element_id: int, request: Request):
    with Session(engine) as session:
        element = session.query(Element).filter(Element.id == element_id).first()
        if not element:
            raise HTTPException(status_code=404, detail="Element not found")
        
        username = request.cookies.get("session_user")
        favorited = False
        if username:
            user = session.query(User).filter(User.username == username).first()
            if user:
                favorited = session.query(Favorite).filter(Favorite.user_id == user.id, Favorite.element_id == element_id).first() is not None
        
        #get user who posted the element too
        poster = session.query(User).filter(User.id == element.user_id).first()


    return templates.TemplateResponse(
        request=request, 
        name="element.html", 
        context={"element": element, "favorited": favorited, "poster": poster, "session": user}
    )

@app.get("/RecentFavorites")
async def get_recent_favorites(quant: int, page: int, request: Request):
    username = request.cookies.get("session_user")
    if not username:
        raise HTTPException(status_code=401, detail="Unauthorized")

    with Session(engine) as session:
        user = session.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        favorites = session.query(Favorite).filter(
            Favorite.user_id == user.id
        ).order_by(Favorite.id.desc()).limit(quant).offset(page * quant).all()
        
        fav_element_ids = [fav.element_id for fav in favorites]
        images = session.query(Element).filter(Element.id.in_(fav_element_ids)).all()
        
        images.sort(key=lambda x: fav_element_ids.index(x.id))

    return templates.TemplateResponse(
        request=request, 
        name="partials/favorite_list.html", 
        context={
            "imagens": images, 
            "favorited_ids": fav_element_ids, 
            "next_page": page + 1
        }
    )

@app.get('/favorites')
async def favorites_page(request: Request):
    if not request.cookies.get("session_user"):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    return templates.TemplateResponse(
        request=request, 
        name="favorites.html", 
        context={"request": request}
    )

@app.delete("/delete/{element_id}")
async def delete_element(element_id: int, request: Request):
    username = request.cookies.get("session_user")
    if not username:
        raise HTTPException(status_code=401, detail="Unauthorized")

    with Session(engine) as session:
        user = session.query(User).filter(User.username == username).first()
        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")
        
        element = session.query(Element).filter(Element.id == element_id).first()
        if not element:
            raise HTTPException(status_code=404, detail="Element not found")
        
        if element.user_id != user.id:
            raise HTTPException(status_code=403, detail="Forbidden")
        
        session.delete(element)
        session.commit()
        return {"message": "Element deleted successfully"}