"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def register():
    body = request.json
    email = body.get('email')
    password = body.get('password')
    name = body.get('name')
    lastname = body.get('lastname')
    if email is None or password is None or name is None or lastname is None:
        return jsonify({"error" :"porfavor ingrese valores validos"}), 400
    userexists = User.query.filter_by(email=email).one_or_none()
    if userexists:
        return jsonify({"error":"user already exists"}), 400
    user = User(email=email, password=password, name=name, lastname=lastname)
    db.session.add(user)
    try:
        db.session.commit()
        return jsonify({"message": "user created succesfully"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"}), 500