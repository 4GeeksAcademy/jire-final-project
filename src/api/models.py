from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class UserRol(Enum):
    admin = 'admin',
    general = 'general'

class skills_level(Enum):
    basic = "basic",
    intermediate = 'intermediate',
    expert = 'expert'

class language_level(Enum):
    basic = "basic",
    intermediate = 'intermediate',
    expert = 'expert',
    native = 'native'

class service_type(Enum):
    remote = "remote",
    in_place = "in place"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=False, nullable=False)
    lastname = db.Column(db.String(30), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    salt = db.Column(db.String(180), unique=False, nullable=False)
    rol = db.Column(db.Enum(UserRol), nullable=False, default='general')
    personal_info = db.relationship('Personal_info', backref='User')
    professional_info = db.relationship('Professional_info', backref='User')
    solicitudes = db.relationship('Solicitudes', backref='User')


    def __repr__(self):
        return f'{self.id}'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'lastname': self.lastname,
            'email': self.email,
            'rol': self.rol.value
        }


class Ofertas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=False)
    address = db.Column(db.String(80), unique=False, nullable=False)
    country= db.Column(db.String(30), nullable=False, unique=False)
    state = db.Column(db.String(40), nullable=False, unique=False)
    city = db.Column(db.String(40), nullable=False, unique=False)
    category = db.Column(db.String(70), unique=False, nullable=False)
    service = db.Column(db.Enum(service_type), nullable=False, unique=False, default="in place")
    images = db.Column(db.String(250), nullable=True, unique=False)

    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "description" : self.description,
            "category" : self.category,
            "address" : self.address,
            "country" : self.country,
            "state": self.state,
            "city": self.city,
            "service": self.service.value,
            "images": self.images
        }


class Solicitudes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=False)
    address= db.Column(db.String(50), nullable=False, unique=False)
    country= db.Column(db.String(30), nullable=False, unique=False)
    state = db.Column(db.String(40), nullable=False, unique=False)
    city = db.Column(db.String(40), nullable=False, unique=False)
    category = db.Column(db.String(70), unique=False, nullable=False)
    service = db.Column(db.Enum(service_type), nullable=False, unique=False, default="in_place")
    images = db.Column(db.String(250), nullable=True, unique=False)
    public_image_id = db.Column(db.String(100), unique=False,)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "description" : self.description,
            "category" : self.category,
            "address" : self.address,
            "country" : self.country,
            "state": self.state,
            "city": self.city,
            "service": self.service.value,
            "images": self.images,
            "user_id": self.user_id
        }

class Personal_info(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(20), nullable=False, unique=True)
    avatar = db.Column(db.String(250), nullable=False, unique=False)
    phone = db.Column(db.String(20), nullable=False, unique=True)
    address= db.Column(db.String(50), nullable=False, unique=False)
    country= db.Column(db.String(30), nullable=False, unique=False)
    state = db.Column(db.String(40), nullable=False, unique=False)
    city = db.Column(db.String(40), nullable=False, unique=False)
    description = db.Column(db.Text, nullable=False, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return{
            "nickname": self.nickname,
            "avatar": self.avatar,
            "phone": self.phone,
            "address": self.address,
            "country": self.country,
            "state": self.state,
            "city": self.city,
            "description": self.description,
        }



class Professional_info(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ocupation = db.Column(db.String(80), nullable=False, unique=False)
    experience = db.Column(db.Integer, nullable=False, unique=False, default=1)
    skills = db.Column(db.String(100), nullable=False, unique=False)
    skills_level = db.Column(db.Enum(skills_level), nullable=False, unique=False, default="basic")
    certificate = db.Column(db.String(150), nullable=True, unique=False)
    institution = db.Column(db.String(100), nullable=True, unique=False)
    languages = db.Column(db.String(20), nullable=False, unique=False)
    language_level = db.Column(db.Enum(language_level), nullable=False, unique=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    def serialize(self):
        return{
            "ocupation": self.ocupation,
            "experience": self.experience,
            "skills": self.skills,
            "skills_level": self.skills_level.value,
            "certificate": self.certificate,
            "institution": self.institution,
            "languages": self.languages,
            "languages_level": self.language_level.value,
        }



class Services(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    solicitud_id = db.Column(db.Integer, db.ForeignKey('solicitudes.id'))
    oferta_id = db.Column(db.Integer, db.ForeignKey('ofertas.id'))
    date = db.Column(db.String(90), nullable=False, unique=False)




