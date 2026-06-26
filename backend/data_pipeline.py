import pandas as pd
import json
import random
import math
from global_land_mask import globe as land_mask

def process_data():
    print("Loading Excel dataset...")
    df = pd.read_excel('../Global-Oil-and-Gas-Extraction-Tracker-March-2024.xlsx', sheet_name='Main data')
    
    print(f"Loaded {len(df)} rows. Processing...")
    
    # Filter rows missing Latitude or Longitude
    df = df.dropna(subset=['Latitude', 'Longitude'])
    
    rigs = []
    
    for idx, row in df.iterrows():
        # Get coordinates
        lat = row['Latitude']
        lng = row['Longitude']
        
        # If lat or lng is not a float (e.g. string 'TBD'), skip it
        try:
            lat = float(lat)
            lng = float(lng)
            if math.isnan(lat) or math.isnan(lng):
                continue
        except ValueError:
            continue
            
        # Filter out rigs that are located on land
        if land_mask.is_land(lat, lng):
            continue
            
        # Map Region
        country = str(row.get('Country', 'Unknown'))
        region = f"USA - {country}" if country == "United States" else country
        
        # Map Status
        raw_status = str(row.get('Status', '')).lower()
        
        if raw_status == 'operating':
            status = 'Active'
        elif raw_status in ['discovered', 'in development', 'exploration']:
            # 20% chance to be Upcoming_Deep_Mining to support the ML policy toggle
            status = random.choices(
                ['Upcoming_Deep_Mining', 'Upcoming_Conventional'],
                weights=[20, 80]
            )[0]
        else:
            status = 'Inactive'
            
        # Random production capacity since it's not strictly available in this sheet
        prod = random.randint(10000, 150000)
        
        rig_id = str(row.get('Unit ID', f'RIG_{idx}'))
        name = str(row.get('Unit Name', 'Unknown'))
        operator = str(row.get('Operator', 'Unknown'))
        
        rigs.append({
            "id": rig_id,
            "name": name,
            "operator": operator,
            "lat": round(lat, 6),
            "lng": round(lng, 6),
            "region": region,
            "status": status,
            "production_capacity": prod
        })
        
    output_file = "globe_rig_locations.json"
    print(f"Exporting {len(rigs)} processed rigs to {output_file}...")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(rigs, f, indent=2)
        
    print("Done!")

if __name__ == '__main__':
    process_data()
