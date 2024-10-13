
from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
from flask_cors import CORS  # Import CORS
app = Flask(__name__)
CORS(app)

# Load the dataset
dataset = pd.read_csv('dataset.csv') 

# Preprocess the dataset
features = dataset[['Fever', 'Cough', 'Fatigue', 'Difficulty Breathing', 'Age', 'Gender', 'Blood Pressure', 'Cholesterol Level']]
target = dataset['Disease']

# Encode categorical variables
label_encoders = {}
for column in features.select_dtypes(include=['object']).columns:
    le = LabelEncoder()
    features[column] = le.fit_transform(features[column])
    label_encoders[column] = le
X_train, X_test, y_train, y_test = train_test_split(features, target, test_size=0.2, random_state=42)
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'symptom_checker_model.pkl')
joblib.dump(label_encoders, 'label_encoders.pkl')

@app.route('/check-symptoms', methods=['POST'])
def check_symptoms():
    user_symptoms = request.json  # Receive symptoms from the frontend
    
    # Prepare input for prediction
    input_data = {
        'Fever': user_symptoms['Fever'],
        'Cough': user_symptoms['Cough'],
        'Fatigue': user_symptoms['Fatigue'],
        'Difficulty Breathing': user_symptoms['Difficulty Breathing'],
        'Age': user_symptoms['Age'],  # Numeric value
        'Gender': user_symptoms['Gender'],
        'Blood Pressure': user_symptoms['Blood Pressure'],
        'Cholesterol Level': user_symptoms['Cholesterol Level'],
    }

    # Convert input data to DataFrame
    input_df = pd.DataFrame([input_data])
    for column in input_df.select_dtypes(include=['object']).columns:
        input_df[column] = label_encoders[column].transform(input_df[column])

    # Load the model
    model = joblib.load('symptom_checker_model.pkl')

    # Make prediction
    predicted_disease = model.predict(input_df)[0]

    return jsonify({'Predicted Disease': predicted_disease})

if __name__ == '__main__':
    app.run(debug=True)
