from flask import render_template
from app import app

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html",
                            descr="My Projects")

@app.route("/github")
def github():
    return render_template("github.html",
                           title="Github",
                           descr="My Github Related Stuff")

@app.route("/gymnasium")
def gymnasium():
    return render_template("index.html",
                           title="Gymnasium",
                           descr="Aarhus Gymnasium")

@app.route("/random")
def random():
    return render_template("index.html",
                           title="Exclusive Random Stuff",
                           descr="Random stuff!!")

@app.route("/contact")
def contact():
    return render_template("index.html",
                           title="Contact",
                           descr="Contact Me")