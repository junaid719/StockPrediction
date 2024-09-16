# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import yfinance as yf

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # List of stock tickers for the first 10 companies
# tickers = ['AAPL', 'GOOG', 'AMZN', 'MSFT', 'TSLA', 'NFLX', 'META', 'NVDA', 'JPM', 'V']

# # Function to fetch stock data using yfinance for multiple tickers
# def get_multiple_stocks_data(ticker_symbols):
#     stocks_data = []
    
#     for ticker in ticker_symbols:
#         stock = yf.Ticker(ticker)
#         hist = stock.history(period="1d")
#         if not hist.empty:
#             stock_info = {
#                 'ticker': ticker,
#                 'value': hist['Close'].iloc[0].item(),
#                 'change': (hist['Close'].iloc[0] - hist['Open'].iloc[0]).item(),
#                 '%change': ((hist['Close'].iloc[0] - hist['Open'].iloc[0]) / hist['Open'].iloc[0] * 100).item(),
#                 'high': hist['High'].iloc[0].item(),
#                 'low': hist['Low'].iloc[0].item(),
#                 'open': hist['Open'].iloc[0].item(),
#                 'prev_close': hist['Close'].iloc[0].item(),
#             }
#             stocks_data.append(stock_info)
    
#     return stocks_data

# # Function to fetch stock data for a specific ticker
# def get_stock_data(ticker):
#     stock = yf.Ticker(ticker)
#     hist = stock.history(period="1d")
    
#     if hist.empty:
#         return None

#     stock_info = {
#         'ticker': ticker,
#         'value': hist['Close'].iloc[0].item(),
#         'change': (hist['Close'].iloc[0] - hist['Open'].iloc[0]).item(),
#         '%change': ((hist['Close'].iloc[0] - hist['Open'].iloc[0]) / hist['Open'].iloc[0] * 100).item(),
#         'high': hist['High'].iloc[0].item(),
#         'low': hist['Low'].iloc[0].item(),
#         'open': hist['Open'].iloc[0].item(),
#         'prev_close': hist['Close'].iloc[0].item(),
#     }
    
#     return stock_info

# # Route for the main screen that fetches stock data for 10 companies
# @app.route('/stocks', methods=['GET'])
# def get_stocks():
#     # Fetch stock data for the first 10 companies
#     stocks_data = get_multiple_stocks_data(tickers)
    
#     if not stocks_data:
#         return jsonify({'error': 'No stock data available'}), 404

#     return jsonify(stocks_data)

# # Route for the search screen that fetches stock data for a specific company
# @app.route('/stocks/<ticker>', methods=['GET'])
# def search_stock(ticker):
#     # Fetch stock data for the provided ticker symbol
#     stock_data = get_stock_data(ticker.upper())  # Ensure case insensitivity by using upper()

#     if not stock_data:
#         return jsonify({'error': f'No data found for the ticker symbol: {ticker}'}), 404

#     return jsonify(stock_data)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', debug=True)



# from flask import Flask, jsonify
# import yfinance as yf
# from statsmodels.tsa.arima.model import ARIMA
# from datetime import datetime

# app = Flask(__name__)

# # List of companies
# COMPANIES = ['AAPL', 'MSFT', 'TSLA']

# # Function to fetch stock data from Yahoo Finance
# def fetch_stock_data(company):
#     end = datetime.now()
#     start = datetime(end.year - 1, end.month, end.day)
#     data = yf.download(company, start=start, end=end)
#     return data

# # Function to apply ARIMA model and predict future prices
# def arima_predict(data):
#     data = data['Close'].values

#     # Fit ARIMA model (order=(p, d, q))
#     model = ARIMA(data, order=(5, 1, 0))
#     model_fit = model.fit()

#     # Predict next day
#     next_day_prediction = model_fit.forecast(steps=1)[0]

#     return next_day_prediction

# @app.route('/api/stock-data', methods=['GET'])
# def get_stock_data():
#     stock_data = []
#     predictions = []

#     for company in COMPANIES:
#         # Fetch stock data
#         data = fetch_stock_data(company)

#         # Get the latest data for the table
#         latest_data = data.iloc[-1]
#         stock_data.append({
#             'company': company,
#             'value': latest_data['Close'],
#             'change': latest_data['Close'] - latest_data['Open'],
#             'percentChange': ((latest_data['Close'] - latest_data['Open']) / latest_data['Open']) * 100,
#             'high': latest_data['High'],
#             'low': latest_data['Low']
#         })

#         # Run ARIMA model to predict the next stock price
#         next_day_prediction = arima_predict(data)
#         predictions.append({
#             'company': company,
#             'nextDayPrediction': next_day_prediction
#         })

#     return jsonify({'stocks': stock_data, 'predictions': predictions})

# if __name__ == '__main__':
#     app.run( host='0.0.0.0',debug=True)

from flask import Flask, jsonify
import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from sklearn.linear_model import LinearRegression
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM
import matplotlib.pyplot as plt
import math
from sklearn.metrics import mean_squared_error

app = Flask(__name__)

