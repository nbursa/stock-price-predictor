import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import joblib

app = Flask(__name__)
CORS(app)
load_dotenv()

# Load the pre-trained model
model = joblib.load('stock_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        app.logger.info(f"Received data: {data}")
        # Ensure data is wrapped in a list if not already
        if not isinstance(data, list):
            data = [data]
        # Convert input data to a DataFrame
        df = pd.DataFrame(data)
        app.logger.info(f"DataFrame: {df}")
        # Make predictions
        prediction = model.predict(df)
        app.logger.info(f"Prediction: {prediction}")
        return jsonify(prediction.tolist())
    except Exception as e:
        app.logger.error(f"Error in /predict: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Test endpoint working!"})

if __name__ == '__main__':
    app.run(port=5001)
