class CreateTable:

    def __init__(self, mysql):
        self.mysql = mysql

    def create_db_and_table(self):
        """ This function add new contact to the database
        """
        cur = self.mysql.connection.cursor()
        # Creating table as per requirement
        query_table = """CREATE TABLE IF NOT EXISTS contact_table (
                             id INT(10) NOT NULL AUTO_INCREMENT,
                            `first_name` VARCHAR(30) CHARACTER SET utf8,
                            `last_name` VARCHAR(30) CHARACTER SET utf8,
                            `email` VARCHAR(50) CHARACTER SET utf8,
                            `phone_number` VARCHAR(15) CHARACTER SET utf8,
                            `siren_number`VARCHAR(9) CHARACTER SET utf8,
                            `society_name`VARCHAR(50) CHARACTER SET utf8,
                             PRIMARY KEY (id)
                        )"""
        cur.execute(query_table)
        self.mysql.connection.commit()
