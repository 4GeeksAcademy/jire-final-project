from flask_sqlalchemy import SQLAlchemy
from enum import Enum

db = SQLAlchemy()

class UserRol(Enum):
    admin = 'admin',
    general = 'general'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=False, nullable=False)
    lastname = db.Column(db.String(30), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    salt = db.Column(db.String(180), unique=False, nullable=False)
    rol = db.Column(db.Enum(UserRol), nullable=False, default='general')


    def __repr__(self):
        return f'<User {self.email}>'

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
    location = db.Column(db.String(80), unique=False, nullable=False)

    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "description" : self.description,
            "location": self.location
        }


class Solicitudes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), unique=False, nullable=False)
    description = db.Column(db.Text, unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)

    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "description" : self.description,
            "location": self.location
        }
