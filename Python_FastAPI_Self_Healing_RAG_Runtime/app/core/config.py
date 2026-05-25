from pydantic import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "self-healing-rag-runtime"
    ENV: str = "development"
    DATABASE_URL: str = "postgresql://rag_user:rag_pass@localhost:5432/rag_db"
    OPENAI_API_KEY: str | None = None

    class Config:
        env_file = ".env"


settings = Settings()
