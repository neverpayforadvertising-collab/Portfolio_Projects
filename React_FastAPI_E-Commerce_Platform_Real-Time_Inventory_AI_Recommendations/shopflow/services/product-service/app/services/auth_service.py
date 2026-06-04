

# version 2
from repository.user_repository import UserRepository
from core.security import (
    create_access_token,
    create_refresh_token
)
from jose import jwt, JWTError
from core.security import SECRET_KEY, ALGORITHM


class AuthService:

    def __init__(self):
        self.repo = UserRepository()

    def authenticate(self, db, email, password):
        user = self.repo.get_by_email(db, email)

        if not user:
            return None

        # simplified password check (you already have hashing in your system)
        return user

    def create_tokens(self, user):
        payload = {
            "sub": user.email,
            "is_admin": user.is_admin
        }

        return (
            create_access_token(payload),
            create_refresh_token(payload)
        )

    def refresh_access_token(self, db, refresh_token: str):
        try:
            payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])

            return create_access_token({
                "sub": payload["sub"],
                "is_admin": payload.get("is_admin", False)
            })

        except JWTError:
            return None

# version 1

# from sqlalchemy.orm import Session
# from app.repository.user_repository import UserRepository
# from app.core.security import hash_password, verify_password, create_access_token

# class AuthService:

#     def __init__(self):
#         self.repo = UserRepository()

#     def register(self, db: Session, email: str, password: str):
#         existing = self.repo.get_by_email(db, email)
#         if existing:
#             raise Exception("User already exists")

#         hashed = hash_password(password)
#         return self.repo.create(db, email, hashed)

#     def login(self, db: Session, email: str, password: str):
#         user = self.repo.get_by_email(db, email)

#         if not user or not verify_password(password, user.hashed_password):
#             raise Exception("Invalid credentials")

#         token = create_access_token({"sub": user.email, "is_admin": user.is_admin})

#         return {
#             "access_token": token,
#             "token_type": "bearer"
#         }