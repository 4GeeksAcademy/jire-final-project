from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

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
