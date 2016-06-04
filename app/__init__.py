from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_wtf import CsrfProtect
from flask_session import Session

application = Flask(__name__, static_url_path='/static')

from .util import ListConverter

application.url_map.converters['list'] = ListConverter
application.config.from_object("config")
db = SQLAlchemy(application)
login_manager = LoginManager()
login_manager.init_app(application)
login_manager.login_view = "login"
bcrypt = Bcrypt(application)
CsrfProtect(application)
Session(application)

from app import views, models