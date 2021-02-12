class UpdateContact:

    def __init__(self, mysql):
        self.mysql = mysql

    def add_contact(self, first_name, last_name, email, phone_number):
        """ This function add new contact to the database
        """
        cur = self.mysql.connection.cursor()
        cur.execute("INSERT INTO contact_table (first_name, last_name , email , phone_number) values (" +
                        "'" + first_name + "'" + ", " +
                        "'" + last_name + "'" + ", " +
                        "'" + email + "'" + ", " 
                        "'" + phone_number + "'" + ")")
        self.mysql.connection.commit()

    def get_contact_by_id(self, id):
        """ This function return contact info of the input id
        """
        cur = self.mysql.connection.cursor()
        cur.execute("SELECT * FROM db_contacts.contact_table where id = " + id)
        return cur.fetchall()

    def get_all_contacts(self):
        cur = self.mysql.connection.cursor()
        cur.execute("SELECT * FROM db_contacts.contact_table")
        return cur.fetchall()

    def  delete_contact_by_id(self, id):
        cur = self.mysql.connection.cursor()
        response = cur.execute("DELETE FROM db_contacts.contact_table where id = " + id)
        self.mysql.connection.commit()
        if response > 0:
            return "contact deleted"
        else:
            return "contact not found"