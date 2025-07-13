import requests
from dotenv import load_dotenv

import os
load_dotenv()

def send_telegram_message(message):
    token = os.getenv('TOKEN')
    chat_id = os.getenv('CHAT_ID')
    
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = {
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'HTML'
    }
    response = requests.post(url, data=data)
    return response.json()


if __name__ == "__main__":
    print(send_telegram_message('mensagem teste'))