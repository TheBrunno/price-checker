import requests
from bs4 import BeautifulSoup

urls = [
    "https://www.magazineluiza.com.br/notebook-asus-vivobook-go-15-e1504fa-amd-ryzen-5-7520u-16gb-ram-512gb-ssd-linux-keepos-tela-156-fhd-black-nj1288/p/aebhcg3bch/in/note/",
    "https://www.magazineluiza.com.br/notebook-asus-vivobook-go-15-amd-ryzen-5-7520u-8gb-ram-512gb-ssd-156-full-hd-windows-11-e1504fa-nj836w/p/240066500/in/nass/?seller_id=magazineluiza"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/114.0.0.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9",
    "Referer": "https://www.google.com/"
}


for url in urls:
    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')

    #apenas para o site da magalu
    product_name = str(soup.find('h1', class_='sc-dcJsrY jjGTqv'))[116:-5]
    product_price = str(soup.find('p', class_='sc-dcJsrY eLxcFM sc-hgRRfv dfAhbD'))[-12:-4]
    print(f'{product_name} -> {product_price}')