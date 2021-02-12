class UpdateCompany:

    def __init__(self, mysql):
        self.mysql=mysql
    
    def  get_siren_number_by_id(self, id):
        cur = self.mysql.connection.cursor()
        cur.execute("SELECT siren_number FROM db_clients.client_table where id = " + id)
        result = list(cur.fetchall())[0]
        siren_number = list(result.values())[0]
        return siren_number

    def  update_society_name_by_id(self, id, society_name):
        cur = self.mysql.connection.cursor()
        cur.execute("UPDATE db_clients.client_table SET society_name = '" + 
                    str(society_name) + "' where id = " + id)
        self.mysql.connection.commit()

    def update_client_siren_by_id(self, id, siren_number):
        cur = self.mysql.connection.cursor()
        cur.execute("UPDATE db_clients.client_table SET siren_number = '" 
                    + str(siren_number) + "' where id = " + id)
        self.mysql.connection.commit()
