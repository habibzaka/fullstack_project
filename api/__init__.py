from flask import Flask
from flask_mysqldb import MySQL
from flask_mail import Mail, Message

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_HOST'] = 'db'
app.config['MYSQL_DB'] = 'db_contacts'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['MAIL_SERVER'] ='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'ledrgbcontrol@gmail.com'
app.config['MAIL_PASSWORD'] = 'Zikovitche1'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True


mail = Mail(app)

mysql = MySQL(app)
