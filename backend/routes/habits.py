from flask import Blueprint, request, jsonify
from models.db import tasks_collection
from .auth import verify_token

habits_bp = Blueprint('habits', __name__)

@habits_bp.route('/api/habits', methods=['GET'])
def get_habits():
    token = request.headers.get('Authorization')
    user = verify_token(token)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    habits = list(tasks_collection.find({"user": user, "type": "habit"}, {"_id": 0}))
    return jsonify(habits)

@habits_bp.route('/api/habits', methods=['POST'])
def add_habit():
    token = request.headers.get('Authorization')
    user = verify_token(token)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    habit = request.json
    habit['user'] = user
    habit['type'] = "habit"
    tasks_collection.insert_one(habit)
    return jsonify({"status": "created"})