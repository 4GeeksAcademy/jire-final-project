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

from flask import request, jsonify
from datetime import datetime, timedelta
import secrets
import cloudinary.uploader as uploader
import os
import re
import json


api = Blueprint('api', __name__)

user_path = os.path.join(os.path.dirname(__file__), "users.json")
personalinfo_path = os.path.join(os.path.dirname(__file__), "personal_info.json")
professionalinfo_path = os.path.join(os.path.dirname(__file__), "professional_info.json")
solicitudes_path = os.path.join(os.path.dirname(__file__), "solicitudes.json")
ofertas_path = os.path.join(os.path.dirname(__file__), "ofertas.json")

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


#add 10 users to the db
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

#Note: first, populate user to the db
#add personal info for the 10 users 
@api.route("/personal-population", methods=["GET"])
def personal_population():
    with open(personalinfo_path, "r") as file:
        data = json.load(file)
        file.close

        for pers in data:
            pers = Personal_info(
                nickname=pers["nickname"],
                avatar=pers["avatar"],
                phone=pers["phone"],
                address=pers["address"],
                country=pers["country"],
                state=pers["state"],
                city=pers["city"],
                description=pers["description"],
                user_id=pers["user_id"]
            )
            db.session.add(pers)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("rodo fallo"), 500
        
    return jsonify("todo funciono"), 200

#Note: first, populate user to the db
#add professional info for 10 users:
@api.route("/professional-population", methods=["GET"])
def professional_population():
    with open(professionalinfo_path, "r") as file:
        data = json.load(file)
        file.close
        
        for prof in data:
            prof = Professional_info(
                ocupation=prof["ocupation"],
                experience=prof["experience"],
                skills=prof["skills"],
                skills_level=prof["skills_level"],
                certificate=prof["certificate"],
                institution=prof["institution"],
                languages=prof["languages"],
                language_level=prof["language_level"],
                user_id=prof["user_id"]
            )
            db.session.add(prof)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("rodo fallo"), 500
        
    return jsonify("todo funciono"), 200

#add 10 records to the table Solicitudes
@api.route("/solicitudes-population", methods=["GET"])
def solicitudes_population():
    with open(solicitudes_path, "r") as file:
        data = json.load(file)
        file.close

        for sols in data:
            sols = Solicitudes(
                service=sols["service"],
                category=sols["category"],
                title=sols["title"],
                description=sols["description"],
                address=sols["address"],
                country=sols["country"],
                state=sols["state"],
                city=sols["city"],
                images=sols["images"],
                user_id = sols["user_id"]
            )
            db.session.add(sols)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("todo fallo"), 500
        
    return jsonify("todo funciono"), 200

@api.route("/ofertas-population", methods=["GET"])
def ofertas_population():
    with open(ofertas_path, "r") as file:
        data = json.load(file)
        file.close

        for offer in data:
            offers = Ofertas(
                service=offer["service"],
                category=offer["category"],
                title=offer["title"],
                description=offer["description"],
                address=offer["address"],
                country=offer["country"],
                state=offer["state"],
                city=offer["city"],
                images=offer["images"]
            )
            db.session.add(offers)
            try:
                db.session.commit()
            except Exception as error:
                print("error:", error.args)
                return jsonify("todo fallo"), 500
        
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
            print(error)
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
            'rol': user.rol.value,
            'id': user.id
        })
        return jsonify({'token': token}), 200

    except Exception as e:
        return jsonify({'message': str(e)}), 500
    

@api.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.json
        email = data.get('email')
        new_password = data.get('newPassword')

        # Verificar si el correo electrónico existe en la base de datos
        user = User.query.filter_by(email=email).one_or_none()

        if user:
            # Actualizar la contraseña del usuario
            user.password = set_password(new_password, user.salt)
            db.session.commit()

            return jsonify({'message': 'Contraseña restablecida con éxito'}), 200
        else:
            return jsonify({'message': 'Usuario no encontrado'}), 404

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
    


@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity().get("id")
    personal_profile = Personal_info.query.filter_by(user_id = user_id).one_or_none()
    user_info = User.query.filter_by(id=user_id).one_or_none()
    professional_profile = Professional_info.query.filter_by(user_id=user_id).one_or_none()

    if personal_profile is None:
        pers_prof = "No personal info"
    else:
        pers_prof = personal_profile.serialize()
    
    if professional_profile is None:
        prof = "No professional info"
    else:
        prof = professional_profile.serialize()
    return jsonify(user_info.serialize(), pers_prof, prof )


@api.route('/getprofile/<int:id>/<int:sol_id>', methods=['GET'])
def get_full_profile(id, sol_id):
    personal_profile = Personal_info.query.filter_by(user_id = id).one_or_none()
    user_info = User.query.filter_by(id=id).one_or_none()
    solicitud = Solicitudes.query.get(sol_id)

    if personal_profile is None:
        pers_prof = "No personal info"
    else:
        pers_prof = personal_profile.serialize()
    
    return jsonify(user_info.serialize(), pers_prof, solicitud.serialize())






#add solicitud
@api.route('/addsolicitud', methods=['POST'])
@jwt_required()
def post_solicitud():
    body_form = request.form
    body_file = request.files
    user_id = get_jwt_identity().get("id")
    personal_profile = Personal_info.query.filter_by(user_id=user_id).one_or_none()


    title = body_form.get('title')
    description = body_form.get('description')
    address = personal_profile.address
    country = personal_profile.country
    state = personal_profile.state
    city = personal_profile.city
    category = body_form.get('category')
    service = body_form.get('service')
    images = body_file.get('images')

    result_image = uploader.upload(body_file.get("images"))
    images = result_image.get("secure_url")
    public_id = result_image.get("public_id")

    solicitud = Solicitudes(title=title, description=description, address=address,
                            country=country, state=state, category=category,
                            city=city, service=service,
                            images=images, user_id=user_id, public_image_id=public_id)
    db.session.add(solicitud)

    try:
        db.session.commit()
        return jsonify({"message":"solicitud agregada"})
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": f"{error}"})

   

