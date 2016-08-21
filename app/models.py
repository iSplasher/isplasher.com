from app import db
from sqlalchemy.schema import UniqueConstraint
import datetime

class User(db.Model):
    name = db.Column(db.String(64), primary_key=True)
    password = db.Column(db.String)
    #authenticated = db.Column(db.Boolean, default=False)

    def is_active(self):
        """True, as all users are active."""
        return True
        
    def is_anonymous(self):
        return False

    def get_id(self):
        """Return the name to satisfy Flask-Login's requirements."""
        return self.name

    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return True
        

project_tags = db.Table('project_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('project_id', db.Integer, db.ForeignKey('project.id'))
)

post_tags = db.Table('post_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'))
)

gist_tags = db.Table('gist_tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('gist_id', db.Integer, db.ForeignKey('gist.id'))
)

class Text(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    body = db.Column(db.String)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)

class ProjectType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    projects = db.relationship('Project', backref='type', cascade="all, delete-orphan", lazy='dynamic')

    def __repr__(self):
        return self.name

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    cover = db.Column(db.String)
    description = db.Column(db.String)
    timestamp = db.Column(db.DateTime)
    date_started = db.Column(db.Date)
    date_finished = db.Column(db.Date)
    progress = db.Column(db.Integer)
    type_id = db.Column(db.Integer, db.ForeignKey('project_type.id'))
    posts = None
    tags = db.relationship('Tag', secondary=project_tags, backref=db.backref('project', lazy='dynamic'))
    
    def __repr__(self):
        t = "Project "
        for x in [self.id, self.name, self.description, self.timestamp, self.date_started, self.date_finished]:
            t += "{}\n".format(x)
        return t

class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    body = db.Column(db.String)
    timestamp = db.Column(db.DateTime)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    tags = db.relationship('Tag', secondary=post_tags, backref=db.backref('post', lazy='dynamic'))

    def __repr__(self):
        return '<Post %r>' % (self.body)

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True)
    cover = db.Column(db.String)
    page = db.Column(db.Integer)
    total_pages = db.Column(db.Integer)

class Gist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True)
    tags = db.relationship('Tag', secondary=gist_tags, backref=db.backref('gist', lazy='dynamic'))
    body = db.Column(db.String)
    
def add_post(project, body, categories=[]):
    p = Post(body=body, timestamp=datetime.datetime.utcnow(), post_project=project)
    if isinstance(categories, list):
        for c in categories:
            p.categories.append(c)
    else:
       p.categories.append(categories)
    db.session.add(p)

    
def add_project(project_type, name, description, cover="/static/images/no-image.png", start_date=datetime.datetime.utcnow(), finish_date=datetime.datetime.utcnow()):
    p = Project(name=name, type=project_type, cover=cover, description=description, timestamp=datetime.datetime.utcnow(),
        date_started=start_date, date_finished=finish_date)
    db.session.add(p)