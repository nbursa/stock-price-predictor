# Real-Time Stock Price Predictor

## Overview

The Stock Price Predictor is a Real-Time web application that predicts future stock prices of selected companies using historical stock price data and machine learning models. The application provides real-time updates and visualizations to help users make informed investment decisions.

⚠️ This project is currently in progress. Some features may not be fully implemented or functional. Please check back later for updates.

## Features

- **Data Collection:** Fetch historical stock price data from a reliable API.
- **Data Preprocessing:** Clean and process the collected data.
- **Machine Learning Models:** Implement and evaluate multiple models for stock price prediction.
- **Real-Time Updates:** Provide real-time stock price updates using WebSockets.
- **Interactive Visualization:** Display historical and predicted stock prices on an interactive graph.
- **Web Application:** User-friendly web interface built with Vue 3 and Vite.

## Getting Started

### Prerequisites

- Node.js and npm
- Python (for data processing and model building)
- Git

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/nbursa/stock-price-predictor.git
   cd stock-price-predictor
   ```

### Setting up the Client

1. **Navigate to the `src` directory:**

   ```sh
   cd src
   ```

2. **Install client dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server for the client:**

   ```sh
   npm run dev
   ```

4. **Open the client application:**
   - Open your browser and navigate to `http://localhost:5173`.

### Setting up the Server

1. **Navigate to the `server` directory:**

   ```sh
   cd server
   ```

2. **Install server dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables for the server:**

   - Create a `.env` file in the `server` directory.
   - Add your database connection string and other configuration settings.

4. **Start the server:**
   ```sh
   npm run dev
   ```

### Setting up the Model

1. **Navigate to the `model` directory:**

   ```sh
   cd model
   ```

2. **Create a virtual environment:**

   ```sh
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   ```sh
   source venv/bin/activate
   ```

4. **Install model dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

5. **Set up environment variables for the model:**

   - Create a `.env` file in the `model` directory.
   - Add your API keys and other configuration settings.

6. **Run the model server:**
   ```sh
   python app.py
   ```

### Running the Application

1. **Start the client and server:**

   - Follow the instructions above to start both the client and server.

2. **Open the application:**
   - Open your browser and navigate to `http://localhost:5173` for the client.
   - The server will be running on `http://localhost:5000` (or the specified port).

### Directory Details

- **src/**: Contains the Vue 3 client-side application.
- **model/**: Contains machine learning model code and saved models.
- **server/**: Contains server-side code for data processing and API endpoints.
- **data/**: Contains data collection and preprocessing scripts.
- **notebooks/**: Contains Jupyter notebooks for exploratory data analysis and model development.
- **tests/**: Contains unit tests and integration tests.
- **docs/**: Contains project documentation.

### Notes

- This project is currently in progress. Some features may not be fully implemented or functional.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.
