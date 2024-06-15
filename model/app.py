from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the trained model
with open('stock_model.pkl', 'rb') as f:
    model = pickle.load(f)


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame(data)
    prediction = model.predict(df)
    return jsonify(prediction.tolist())


if __name__ == '__main__':
    app.run(port=5001, debug=True)
