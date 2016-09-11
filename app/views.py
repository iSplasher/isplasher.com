from flask import render_template, flash, request, url_for, redirect, abort, g
from flask_login import login_user, logout_user, current_user, login_required
from app import application, db, login_manager, bcrypt, models, forms, util
from app.models import User

from datetime import datetime
from os import listdir, path
from random import randint

debug = True

def get_projects(p_type, limit=0):
    projects = []
    if isinstance(p_type, str):
        project_type = models.ProjectType.query.filter(models.ProjectType.name.ilike("{}".format(p_type))).first()
    elif isinstance(p_type, int):
        project_type = models.ProjectType.query.get(p_type)
    if project_type:
        if limit:
            projects = project_type.projects.limit(limit).all()
        else:
            projects = project_type.projects.all()
    return projects

@application.before_request
def before_request():
    g.user = current_user
    g.activity = models.Activity.query.order_by(models.Activity.timestamp.desc()).limit(5).all()
       
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
    gym_p = get_projects("Gymnasium", 5)

    uni_p = get_projects("University", 5)
    return render_template("education.html",
                           title="Education",
                           descr="Education Related Stuff",
                           projects={'gym': {'1g':[x for x in gym_p if x.tags and [y for y in x.tags if y.name == "1.G"]],
                                             '2g':[x for x in gym_p if x.tags and [y for y in x.tags if y.name == "2.G"]],
                                             '3g':[x for x in gym_p if x.tags and [y for y in x.tags if y.name == "3.G"]]}, 
                                     'uni':uni_p})

@application.route("/random")
def random():
    return render_template("random.html",
                           title="Random Stuff",
                           descr="Exclusive Random Stuff!!",
                           book_form=forms.NewBook(),
                           gist_form=forms.Tags())

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
    if p_id:
        p = models.Project.query.get(p_id)
        if p:
            if p.type.id == p_type:
                return render_template("project.html",
                                    descr=p.name,
                                    project=p,
                                    post_form=forms.NewPost())
    else:
        p = models.ProjectType.query.get(p_type)
        if p:
            pass
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
            valid = User.query.filter(User.name.ilike("{}".format(login_form.name.data))).first()
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
    
@application.route("/projectadd")
@login_required
def new_project():
    return render_template("newproject.html",
                           title="New Project",
                           descr="New project",
                           project_form=forms.NewProject())