# Function to fetch data from Yahoo Finance
def fetch_data(symbol):
    stock = yf.Ticker(symbol)
    df = stock.history(period='1y')  # Fetch 1 year of historical data
    df = df[['Close']]  # Use only the closing prices
    df.reset_index(inplace=True)  # Reset index to get Date as a column
    return df

# Define the Linear Regression model function with added checks
def LIN_REG_ALGO(df):
    # Shift the data for future predictions
    forecast_out = 7  # Predict 7 days into the future
    df["Close after n days"] = df["Close"].shift(-forecast_out)

    # Drop any rows with missing values created by the shift
    df_new = df[["Close", "Close after n days"]].dropna()

    # Check if there are enough samples for training
    if len(df_new) <= forecast_out:
        raise ValueError("Not enough data available to perform training. Try increasing the time period.")

    # Separate the features and labels
    X = np.array(df_new.iloc[:, 0:1])  # Closing prices as features
    y = np.array(df_new.iloc[:, 1])    # Closing prices after n days as labels

    # Ensure data is reshaped properly
    y = np.reshape(y, (-1, 1))

    # Split the data into training and testing sets
    X_train = X[:int(0.8 * len(df_new))]
    X_test = X[int(0.8 * len(df_new)):]
    y_train = y[:int(0.8 * len(df_new))]
    y_test = y[int(0.8 * len(df_new)):]

    # Check if training and testing data are sufficient
    if len(X_train) == 0 or len(X_test) == 0:
        raise ValueError("Insufficient data for training or testing after splitting. Check the data slicing logic.")

    # Scale the data
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    # Train the Linear Regression model
    clf = LinearRegression()
    clf.fit(X_train, y_train)

    # Make predictions
    y_test_pred = clf.predict(X_test)

    # Calculate RMSE
    error_lr = math.sqrt(mean_squared_error(y_test, y_test_pred))

    # Predict future stock prices
    forecast_set = clf.predict(sc.transform(X[-forecast_out:]))
    
    lr_pred = forecast_set[0]  # First predicted value

    return float(lr_pred), float(error_lr)

# Define the LSTM model function
def LSTM_ALGO(df):
    dataset_train = df.iloc[0:int(0.8 * len(df)), :]
    dataset_test = df.iloc[int(0.8 * len(df)):, :]

    training_set = df.iloc[:, 1:2].values  # 1:2 to get a numpy array
    sc = MinMaxScaler(feature_range=(0, 1))
    training_set_scaled = sc.fit_transform(training_set)

    X_train = []
    y_train = []
    for i in range(7, len(training_set_scaled)):
        X_train.append(training_set_scaled[i - 7:i, 0])
        y_train.append(training_set_scaled[i, 0])

    X_train = np.array(X_train)
    y_train = np.array(y_train)
    X_forecast = np.array(X_train[-1, 1:])
    X_forecast = np.append(X_forecast, y_train[-1])
    
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))
    X_forecast = np.reshape(X_forecast, (1, X_forecast.shape[0], 1))
    
    regressor = Sequential()
    regressor.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
    regressor.add(Dropout(0.1))
    regressor.add(LSTM(units=50, return_sequences=True))
    regressor.add(Dropout(0.1))
    regressor.add(LSTM(units=50, return_sequences=True))
    regressor.add(Dropout(0.1))
    regressor.add(LSTM(units=50))
    regressor.add(Dropout(0.1))
    regressor.add(Dense(units=1))

    regressor.compile(optimizer='adam', loss='mean_squared_error')
    regressor.fit(X_train, y_train, epochs=25, batch_size=32)

    real_stock_price = dataset_test.iloc[:, 1:2].values

    dataset_total = pd.concat((dataset_train['Close'], dataset_test['Close']), axis=0)
    testing_set = dataset_total[len(dataset_total) - len(dataset_test) - 7:].values
    testing_set = testing_set.reshape(-1, 1)
    testing_set = sc.transform(testing_set)

    X_test = []
    for i in range(7, len(testing_set)):
        X_test.append(testing_set[i - 7:i, 0])
    X_test = np.array(X_test)
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

    predicted_stock_price = regressor.predict(X_test)
    predicted_stock_price = sc.inverse_transform(predicted_stock_price)
    
    error_lstm = math.sqrt(mean_squared_error(real_stock_price, predicted_stock_price))
    forecasted_stock_price = regressor.predict(X_forecast)
    forecasted_stock_price = sc.inverse_transform(forecasted_stock_price)

    lstm_pred = forecasted_stock_price[0, 0]
    return float(lstm_pred), float(error_lstm)  # Convert to float

# Flask route for Linear Regression predictions
@app.route('/predict_lr/<symbol>', methods=['GET'])
def predict_lr(symbol):
    df = fetch_data(symbol)
    lr_pred, error_lr = LIN_REG_ALGO(df)
    return jsonify({'predicted_price': lr_pred, 'rmse': error_lr})

# Flask route for LSTM predictions
@app.route('/predict_lstm/<symbol>', methods=['GET'])
def predict_lstm(symbol):
    df = fetch_data(symbol)
    lstm_pred, error_lstm = LSTM_ALGO(df)
    return jsonify({'predicted_price': lstm_pred, 'rmse': error_lstm})

if __name__ == '__main__':
    app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)

