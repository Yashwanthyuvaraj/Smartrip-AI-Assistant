import requests

def get_aqi_data(city, token="demo"):  # replace 'demo' with your real token
    base_url = f"https://api.waqi.info/feed/{city}/?token={token}"
    response = requests.get(base_url)
    if response.status_code == 200:
        data = response.json()
        if data["status"] == "ok":
            return data["data"]
    return None
