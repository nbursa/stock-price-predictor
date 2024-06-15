import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Load dataset
data = pd.read_csv('stocks_data.csv')

# Preprocess data
X = data[['feature1', 'feature2', 'feature3']]  # Replace with your features
y = data['target']  # Replace with your target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
with open('stock_model.pkl', 'wb') as f:
    pickle.dump(model, f)
