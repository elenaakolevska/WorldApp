from flask import Flask, request, jsonify, session
from flask_pymongo import PyMongo
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

mongo_uri = os.getenv("MONGO_URI") or (
    f"mongodb://{os.getenv('MONGO_USER', 'root')}:{os.getenv('MONGO_PASS', 'example')}"
    f"@{os.getenv('MONGO_HOST', 'mongo')}:27017/{os.getenv('MONGO_DB', 'worldapp')}?authSource=admin"
)
app.config["MONGO_URI"] = mongo_uri
app.secret_key = os.getenv("SECRET_KEY", "supersecret")
mongo = PyMongo(app)
from flask_cors import CORS

CORS(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:3000",
        "http://localhost",
        "http://worldapp.local",
        "https://worldapp-frontend-latest.onrender.com",
        "https://worldapp-backend-latest.onrender.com",
        "https://world-app-teal.vercel.app"
    ]
)


from flask import Blueprint

api = Blueprint("api", __name__, url_prefix="/api")

def logged_in():
    return "username" in session

def current_user():
    return session.get("username")

@api.route("/register", methods=["POST"])
def api_register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Username and password required!"}), 400
    if mongo.db.users.find_one({"username": username}):
        return jsonify({"error": "Username already exists!"}), 400
    hashed_pw = generate_password_hash(password)
    mongo.db.users.insert_one({"username": username, "password": hashed_pw})
    return jsonify({"message": "User registered successfully!"})

@api.route("/login", methods=["POST"])
def api_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user = mongo.db.users.find_one({"username": username})
    if user and check_password_hash(user["password"], password):
        session["username"] = username
        return jsonify({"message": "Logged in!", "username": username})
    return jsonify({"error": "Invalid credentials!"}), 401

@api.route("/logout", methods=["POST"])
def api_logout():
    session.pop("username", None)
    return jsonify({"message": "Logged out!"})

@api.route("/me", methods=["GET"])
def api_me():
    if not logged_in():
        return jsonify({"username": None})
    return jsonify({"username": current_user()})

@api.route("/countries", methods=["GET"])
def api_get_countries():
    countries = list(mongo.db.countries.find())
    for c in countries:
        c["_id"] = str(c["_id"])
    return jsonify(countries)

@api.route("/countries", methods=["POST"])
def api_add_country():
    if not logged_in():
        return jsonify({"error": "Unauthorized"}), 401
    data = request.json
    required_fields = ["name", "capital", "population", "area", "language"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400
    try:
        data["population"] = int(data["population"])
        data["area"] = float(data["area"])
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid population or area type"}), 400
    res = mongo.db.countries.insert_one(data)
    data["_id"] = str(res.inserted_id)
    return jsonify(data), 201

@api.route("/countries/<country_id>", methods=["GET"])
def api_get_country(country_id):
    try:
        country = mongo.db.countries.find_one({"_id": ObjectId(country_id)})
    except Exception:
        return jsonify({"error": "Invalid country ID"}), 400
    if not country:
        return jsonify({"error": "Country not found"}), 404
    country["_id"] = str(country["_id"])
    return jsonify(country)

@api.route("/countries/<country_id>", methods=["PUT"])
def api_update_country(country_id):
    if not logged_in():
        return jsonify({"error": "Unauthorized"}), 401
    data = request.json
    required_fields = ["name", "capital", "population", "area", "language"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing fields"}), 400
    try:
        data["population"] = int(data["population"])
        data["area"] = float(data["area"])
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid population or area type"}), 400
    try:
        res = mongo.db.countries.update_one({"_id": ObjectId(country_id)}, {"$set": data})
    except Exception:
        return jsonify({"error": "Invalid country ID"}), 400
    if res.matched_count == 0:
        return jsonify({"error": "Country not found"}), 404
    return jsonify({"message": "Country updated!"})

@api.route("/countries/<country_id>", methods=["DELETE"])
def api_delete_country(country_id):
    if not logged_in():
        return jsonify({"error": "Unauthorized"}), 401
    try:
        res = mongo.db.countries.delete_one({"_id": ObjectId(country_id)})
    except Exception:
        return jsonify({"error": "Invalid country ID"}), 400
    if res.deleted_count == 0:
        return jsonify({"error": "Country not found"}), 404
    return jsonify({"message": "Country deleted!"})

app.register_blueprint(api)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)