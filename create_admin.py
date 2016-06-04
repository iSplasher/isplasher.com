from getpass import getpass

from app import application, bcrypt, db
from app.models import User

if __name__ == "__main__":
	with application.app_context():
		if User.query.all():
			print("Admin already exists")
			exit()

		print("Name: ")
		name = input()
		password = getpass("Password:")
		assert password == getpass("Password (again):")

		user = User(name=name, password=bcrypt.generate_password_hash(password))
		db.session.add(user)
		db.session.commit()
		print("Admin added! Welcome, ", name)