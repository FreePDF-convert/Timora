from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.tasks import tasks_bp
from routes.habits import habits_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(tasks_bp)
app.register_blueprint(habits_bp)

if __name__ == '__main__':
    app.run(debug=True)