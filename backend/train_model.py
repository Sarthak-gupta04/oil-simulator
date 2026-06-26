import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

def main():
    print("Loading historical data...")
    # Load the historical oil_rig_master_data.csv file
    df = pd.read_csv('oil_rig_master_data.csv')
    
    # Drop rows with missing values
    df = df.dropna(subset=['wti_price', 'us_rig_count', 'intl_rig_count'])
    
    # Define the features (X) and target (y)
    X = df[['us_rig_count', 'intl_rig_count']]
    y = df['wti_price']
    
    # Perform a train/test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForestRegressor...")
    # Train a RandomForestRegressor on the data
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"\nModel Evaluation:")
    print(f"Mean Absolute Error (MAE): {mae:.4f}")
    print(f"R-squared Score (R2): {r2:.4f}\n")
    
    # Save the trained model to a file
    model_filename = 'oil_price_model.pkl'
    joblib.dump(model, model_filename)
    print(f"Successfully saved trained model to {model_filename}")

if __name__ == '__main__':
    main()
