"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Ofertas, Solicitudes
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/ofertas', methods=['GET'])
def get_oferts():
    ofertas = Ofertas.query.all() 
    return jsonify(list(map(lambda of: of.serialize(), ofertas)))

@api.route('/solicitudes', methods=['GET'])
def get_solicitudes():
    solicitudes = Solicitudes.query.all()
    return jsonify(list(map(lambda sol: sol.serialize(), solicitudes)))
