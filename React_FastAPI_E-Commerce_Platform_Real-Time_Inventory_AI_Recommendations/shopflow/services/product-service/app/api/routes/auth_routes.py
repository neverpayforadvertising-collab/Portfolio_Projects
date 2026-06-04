
# version 2

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from db.deps import get_db
from services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Auth"])

service = AuthService()


@router.post("/login")
def login(payload: dict, response: Response, db: Session=Depends(get_db)):
    user = service.authenticate(db, payload["email"], payload["password"])

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token, refresh_token = service.create_tokens(user)

    # httpOnly refresh token (SECURE)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  # set True in production HTTPS
        samesite="lax"
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/refresh")
def refresh_token(request: dict, response: Response, db: Session=Depends(get_db)):
    refresh_token = request.get("refresh_token")

    new_access_token = service.refresh_access_token(db, refresh_token)

    if not new_access_token:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    return {"access_token": new_access_token}

# version 1

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session

# from app.db.deps import get_db
# from app.schemas.user import UserCreate, UserLogin
# from app.services.auth_service import AuthService

# router = APIRouter(prefix="/auth", tags=["Auth"])
# service = AuthService()

# @router.post("/register")
# def register(payload: UserCreate, db: Session = Depends(get_db)):
#     try:
#         return service.register(db, payload.email, payload.password)
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

# @router.post("/login")
# def login(payload: UserLogin, db: Session = Depends(get_db)):
#     try:
#         return service.login(db, payload.email, payload.password)
#     except Exception as e:
#         raise HTTPException(status_code=401, detail=str(e))
