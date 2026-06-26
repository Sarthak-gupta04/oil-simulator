import json
import os
import copy
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import joblib
import pandas as pd

app = FastAPI(title="Oil & Gas Data API")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = os.path.join(os.path.dirname(__file__), "globe_rig_locations.json")
MODEL_FILE = os.path.join(os.path.dirname(__file__), "oil_price_model.pkl")

# Load the trained model into memory on startup
if os.path.exists(MODEL_FILE):
    model = joblib.load(MODEL_FILE)
else:
    model = None

class SimulationRequest(BaseModel):
    deep_mining_allowed: bool
    demand_factor: float
    manual_rig_increase: int = 0

@app.get("/api/rigs")
def get_rigs():
    """Returns the full array of rig coordinates."""
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r") as f:
        data = json.load(f)
    return data

@app.post("/api/simulate")
def simulate(req: SimulationRequest):
    """
    Simulates the impact of policy decisions on oil prices, downstream costs,
    and rig statuses based on demand and deep mining allowances using ML.
    """
    if not os.path.exists(DATA_FILE):
        return {"error": "Data file not found"}
        
    if model is None:
        return {"error": "ML model not found. Please train the model first."}
        
    with open(DATA_FILE, "r") as f:
        rigs = json.load(f)
        
    # Deep copy to avoid modifying the in-memory data if it were cached
    modified_rigs = copy.deepcopy(rigs)
    
    us_active_count = 0
    intl_active_count = 0
    
    # Process rigs based on policy toggle and calculate active rig counts
    for rig in modified_rigs:
        # Standard upcoming conventional rigs are considered part of the baseline active supply
        if rig["status"] == "Upcoming_Conventional":
            rig["status"] = "Active"
            
        # Allowing Deep Mining injects even MORE rigs into the active supply
        if req.deep_mining_allowed:
            if rig["status"] == "Upcoming_Deep_Mining":
                rig["status"] = "Active"
                
        # Count the active rigs for the ML features
        if rig["status"] == "Active":
            if "USA" in rig["region"]:
                us_active_count += 1
            else:
                intl_active_count += 1

    # Add manual rig injection evenly split
    us_active_count += req.manual_rig_increase // 2
    intl_active_count += req.manual_rig_increase - (req.manual_rig_increase // 2)

    # Create a pandas DataFrame for the new rig count feature
    features_df = pd.DataFrame([{
        "us_rig_count": us_active_count,
        "intl_rig_count": intl_active_count
    }])
    
    # Use model.predict() to calculate the new WTI Crude Oil Price
    # Also adjusting by demand factor to maintain simulation interactivity
    ml_predicted_price = float(model.predict(features_df)[0])
    wti_price = ml_predicted_price * req.demand_factor
    
    # Dynamically calculate the downstream prices as percentages of this new ML-predicted WTI price
    gasoline_impact = wti_price * 0.035
    plastics_impact = wti_price * 0.025
    fertilizer_impact = wti_price * 0.030

    return {
        "wti_price": round(wti_price, 2),
        "downstream_impact": {
            "gasoline_percent": round(gasoline_impact, 2),
            "plastics_percent": round(plastics_impact, 2),
            "fertilizer_percent": round(fertilizer_impact, 2)
        },
        "calculation_steps": {
            "us_active_count": us_active_count,
            "intl_active_count": intl_active_count,
            "ml_base_prediction": round(ml_predicted_price, 2),
            "demand_factor": req.demand_factor
        },
        "rigs": modified_rigs
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
# Retrained model loaded
