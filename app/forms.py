from flask.ext.wtf import Form
from wtforms import TextField, TextAreaField, SubmitField, BooleanField, validators, PasswordField
from wtforms.widgets.core import html_params
from wtforms.widgets import HTMLString
from wtforms.fields.html5 import DateField
from wtforms.fields import SelectField, FileField

class InlineButtonWidget(object):
    """
    Render a basic ``<button>`` field.
    """
    input_type = 'submit'
    html_params = staticmethod(html_params)

    def __call__(self, field, **kwargs):
        kwargs.setdefault('id', field.id)
        kwargs.setdefault('type', self.input_type)
        kwargs.setdefault('value', field.label.text)
        return HTMLString('<button {}>{}</button>'.format(self.html_params(name=field.name, **kwargs), field.label.text))


class ButtonField(BooleanField):
    """
    Represents an ``<button type="submit">``.  This allows checking if a given
    submit button has been pressed.
    """
    widget = InlineButtonWidget()


class LoginForm(Form):
    name = TextField('Name', [validators.Length(min=1, max=200), validators.Required()], render_kw={"placeholder": "Name"})
    password = PasswordField("Password", [validators.Required()], render_kw={"placeholder": "Password"})
    submit = ButtonField('Log In')
    
    
class ContactForm(Form):
    name = TextField('Name', [validators.Length(min=1, max=200), validators.Required()], render_kw={"placeholder": "Name"})
    email = TextField('Email', [validators.Required(), validators.Email()], render_kw={"placeholder": "Email"})
    subject = TextField('Subject', [validators.Required()], render_kw={"placeholder": "Subject"})
    body = TextAreaField('Message', [validators.Required()], render_kw={"placeholder": "Message"})
    submit = ButtonField('Send')
    
class MDEdit(Form):
    body = TextAreaField('Markdown', [validators.Required()], render_kw={"placeholder": "Markdown Text"})
    submit = ButtonField('Edit')
    
class Tags(Form):
    tag = TextField('Tag', [validators.Length(min=1, max=100)], render_kw={"placeholder": "Tag", "class":"inputtag"})
 
class NewPost(Tags):
    title = TextField('Title', [validators.Required()], render_kw={"placeholder": "Title"})
    body = TextAreaField('Body', [validators.Required()], render_kw={"placeholder": "Body"})
    submit = ButtonField('Post') 
    
class NewProject(NewPost):
    project_image = FileField('Project Image', [validators.regexp('.')])
    project_start = DateField('Project Start', format='%d-%m-%Y')
    project_type = SelectField("Project Type", choices=[], coerce=int)
    submit = ButtonField('Submit')
    
    
class NewBook(Form):
    title = TextField('Title', [validators.Required()], render_kw={"placeholder": "Title"})
    book_image = FileField('Book Image', [validators.regexp('.')])
    book_start = DateField('Started', format='%d-%m-%Y')
    book_end = DateField('Finished', format='%d-%m-%Y')
    submit = ButtonField('Submit')
    