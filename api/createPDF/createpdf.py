
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import time

class CreatePdf:

    def __init__(self, first_name, siren_number, society_name):
        self.first_name = society_name
        self.siren_number = siren_number
        self.society_name = society_name

    def create_accord(self):   
        can = canvas.Canvas("form.pdf", pagesize=letter)
        can.setLineWidth(.3)
        can.setFont('Helvetica-Bold', 20)
        can.drawString(210,600,'BON POUR ACCORD')
        can.setFont('Helvetica', 12)
        can.drawString(100,500,"Je soussigné " + self.first_name +" Président de la société " + self.society_name + " " + self.siren_number)
        can.drawString(100,480,"donne mon accord pour devenir client de la société Ayomi.")
        can.drawString(100,400,'Fait à Paris,')
        can.drawString(100,380,'Le ' + time.ctime())
        can.drawString(100,340,'Signature Ayomi')
        can.drawString(445,340,'Signature Client')
        can.save()

    