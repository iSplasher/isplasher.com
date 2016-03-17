from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager
from flask.ext.bcrypt import Bcrypt
from flask.ext.wtf import CsrfProtect

application = Flask(__name__, static_url_path='/static')
application.config.from_object("config")
db = SQLAlchemy(application)
login_manager = LoginManager()
login_manager.init_app(application)
login_manager.login_view = "login"
bcrypt = Bcrypt(application)
CsrfProtect(application)

from app import views, models