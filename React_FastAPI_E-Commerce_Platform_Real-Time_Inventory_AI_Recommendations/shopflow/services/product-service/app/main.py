from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.init_db import init_db
from api.routes.auth_routes import router as auth_router
from api.routes.product_routes import router as product_router
from api.routes.recommendation_routes import router as ai_router
from api.routes.checkout_routes import router as checkout_router
from api.routes.cart_routes import router as cart_router


app = FastAPI(
    title="ShopFlow API",
    version="1.0.0",
    description="E-commerce platform with authentication, products, and AI recommendations"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_db()


# Register routers
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(checkout_router)
app.include_router(cart_router)
app.include_router(ai_router)


@app.get("/health")
def health():
    return {"status": "ok", "service": "shopflow-product-service"}
