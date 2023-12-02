"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Ofertas, Solicitudes, Personal_info, Professional_info
from api.utils import generate_sitemap, APIException
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import os
import re
import json

api = Blueprint('api', __name__)

user_path = os.path.join(os.path.dirname(__file__), "users.json")

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

@api.route("/user-population", methods=["GET"])
def user_population():
    with open(user_path, "r") as file:
        data = json.load(file)
        file.close

        for user in data:
            salt = b64encode(os.urandom(32)).decode("utf-8")
            password = set_password(user["password"], salt)
            user = User(
                name=user["name"],
                lastname=user["lastname"],
                email=user["email"],
                password=password,
                salt=salt,
            )
            db.session.add(user)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("rodo fallo"), 500
        
    return jsonify("todo funciono"), 200


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


@api.route('/personal_info/<int:userid>', methods=['POST'])
def personal_info(userid):
    user = User.query.get(userid)
    if user is None:
        return jsonify({"message":"this user does not exists"}),400

    body = request.json
    nickname = body.get("nickname")
    avatar = body.get("avatar")
    phone = body.get("phone")
    address = body.get("address")
    country = body.get("country")
    state = body.get("state")
    city = body.get("city")
    description = body.get("description")
    user_id = userid

    personal = Personal_info(
    nickname=nickname, 
    avatar=avatar, phone=phone,
    address=address, country=country,
    state=state, city=city,
    description=description, 
    user_id=user_id)

    db.session.add(personal)

    try:
        db.session.commit()
        return jsonify({"message": "info added"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":f"{error.args}"})



@api.route('/professional_info/<int:userid>', methods=['POST'])
def professional_info(userid):
    user = User.query.get(userid)
    if user is None:
        return jsonify({"message":"this user does not exists"}),400
    
    body = request.json
    ocupation = body.get("ocupation")
    experience = body.get("experience")
    skills = body.get("skills")
    skills_level = body.get("skills_level")
    certificate = body.get("certificate")
    institution = body.get("institution")
    languages = body.get("languages")
    language_level = body.get("language_level")

    professional_info = Professional_info(
        ocupation=ocupation,
        experience=experience,
        skills=skills,
        skills_level=skills_level,
        certificate=certificate,
        institution=institution,
        languages=languages,
        language_level= language_level,
        user_id = userid
    )

    db.session.add(professional_info)
    try:
        db.session.commit()
        return jsonify({"message":"info added"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":f"{error.args}"})












    
#Post an offer
# @api.route('/post_offer', methods=['POST'])
# def post_offer():
#     body = request.json
#     title = body.get("title")
#     description = body.get("description")
#     location = body.get("location")

#     if title is None or description is None or location is None:
#         return jsonify({"message":"bad request"}), 400
    

#     offer = Ofertas(title=title, description=description, location=location)
#     db.session.add(offer)

#     try:
#         db.session.commit()
#         return jsonify({"message":"offer created"}), 201
#     except Exception as error:
#         db.session.rollback()
#         return jsonify({"error":f"{error}"}), 500

# #post a request
# @api.route('/post_request', methods=['POST'])
# def post_request():
#     body = request.json
#     title = body.get("title")
#     description = body.get("description")
#     location = body.get("location")

#     if title is None or description is None or location is None:
#         return jsonify({"message":"bad request"}), 400

#     solicitud = Solicitudes(title=title, description=description, location=location)
#     db.session.add(solicitud)

#     try:
#         db.session.commit()
#         return jsonify({"message":"request created"}), 201
#     except Exception as error:
#         db.session.rollback()
#         return jsonify({"error":f"{error}"}), 500
