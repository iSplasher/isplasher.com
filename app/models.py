from app import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    date_added = db.Column(db.String)
    date_started = db.Column(db.String)
    date_finished = db.Column(db.String)