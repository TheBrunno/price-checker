import random

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