import mysql.connector
from dotenv import load_dotenv

import os
load_dotenv()

class DBConnection:
    def __init__(self):
        self.mydb = mysql.connector.connect(
            host= os.getenv('DB_HOST'),
            user= os.getenv('DB_USER'),
            password= os.getenv('DB_PASSWORD'),
            database= os.getenv('DB_NAME')
        )
        self.cursor = self.mydb.cursor()

    def get_urls(self):
        self.cursor.execute("""
                    select lap.id laptopId, product_tag_price, product_class_price, link from seller sel
                        inner join laptop_seller ls on sel.id = ls.fk_seller
                        inner join laptop lap on ls.fk_laptop = lap.id;
                    """)

        urlsResponse = self.cursor.fetchall()
        
        urls = []

        for url in urlsResponse:
            urls.append({
            "laptopId": url[0],
            "product_tag_price": url[1],
            "product_class_price": url[2],
            "link": url[3]
        })

        return urls
    
    def post_check(self, price, fklaptop):
        if price == '':
            price = 'Não disponível'
        sql = "insert into `check` (price, fk_laptop) values (%s, %s)"
        val = (price, fklaptop)
        self.cursor.execute(sql, val)

        self.mydb.commit()