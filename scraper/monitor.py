import requests
import random
from bs4 import BeautifulSoup
from database import DBConnection
from time import sleep

def generate_random_headers():
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",

        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 "
        "(KHTML, like Gecko) Version/14.0 Safari/605.1.15",

        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",

        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) "
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",

        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0"
    ]

    referers = [
        "https://www.google.com/",
        "https://www.bing.com/",
        "https://duckduckgo.com/",
        "https://www.yahoo.com/"
    ]

    headers = {
        "User-Agent": random.choice(user_agents),
        "Accept": random.choice([
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        ]),
        "Accept-Language": random.choice([
            "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "pt-BR,pt;q=0.9"
        ]),
        "Referer": random.choice(referers)
    }

    if random.random() < 0.8:
        headers["Accept-Encoding"] = "gzip, deflate, br"
    if random.random() < 0.5:
        headers["Connection"] = "keep-alive"
    if random.random() < 0.3:
        headers["DNT"] = "1"
    if random.random() < 0.5:
        headers["Upgrade-Insecure-Requests"] = "1"

    return headers


db_connection = DBConnection()
urls = db_connection.get_urls()

for url in urls:
    headers = generate_random_headers()
    r = requests.get(url['link'], headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')

    if r.text.find(url['captcha_page_identifier']) == -1:
        sleep(2)
        product_price = str(soup.find(url['product_tag_price'], class_=url['product_class_price']))[-12:-4]
        print(product_price)

        db_connection.post_check(product_price, url['laptopId'])
    else:
        print('Página de CAPTCHA')
