from flask import render_template, flash, session, request, url_for, redirect, abort, g
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import application, db, login_manager, bcrypt, models, forms
from app.models import User

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
    g.user = current_user

@login_manager.user_loader
def user_loader(user_id):
    return User.query.get(user_id)

@application.route("/")
@application.route("/index")
def index():
    return render_template("index.html",
                            descr="My Projects",
                            project_types=models.ProjectType.query.all())

@application.route("/github")
def github():
    return render_template("github.html",
                           title="Github",
                           descr="My Github Related Stuff",
                           projects=get_projects("Github"))

@application.route("/gymnasium")
def gymnasium():
    return render_template("index.html",
                           title="Gymnasium",
                           descr="Aarhus Gymnasium",
                           projects=get_projects("Gymnasium"))

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

@application.route("/project")
@application.route("/project/<int:p_type>")
@application.route("/project/<int:p_type>/<int:p_id>")
def project_page(p_type=0, p_id=0):
    p = models.Project.query.get(p_id)
    if p:
        if p.type.id == p_type:
            return render_template("project.html",
                                descr="Working project!",
                                project=p)
    flash("Project not found", "global")
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
        flash("I-it's not like I want you to log in or anything, B-baka!", "error")
        return redirect(url_for("login"))
    return redirect(url_for("index"))
    
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
    
