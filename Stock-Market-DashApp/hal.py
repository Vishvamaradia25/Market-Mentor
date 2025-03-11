import yfinance as yf
import plotly.graph_objs as go
from dash import Dash, dcc, html
from dash.dependencies import Input, Output
import pandas as pd
from flask_cors import CORS
from werkzeug.serving import make_server

# Initialize the Dash app
app = Dash(__name__)
server = app.server  # Expose the server variable for deployments

# Enable CORS if needed
CORS(server)

# Define the app layout
app.layout = html.Div([
    html.H1('Hindustan Aeronautics Limited - Stock Analysis'),

    dcc.Graph(id='timeseries-chart'),
    dcc.Graph(id='moving-averages-chart'),
    dcc.Graph(id='volume-chart'),
    dcc.Graph(id='candlestick-chart'),
    dcc.Graph(id='bollinger-bands-chart'),
    dcc.Graph(id='return-distribution-chart'),

    dcc.Interval(
        id='interval-component',
        interval=24*60*60*1000,  # Update once a day (24 hours in milliseconds)
        n_intervals=0
    )
])

@app.callback(
    [Output('timeseries-chart', 'figure'),
     Output('moving-averages-chart', 'figure'),
     Output('volume-chart', 'figure'),
     Output('candlestick-chart', 'figure'),
     Output('bollinger-bands-chart', 'figure'),
     Output('return-distribution-chart', 'figure')],
    [Input('interval-component', 'n_intervals')]
)
def update_charts(n):
    # Fetch daily data from Yahoo Finance for HAL
    ticker = "HAL.NS"
    stock_data = yf.download(ticker, start="2023-01-01")

    # Ensure data is available
    if stock_data.empty:
        print("No data retrieved from Yahoo Finance.")
        return [go.Figure()]*6  # Return empty figures

    # Time Series Chart
    timeseries_fig = go.Figure()
    timeseries_fig.add_trace(go.Scatter(x=stock_data.index, y=stock_data['Close'], mode='lines', name='Closing Prices'))
    timeseries_fig.update_layout(title='Historical Closing Prices',
                                 xaxis_title='Date',
                                 yaxis_title='Price (INR)')

    # Moving Averages Chart
    stock_data['50_MA'] = stock_data['Close'].rolling(window=50).mean()
    stock_data['200_MA'] = stock_data['Close'].rolling(window=200).mean()
    moving_averages_fig = go.Figure()
    moving_averages_fig.add_trace(go.Scatter(x=stock_data.index, y=stock_data['Close'], mode='lines', name='Close Price'))
    moving_averages_fig.add_trace(go.Scatter(x=stock_data.index, y=stock_data['50_MA'], mode='lines', name='50-Day Moving Average'))
    moving_averages_fig.add_trace(go.Scatter(x=stock_data.index, y=stock_data['200_MA'], mode='lines', name='200-Day Moving Average'))
    moving_averages_fig.update_layout(title='Moving Averages',
                                      xaxis_title='Date',
                                      yaxis_title='Price (INR)')

    # Volume Chart
    volume_fig = go.Figure()
    volume_fig.add_trace(go.Bar(x=stock_data.index, y=stock_data['Volume'], name='Trading Volume'))
    volume_fig.update_layout(title='Trading Volume',
                             xaxis_title='Date',
                             yaxis_title='Volume')

    # Candlestick Chart
    ohlc = stock_data[['Open', 'High', 'Low', 'Close']].reset_index()
    ohlc['Date'] = pd.to_datetime(ohlc['Date'])
    candlestick_fig = go.Figure(data=[go.Candlestick(x=ohlc['Date'],
                                                     open=ohlc['Open'],
                                                     high=ohlc['High'],
                                                     low=ohlc['Low'],
                                                     close=ohlc['Close'])])
    candlestick_fig.update_layout(title='Candlestick Chart',
                                  xaxis_title='Date',
                                  yaxis_title='Price (INR)')

    # Bollinger Bands Chart
    stock_data['20_MA'] = stock_data['Close'].rolling(window=20).mean()
    stock_data['20_STD'] = stock_data['Close'].rolling(window=20).std()
    stock_data['Upper_Band'] = stock_data['20_MA'] + (stock_data['20_STD'] * 2)
    stock_data['Lower_Band'] = stock_data['20_MA'] - (stock_data['20_STD'] * 2)
    bollinger_bands_fig = go.Figure()
    bollinger_bands_fig.add_trace(go.Scatter(x=stock_data.index, y=stock_data['Close'], mode='lines', name='Close Price'))
    bollinger_bands_fig.add_trace(go.Scatter(x=stock_data.index, y=stock_data['Upper_Band'], mode='lines', name='Upper Bollinger Band'))
    bollinger_bands_fig.add_trace(go.Scatter(x=stock_data.index, y=stock_data['Lower_Band'], mode='lines', name='Lower Bollinger Band'))
    bollinger_bands_fig.update_layout(title='Bollinger Bands',
                                      xaxis_title='Date',
                                      yaxis_title='Price (INR)')

    # Return Distribution Histogram
    stock_data['Returns'] = stock_data['Close'].pct_change()
    return_distribution_fig = go.Figure()
    return_distribution_fig.add_trace(go.Histogram(x=stock_data['Returns'].dropna(), nbinsx=50, name='Returns Distribution'))
    return_distribution_fig.update_layout(title='Return Distribution',
                                          xaxis_title='Daily Returns',
                                          yaxis_title='Frequency')

    return timeseries_fig, moving_averages_fig, volume_fig, candlestick_fig, bollinger_bands_fig, return_distribution_fig

if __name__ == '__main__':
    app.run_server(host='127.0.0.1', port=8060, debug=True)
