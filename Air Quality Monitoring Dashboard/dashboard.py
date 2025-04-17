import dash
from dash import dcc, html
from dash.dependencies import Input, Output
import requests

app = dash.Dash(__name__)
app.title = "AQ Easy - Air Quality Monitor"

app.layout = html.Div([
    html.H1("AQ Easy - Real-Time Air Quality"),
    dcc.Dropdown(
        id='city-dropdown',
        options=[{'label': c, 'value': c} for c in ['Delhi', 'Mumbai', 'Bangalore']],
        value='Delhi'
    ),
    html.Div(id='aqi-output'),
    dcc.Interval(id='interval-component', interval=60000, n_intervals=0)  # 1-minute refresh
])

@app.callback(
    Output('aqi-output', 'children'),
    [Input('city-dropdown', 'value'), Input('interval-component', 'n_intervals')]
)
def update_output(city, n):
    try:
        response = requests.get(f"http://127.0.0.1:5000/api/aqi/{city}")
        data = response.json()
        if "aqi" in data:
            return html.Div([
                html.H2(f"City: {city}"),
                html.P(f"AQI: {data['aqi']}"),
                html.P(f"Dominant Pollutant: {data.get('dominentpol', 'N/A')}"),
            ])
        else:
            return html.P("Error: Could not fetch data.")
    except:
        return html.P("Backend not running or API error.")

if __name__ == '__main__':
    app.run(debug=True, port=8050)

