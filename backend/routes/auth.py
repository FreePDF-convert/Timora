from flask import Blueprint, request, jsonify
import jwt, datetime
from models.db import users_collection

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/register', methods=['POST'])
def register():
    data = request.json
    users_collection.insert_one({"username": data['username'], "password": data['password']})
    return jsonify({"status": "registered"})

@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = users_collection.find_one({"username": data['username'], "password": data['password']})
    if user:
        token = jwt.encode({"user": user['username'], "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)}, "SECRET", algorithm="HS256")
        return jsonify({"token": token})
    return jsonify({"error": "Invalid credentials"}), 401