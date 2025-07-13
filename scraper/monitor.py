import requests
import random

from bs4 import BeautifulSoup
from database import DBConnection
from time import sleep
from telegram_bot import send_telegram_message

def generate_random_headers():
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
        "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Mobile Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (iPad; CPU OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/117.0.2045.60 Chrome/117.0.5938.62 Safari/537.36",
        "Mozilla/5.0 (Linux; Android 10; moto g(9) play) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 Mobile Safari/537.36"
    ]

    referers = [
        "https://www.google.com/",
        "https://www.bing.com/",
        "https://www.ecosia.org/",
        "https://duckduckgo.com/",
        "https://www.startpage.com/"
    ]

    headers = {
        "User-Agent": random.choice(user_agents),
        "Accept": random.choice([
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "application/json, text/plain, */*"
        ]),
        "Accept-Language": random.choice([
            "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "en-US,en;q=0.9,pt-BR;q=0.8",
            "pt;q=0.9,en;q=0.8"
        ]),
        "Referer": random.choice(referers)
    }

    if random.random() < 0.8:
        headers["Accept-Encoding"] = "gzip, deflate, br"
    if random.random() < 0.5:
        headers["Connection"] = "keep-alive"
    if random.random() < 0.4:
        headers["DNT"] = "1"
    if random.random() < 0.6:
        headers["Upgrade-Insecure-Requests"] = "1"
    if random.random() < 0.3:
        headers["Sec-Fetch-Dest"] = "document"
        headers["Sec-Fetch-Mode"] = "navigate"
        headers["Sec-Fetch-Site"] = "none"
        headers["Sec-Fetch-User"] = "?1"

    return headers

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
