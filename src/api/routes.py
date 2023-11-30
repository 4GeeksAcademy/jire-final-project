"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Ofertas, Solicitudes
from api.utils import generate_sitemap, APIException
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import os
import re

api = Blueprint('api', __name__)

# werkzeug security
def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

# Checking if email is valid with RegEx
def check(email):
    regex = r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$" 
    if(re.fullmatch(regex, email)):
        return email
    else:
        return None

# Register a new user
@api.route('/register', methods=['POST'])
def add_user():
    body = request.json

    name = body.get('name')
    lastname = body.get('lastname')
    email = check(body.get('email'))
    password = body.get('password')
    rol = body.get('rol')

    if name is None or len(name.strip()) == 0:
        return jsonify({'message': 'Enter a valid name'}), 400
    
    if lastname is None or len(lastname.strip()) == 0:
        return jsonify({'message': 'Enter a valid lastname'}), 400
    
    if email is None or len(email.strip()) == 0:
        return jsonify({'message': 'Enter a valid email'}), 400
    
    if password is None or len(password.strip()) == 0:
        return jsonify({'message': 'Enter a valid password'}), 400

    user = User.query.filter_by(email=email).one_or_none()

    if user is not None:
        return jsonify({'message': 'account already exists'}), 400
    else:
        salt = b64encode(os.urandom(32)).decode("utf-8")
        password = set_password(password, salt)
        user = User(name=name, lastname=lastname, email=email, password=password, salt=salt, rol=rol)
        db.session.add(user)
        try:
            db.session.commit()
            return jsonify({'message': 'account has been created successfully'}), 200
        except Exception as error:
            db.session.rollback()
            return jsonify({'message': f'error: {error.args}'}), 500
    
# Create a token for Login
def generate_token():
    body = request.json

    email = check(body.get('email'))
    password = body.get('password')

    if email is None or len(email.strip()) == 0:
        return jsonify({'message': 'Enter a valid email'}), 400
    
    if password is None or len(password.strip()) == 0:
        return jsonify({'message': 'Enter a valid password'}), 400

    user = User.query.filter_by(email=email).one_or_none()
    
    if user is None:
        return jsonify({'message':'account not found'}), 400
    else:
        if check_password(user.password, password, user.salt):
            token = create_access_token(identity={
                'email': user.email,
                'rol': user.rol.value
            })
            return jsonify({'token': token}), 200
        else:
            return jsonify({'message': 'Token is not valid'}), 401
        
@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        user = User.query.filter_by(email=email).one_or_none()

        if user is None or not check_password_hash(user.password, f"{password}{user.salt}"):
            return jsonify({'message': 'Invalid email or password'}), 401

        token = create_access_token(identity={
            'email': user.email,
            'rol': user.rol.value
        })
        return jsonify({'token': token}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Get all users using an admin Token
@api.route('/user', methods=['GET'])
@jwt_required() # include token in Thunder Client request
def get_users():
    data_token = get_jwt_identity()
    print(data_token)
    if data_token.get('rol') == ['admin']:
        users = User.query.all()
        return jsonify(list(map(lambda user: user.serialize(), users)))
    else:
        return jsonify({'message': 'Access denied'}), 403

# Get a user by user_id using an admin Token
@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required() # include token in Thunder Client request
def get_user(user_id=None):
    data_token = get_jwt_identity()
    print(data_token)
    if data_token.get('rol') == ['admin']:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'message': 'User not found'}), 404
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'message': 'Access denied'}), 403


#Get all offers
@api.route('/ofertas', methods=['GET'])
def get_offers():
    ofertas = Ofertas.query.all() 
    return jsonify(list(map(lambda of: of.serialize(), ofertas)))

#Get all requests
@api.route('/solicitudes', methods=['GET'])
def get_solicitudes():
    solicitudes = Solicitudes.query.all()
    return jsonify(list(map(lambda sol: sol.serialize(), solicitudes)))

#Get one offer by id
@api.route('/ofertas/<int:id>', methods=['GET'])
def get_offer(id):
    offer = Ofertas.query.get(id)
    if offer is None:
        return jsonify({"message":f"the offer {id} does not exists"}), 404
    else:
        return(offer.serialize())

#Get one request by id
@api.route('/solicitudes/<int:id>', methods=['GET'])
def get_request(id):
    request = Solicitudes.query.get(id)
    if request is None:
        return jsonify({"message":f"the request {id} does not exists"}), 404
    else:
        return(request.serialize())