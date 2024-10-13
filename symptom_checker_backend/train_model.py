import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import joblib


dataset = pd.read_csv('dataset.csv') 
X = dataset.drop(['Disease', 'Outcome Variable'], axis=1)  
y = dataset['Disease'] 
X = X.apply(LabelEncoder().fit_transform)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# Train the model
model = DecisionTreeClassifier()
model.fit(X_train, y_train)
# Save the model
joblib.dump(model, 'disease_model.pkl')
print("Model trained and saved as 'disease_model.pkl'")
