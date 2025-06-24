from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client["estuai"]
users_collection = db["users"]
tasks_collection = db["tasks"]