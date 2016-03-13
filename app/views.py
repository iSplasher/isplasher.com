from flask import render_template, flash, session, request, url_for, redirect, abort, g
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import application, db, login_manager, bcrypt
from app.models import User

@application.before_request
def before_request():
    g.user = current_user

@login_manager.user_loader
def user_loader(user_id):
    return User.query.get(user_id)

@application.route("/")
@application.route("/index")
def index():
    return render_template("index.html",
                            descr="My Projects")

@application.route("/github")
def github():
    return render_template("github.html",
                           title="Github",
                           descr="My Github Related Stuff")

@application.route("/gymnasium")
def gymnasium():
    return render_template("index.html",
                           title="Gymnasium",
                           descr="Aarhus Gymnasium")

@application.route("/random")
def random():
    return render_template("index.html",
                           title="Exclusive Random Stuff",
                           descr="Random stuff!!")

@application.route("/contact")
def contact():
    return render_template("index.html",
                           title="Contact",
                           descr="Contact Me")
                           
@application.route("/login", methods=["GET", "POST"])
def login():
    if not g.user.is_authenticated:
        if request.method == "GET":
            return render_template("login.html",
                                   title="Login",
                                   descr="Login")
        name = request.form["name"]
        password = request.form["password"]
        print(name, password)
        remember_me = False
        if 'remember_me' in request.form:
            remember_me = True
        valid = User.query.filter(User.name.ilike("%{}%".format(name))).first()
        if valid:
            if bcrypt.check_password_hash(valid.password, password):
                    login_user(valid, remember=remember_me)
                    flash("Welcome, {}-sama".format(valid.name), "global")
                    return redirect(request.args.get('next') or url_for("index"))
        flash("I-it's not l-l-like you can login!! Baka!", "error")
        return redirect(url_for("login"))
    return redirect(url_for("index"))
    
@application.route("/logout", methods=["GET"])
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))