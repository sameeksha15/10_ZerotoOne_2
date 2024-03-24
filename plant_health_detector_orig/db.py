from pymongo import MongoClient

from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv()
env_path = Path('.')/'.env'
load_dotenv(dotenv_path=env_path)
DB_URI = os.getenv("DB_URI")

CONNECTION_STRING = DB_URI
client = MongoClient(CONNECTION_STRING)
db = client['s3-upload-test']
files_collection = db["files"]