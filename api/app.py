
import json

from backend.update_contact import UpdateContact
from backend.generate_contact import GenerateContact
from backend.update_company import UpdateCompany
from backend.scraping import ScrapeData
from createPDF.createpdf import CreatePdf
from backend.send_mail import SendMail

from flask import Flask, jsonify, request

from __init__ import app, mysql, mail

@app.route('/generate')
def generate_contact():
    """ This function store new 100 contacts to database
    """
    load = GenerateContact(mysql)
    load.generate_contact()
    return "Store successed"


@app.route('/gestion/contact/', methods=['POST'])
def add_contact():
    """ This function add new contact to the database
    """
    first_name = request.get_json()['first_name']
    last_name = request.get_json()['last_name']
    email = request.get_json()['email']
    phone_number = request.get_json()['phone_number']
    load = UpdateContact(mysql)
    load.add_contact(first_name, last_name, email, phone_number)
    return "Add successed"


@app.route('/gestion/contact/', methods=['GET'])
def get_all_contacts():
    """ This function return all contacts data frome database
    """
    load = UpdateContact(mysql)
    contacts_info=load.get_all_contacts()
    return jsonify(contacts_info)


@app.route('/gestion/contact/<id>', methods=['GET'])
def get_contact_by_id(id):
    """ This function return contact info of the input id
    """
    load = UpdateContact(mysql)
    contact_info=load.get_contact_by_id(id)
    return jsonify(contact_info)


@app.route("/gestion/contact/<id>", methods=['PUT'])
def update_contact_siren_by_id(id):
    siren_number = request.get_json()['siren_number']
    load = UpdateCompany(mysql)
    load.update_contact_siren_by_id(id, siren_number)
    return "Update of siren number success"


@app.route("/gestion/contact/<id>", methods=['DELETE'])
def delete_contact_by_id(id):
    """ This function delete the contact that have the input id
    """
    load = UpdateContact(mysql)
    result = load.delete_contact_by_id(id)
    return result


@app.route('/scrape/<id>', methods=['POST'])
def scrape_society_name_by_id(id):
    """ This function used to scrape data from societe.com by the given siren number
    """
    load = UpdateCompany(mysql)
    siren_number = load.get_siren_number_by_id(id)
    scrape = ScrapeData(siren_number)
    society_name = scrape.scrape_society_name()
    load.update_society_name_by_id(id, society_name)
    return "Scraping success"


@app.route('/send/<id>', methods=['POST'])
def send_mail(id):
    """ This function used to end pdf via mail to contact 
    """
    load = UpdateContact(mysql)
    contact_info=load.get_contact_by_id(id)
    contact_info=list(contact_info)[0]
    first_name = list(contact_info.values())[1]
    email = list(contact_info.values())[3]
    siren_number = list(contact_info.values())[5]
    society_name = list(contact_info.values())[6]
    # Generate pdf file
    load = CreatePdf(first_name, siren_number, society_name)
    load.create_accord()
    # Send mail to client
    load = SendMail()
    load.send(first_name, email, app, mail)
    return "Email sent"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')


