from db.session import engine
from models.product import Base

def init_db():
    Base.metadata.create_all(bind=engine)