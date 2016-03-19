from flask.ext.wtf import Form
from wtforms import TextField, TextAreaField, SubmitField, BooleanField, validators, PasswordField
from wtforms.widgets.core import html_params
from wtforms.widgets import HTMLString

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