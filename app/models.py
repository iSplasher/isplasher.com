from app import db
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
        

categories = db.Table('categories',
    db.Column('category_id', db.Integer, db.ForeignKey('category.id')),
    db.Column('post_id', db.Integer, db.ForeignKey('post.id'))
)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    project_type = db.Column(db.String)
    description = db.Column(db.String)
    timestamp = db.Column(db.DateTime)
    date_started = db.Column(db.DateTime)
    date_finished = db.Column(db.DateTime)
    posts = db.relationship('Post', backref='post_project', lazy='dynamic')
    
    def __repr__(self):
        t = "Project "
        for x in [self.id, self.name, self.description, self.date_added, self.date_started, self.date_finished]:
            t += "{}\n".format(x)
        return t
        
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    body = db.Column(db.String)
    timestamp = db.Column(db.DateTime)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
    categories = db.relationship('Category', secondary=categories, backref=db.backref('post_categories', lazy='dynamic'))
    comments = db.relationship('Comment', backref='post_comment', lazy='dynamic')

    def __repr__(self):
        return '<Post %r>' % (self.body)
        
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    body = db.Column(db.String(500))
    timestamp = db.Column(db.DateTime)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))

    def __repr__(self):
        return '<Post %r>' % (self.body)
        
        
def add_category(name):
    c = Category(name=name)
    db.session.add(c)
    
def add_post(project, body, categories):
    p = Post(body=body, timestamp=datetime.datetime.utcnow(), post_project=project)
    db.session.add(p)
    
def add_project(project_type, name, description, start_date=datetime.datetime.utcnow(), finish_date=datetime.datetime.utcnow()):
    p = Project(name=name, project_type=project_type, description=description, timestamp=datetime.datetime.utcnow(),
        date_started=start_date, date_finished=finish_date)
    db.session.add(p)