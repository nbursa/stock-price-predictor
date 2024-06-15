# Real-Time Stock Price Predictor

## Overview

The Stock Price Predictor is a Real-Time (web sockets) web application that predicts future stock prices of selected companies using historical stock price data and machine learning models. The application provides real-time updates and visualizations to help users make informed investment decisions.

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

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
    - Create a `.env` file in the project root.
    - Add your API keys and other configuration settings.

### Running the Application

1. **Start the development server:**
   ```sh
   npm run dev
   ```

2. **Open the application:**
    - Open your browser and navigate to `http://localhost:5173`.

### Directory Details

- **src/**: Contains the Vue 3 client-side application.
- **models/**: Contains machine learning model code and saved models.
- **data/**: Contains data collection and preprocessing scripts.
- **notebooks/**: Contains Jupyter notebooks for exploratory data analysis and model development.
- **tests/**: Contains unit tests and integration tests.
- **docs/**: Contains project documentation.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](docs/CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Alpha Vantage](https://www.alphavantage.co/) for providing stock price data.
- [Vue.js](https://vuejs.org/) and [Vite](https://vitejs.dev/) for the front-end framework and build tool.

## Contact

For any inquiries or feedback, please contact [your-email@example.com](mailto:your-email@example.com).
