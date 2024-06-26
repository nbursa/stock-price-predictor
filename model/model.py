import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Load dataset
data = pd.read_csv('historical_stock_data.csv')

# Preprocess data
X = data[['Open', 'High', 'Low', 'Close']]  # Use actual column names as features
y = data['Volume']  # Use the target column name
print(X.head())
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
with open('stock_model.pkl', 'wb') as f:
    pickle.dump(model, f)
