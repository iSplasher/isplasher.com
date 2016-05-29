from flask import render_template, flash, session, request, url_for, redirect, abort, g
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import application, db, login_manager, bcrypt, models, forms
from app.models import User

from datetime import datetime
from os import listdir, path
from random import randint

debug = True

def get_r_image():
    hour = datetime.now().hour
    day = "day"
    if 15 < hour < 20:
        day = "night"
    elif hour > 20 or hour < 6:
        day = "midnight"
    
    images = listdir("app/static/images/{}".format(day))
    return  day + "/" + images[randint(0, len(images)-1)]

def get_projects(p_type):
    projects = []
    if isinstance(p_type, str):
        project_type = models.ProjectType.query.filter(models.ProjectType.name.ilike("%{}%".format(p_type))).first()
    elif isinstance(p_type, int):
        project_type = models.ProjectType.query.get(p_type)
    if project_type:
        projects = project_type.projects.all()
    return projects

@application.before_request
def before_request():
    g.user = User()
    g.bg = session.get("bg")
       
@login_manager.user_loader
def user_loader(user_id):
    return User.query.get(user_id)

@application.route("/")
@application.route("/index")
def index():
    return render_template("index.html",
                            mdedit_form=forms.MDEdit(),
                            descr="Me",
                            project_types=models.ProjectType.query.all())

@application.route("/posts")
def posts():
    return render_template("posts.html",
                           title="Posts",
                           descr="My Posts",
                           post_form=forms.NewPost())
                           
@application.route("/projects")
def projects():
    return render_template("projects.html",
                           title="Projects",
                           descr="My Projects",
                           project_form=forms.NewProject())          

@application.route("/education")
def education():
    return render_template("education.html",
                           title="Education",
                           descr="Education Related Stuff",
                           projects=get_projects("Gymnasium"))

@application.route("/random")
def random():
    return render_template("random.html",
                           title="Random Stuff",
                           descr="Exclusive Random Stuff!!")

@application.route("/contact", methods=['GET', 'POST'])
def contact():
    form = forms.ContactForm()
    if request.method == "POST":
        if form.validate_on_submit():
            flash("Message sent!", "global")
            return redirect(url_for("index"))
        else:
            flash("Please fill out all fields", "error")
    return render_template("contact.html",
                           title="Contact",
                           descr="Contact Me",
                           form=form)

@application.route("/project")
@application.route("/project/<int:p_type>")
@application.route("/project/<int:p_type>/<int:p_id>")
def project_page(p_type=0, p_id=0):
    return render_template("project.html",
                            project_form=forms.NewProject(),
                            post_form=forms.NewPost())
    p = models.Project.query.get(p_id)
    if p:
        if p.type.id == p_type:
            return render_template("project.html",
                                descr="Working Project!",
                                project=p)
    flash("Project not found", "global")
    return redirect(url_for("index"))
    
@application.route("/post")
@application.route("/post/<list:p_tags>")
@application.route("/post/<int:p_id>")
def post_page(p_tags=[], p_id=None):
    return render_template("post.html",
                                post_form=forms.NewPost())
    flash("Post not found", "global")
    return redirect(url_for("index"))
                           
@application.route("/login", methods=["GET", "POST"])
def login():
    if not g.user.is_authenticated:
        if request.method == "GET":
            return render_template("login.html",
                                   title="Login",
                                   descr="Login",
                                   login_form = forms.LoginForm())
                                   
        login_form = forms.LoginForm()
        if login_form.validate():
            valid = User.query.filter(User.name.ilike("%{}%".format(login_form.name.data))).first()
            if valid:
                if bcrypt.check_password_hash(valid.password, login_form.password.data):
                        login_user(valid)
                        flash("Welcome {}-sama".format(valid.name), "global")
                        return redirect(request.args.get('next') or url_for("index"))
        flash("I-it's not like I want you to log in or anything, s-stupid!", "error")
        return redirect(url_for("login"))
    return redirect(url_for("logout"))
    
@application.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))
    
@application.route("/admin")
@login_required
def admin():
    return render_template("admin.html",
                           title="Admin",
                           descr="Administrator")
             
@application.route("/adminadd", methods=["POST"])
@login_required
def admin_add():
    # project type
    if "p_name" in request.form:
        pass
        
    # category
    if "c_name" in request.form:
        pass
        
    # project
    if "project_name" in request.form:
        pass
        
    return redirect(request.args.get('next') or url_for("admin"))
    
