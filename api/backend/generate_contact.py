import names

class GenerateContact:

    def __init__(self, mysql):
        self.mysql=mysql

    def generate_contact(self):
        """ This function add 100 new random contacts to the database
        """
        count = 0
        #  Here i just insert 2 contacts for testing
        while count < 2: 
            count += 1
            first_name = names.get_first_name()
            last_name = names.get_last_name()
            email = first_name + '.' + last_name + '@yopmail.com'
            phone_number = '+33643014673' 
            cur = self.mysql.connection.cursor()
            cur.execute('INSERT INTO contact_table (first_name, last_name , email , phone_number) values (' +
                        "'" + first_name + "'" + ', ' +
                        "'" + last_name + "'" +  ', ' +
                        "'" + email + "'" +  ', ' +
                        "'" + phone_number + "'" + ')')
            self.mysql.connection.commit()