from flask import Blueprint, request, jsonify
from models.db import tasks_collection
from .auth import verify_token

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/api/tasks', methods=['GET'])
def get_tasks():
    token = request.headers.get('Authorization')
    user = verify_token(token)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    tasks = list(tasks_collection.find({"user": user, "type": "task"}, {"_id": 0}))
    return jsonify(tasks)

@tasks_bp.route('/api/tasks', methods=['POST'])
def add_task():
    token = request.headers.get('Authorization')
    user = verify_token(token)
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    task = request.json
    task['user'] = user
    task['type'] = "task"
    tasks_collection.insert_one(task)
    return jsonify({"status": "created"})