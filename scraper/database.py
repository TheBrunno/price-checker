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
            select lap.id laptopId, product_tag_price, product_html_attribute_price, link, captcha_page_identifier, expected_price, model, ram, processor, product_html_attribute_value_price from seller sel
                inner join laptop_seller ls on sel.id = ls.fk_seller
                inner join laptop lap on ls.fk_laptop = lap.id;
        """)

        urlsResponse = self.cursor.fetchall()
        
        urls = []

        for url in urlsResponse:
            urls.append({
            "laptopId": url[0],
            "product_tag_price": url[1],
            "product_html_attribute_price": url[2],
            "link": url[3],
            "captcha_page_identifier": url[4],
            "expected_price": url[5],
            "model": url[6],
            "ram": url[7],
            "processor": url[8],
            "product_html_attribute_value_price": url[9]
        })

        return urls
    
    def post_check(self, price, fklaptop):
        if not self.is_equal_last_price(price, fklaptop):
            sql = f"insert into `check` (price, fk_laptop) values (%s, %s)"
            val = (price, fklaptop)
            self.cursor.execute(sql, val)

            self.mydb.commit()
            print("Registro diferente, inserido no DB.")
            return True
        else:
            print("Não inserido no DB pois é igual ao último registro.")
            return False


    def is_equal_last_price(self, price, fklaptop):
        self.cursor.execute(f"""
            select price from `check`
            where check_at = (select max(check_at) cheks from `check` where fk_laptop = {fklaptop});
        """)

        try:
            lastPrice = self.cursor.fetchall()[0][0]
        except:
            lastPrice = 'sem registros'

        print(f"Preço capturado: {price}\nÚltimo valor no BD: {lastPrice}")
        return price == lastPrice