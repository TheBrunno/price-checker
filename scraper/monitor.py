import requests
from bs4 import BeautifulSoup
from database import DBConnection

db_connection = DBConnection()
urls = db_connection.get_urls()

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/114.0.0.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9",
    "Referer": "https://www.google.com/"
}


for url in urls:
    r = requests.get(url['link'], headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')

    product_price = str(soup.find(url['product_tag_price'], class_=url['product_class_price']))[-12:-4]

    db_connection.post_check(product_price, url['laptopId'])