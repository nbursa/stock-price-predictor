import requests
import pandas as pd
import os
import argparse
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve API key from environment variable
API_KEY = os.getenv('ALPHA_VANTAGE_API_KEY')
if not API_KEY:
    raise ValueError("No API key found. Please set the ALPHA_VANTAGE_API_KEY environment variable.")

# Set up command-line argument parsing
parser = argparse.ArgumentParser(description='Fetch historical stock data.')
parser.add_argument('symbol', type=str, help='Stock symbol to fetch data for')
args = parser.parse_args()

STOCK_SYMBOL = args.symbol
CSV_FILE = f'historical_stock_data_{STOCK_SYMBOL}.csv'

# Fetch daily stock data
url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={STOCK_SYMBOL}&outputsize=full&apikey={API_KEY}'
response = requests.get(url)
data = response.json()

# Parse the JSON data
if 'Time Series (Daily)' in data:
    daily_data = data['Time Series (Daily)']
    df = pd.DataFrame.from_dict(daily_data, orient='index')
    df.columns = ['Open', 'High', 'Low', 'Close', 'Volume']
    df.index.name = 'Date'
    df = df.reset_index()
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.sort_values('Date')

    # Save to CSV
    df.to_csv(CSV_FILE, index=False)
    print(f"Data saved to {CSV_FILE}")
else:
    print("Error fetching data")

# Ensure the CSV file is in the correct directory
print(f"CSV file path: {os.path.abspath(CSV_FILE)}")
