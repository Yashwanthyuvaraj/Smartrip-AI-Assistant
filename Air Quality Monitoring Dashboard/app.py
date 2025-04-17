import requests
from flask import Flask, jsonify
from flask_cors import CORS

def get_aqi_data(city, token="demo"):
    url = f"https://api.waqi.info/feed/{city}/?token={token}"
    res = requests.get(url)
    if res.status_code == 200:
        data = res.json()
        if data["status"] == "ok":
            return data["data"]
    return None

app = Flask(__name__)
CORS(app)

@app.route('/api/aqi/<city>')
def get_city_aqi(city):
    data = get_aqi_data(city)
    if data:
        return jsonify(data)
    return jsonify({'error': 'Unable to fetch AQI data'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5000)
