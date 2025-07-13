import requests

from bs4 import BeautifulSoup
from time import sleep

from database import DBConnection
from telegram_bot import send_telegram_message
from random_headers import generate_random_headers

db_connection = DBConnection()
urls = db_connection.get_urls()

for url in urls:
    headers = generate_random_headers()
    r = requests.get(url['link'], headers=headers)
    print(r.text)
    
    soup = BeautifulSoup(r.text, 'html.parser')
    

    if r.text.find(url['captcha_page_identifier']) == -1:

        product_price_html = soup.find(
            url['product_tag_price'], 
            attrs={
                url["product_html_attribute_price"]: url["product_html_attribute_value_price"].split(' ')
            }
        )

        product_price_html = str(product_price_html)

        product_price = product_price_html[product_price_html.find('R$')+3:product_price_html.find(',')+3]

        if product_price == '':
            product_price = None
        else:
            product_price = float(product_price.replace('.', '').replace(',', '.'))
        
        if db_connection.post_check(product_price, url['laptopId']) and product_price:
            if product_price < float(url['expected_price']):
                send_telegram_message(f"""
                    Olá, o seu produto <b><u>{url["model"]}</u></b> com <b>{url["ram"]}GB ram</b>, que usa o processador <b>{url["processor"]}</b> está custando apenas <b>R${product_price}</b>, corre!!!
                """)

    else:
        print('Página de CAPTCHA')
