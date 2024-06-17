import os
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import joblib
import logging
from sklearn.linear_model import LinearRegression
from pydantic import BaseModel, ValidationError, validator
from typing import List, Optional

app = Flask(__name__)
CORS(app)
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)

# Directory to save models
MODELS_DIR = 'models'
os.makedirs(MODELS_DIR, exist_ok=True)


class StockData(BaseModel):
    Stock: str
    feature1: float
    feature2: float
    feature3: float
    feature4: float
    target: Optional[float] = None  # Include target for training

    @validator('*')
    def check_non_negative(cls, v):
        if isinstance(v, float) and v < 0:
            raise ValueError('All features must be non-negative')
        return v

class TrainRequest(BaseModel):
    data: List[StockData]

class PredictRequest(BaseModel):
    Stock: str
    feature1: float
    feature2: float
    feature3: float
    feature4: float


@app.route('/train', methods=['POST'])
def train():
    try:
        data = request.json
        app.logger.info(f"Received training data: {data}")

        # Validate and parse input data
        validated_data = TrainRequest(**data)

        for stock_data in validated_data.data:
            stock_name = stock_data.Stock
            df = pd.DataFrame([stock.dict(exclude={'Stock', 'target'}) for stock in validated_data.data if stock.Stock == stock_name])
            target = pd.Series([stock.target for stock in validated_data.data if stock.Stock == stock_name])

            # Train the model
            model = LinearRegression()  # Example, adjust model as needed
            model.fit(df, target)

            # Save the model
            model_path = os.path.join(MODELS_DIR, f'{stock_name}_model.pkl')
            joblib.dump(model, model_path)
            app.logger.info(f"Model for {stock_name} saved at {model_path}")

        return jsonify({"message": "Models trained and saved successfully"}), 200
    except ValidationError as e:
        app.logger.error(f"Validation error in /train: {e}")
        return jsonify({"error": e.errors()}), 400
    except Exception as e:
        app.logger.error(f"Error in /train: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        app.logger.info(f"Received prediction data: {data}")

        # Validate and parse input data
        validated_data = PredictRequest(**data)
        stock_name = validated_data.Stock

        # Load the model for the given stock
        model_path = os.path.join(MODELS_DIR, f'{stock_name}_model.pkl')
        if not os.path.exists(model_path):
            return jsonify({"error": f"No trained model found for stock {stock_name}"}), 404

        model = joblib.load(model_path)

        # Prepare input data for prediction
        df = pd.DataFrame([validated_data.dict(exclude={'Stock'})])
        app.logger.info(f"DataFrame for prediction: {df}")

        # Make prediction
        prediction = model.predict(df)
        app.logger.info(f"Prediction: {prediction}")

        return jsonify({"Stock": stock_name, "Prediction": prediction[0]}), 200
    except ValidationError as e:
        app.logger.error(f"Validation error in /predict: {e}")
        return jsonify({"error": e.errors()}), 400
    except Exception as e:
        app.logger.error(f"Error in /predict: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(port=port)
