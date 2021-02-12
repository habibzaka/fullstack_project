
from flask_mail import Message


class SendMail:

    def send(self, first_name, email, app, mail):       
        msg = Message('Bonjour Monsieur '+ first_name , sender = 'ledrgbcontrol@gmail.com', recipients = [email])
        msg.body = "Vous trouverez ci-joint votre bon d'accord"
        with app.open_resource("form.pdf") as fp:
            msg.attach('form.pdf','application/pdf',fp.read())
            mail.send(msg)
        