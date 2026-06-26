import json
import random

BASINS = {
    "India Offshore (Mumbai High)": {"lat": (18.5, 20.0), "lng": (71.0, 72.5), "type": "offshore"},
    "India Offshore (KG Basin)": {"lat": (15.5, 16.5), "lng": (81.5, 82.5), "type": "offshore"},
    "Australia Offshore (NW Shelf)": {"lat": (-21.0, -19.0), "lng": (115.0, 117.0), "type": "offshore"},
    "USA Gulf of Mexico": {"lat": (26.0, 28.5), "lng": (-94.0, -88.0), "type": "offshore"},
    "Middle East (Persian Gulf)": {"lat": (24.0, 27.0), "lng": (49.0, 52.0), "type": "offshore"},
    "North Sea (Europe)": {"lat": (56.0, 59.0), "lng": (1.0, 4.5), "type": "offshore"},
    "Brazil Pre-Salt (South America)": {"lat": (-25.0, -22.0), "lng": (-45.0, -41.0), "type": "offshore"},
    "Gulf of Guinea (Africa)": {"lat": (3.0, 5.0), "lng": (3.0, 8.0), "type": "offshore"},
    "Java Sea (Indonesia)": {"lat": (-6.0, -4.0), "lng": (107.0, 110.0), "type": "offshore"},
    "Bohai Bay (China)": {"lat": (38.0, 39.0), "lng": (119.0, 121.0), "type": "offshore"},
    "USA Permian Basin": {"lat": (31.0, 33.0), "lng": (-103.0, -101.0), "type": "onshore"},
    "Middle East (Ghawar Onshore)": {"lat": (24.0, 26.0), "lng": (48.0, 49.5), "type": "onshore"}
}

def generate_rigs(count=300):
    rigs = []
    statuses = ["Active", "Upcoming_Conventional", "Upcoming_Deep_Mining"]
    
    all_regions = list(BASINS.keys())
    # Offshore regions MUST be weighted 5 times higher than onshore regions
    all_weights = [5 if BASINS[r]["type"] == "offshore" else 1 for r in all_regions]
    
    offshore_regions = [r for r in all_regions if BASINS[r]["type"] == "offshore"]
    offshore_weights = [1] * len(offshore_regions)
    
    for i in range(count):
        status = random.choice(statuses)
        
        # Enforce 'Upcoming_Deep_Mining' strictly for offshore
        if status == "Upcoming_Deep_Mining":
            region = random.choices(offshore_regions, weights=offshore_weights, k=1)[0]
        else:
            region = random.choices(all_regions, weights=all_weights, k=1)[0]
            
        basin = BASINS[region]
        
        # Generate spread coordinates with random padding to prevent stacking
        lat = random.uniform(basin["lat"][0], basin["lat"][1]) + random.uniform(-0.005, 0.005)
        lng = random.uniform(basin["lng"][0], basin["lng"][1]) + random.uniform(-0.005, 0.005)
        
        lat = round(lat, 6)
        lng = round(lng, 6)
        
        if basin["type"] == "offshore":
            prod = random.randint(50000, 180000)
        else:
            prod = random.randint(10000, 80000)
            
        rig_id = f"rig_{i+1:03d}"
        
        rigs.append({
            "id": rig_id,
            "lat": lat,
            "lng": lng,
            "region": region,
            "status": status,
            "production_capacity": prod
        })
        
    return rigs

def main():
    print("Generating refined global oil rig locations dataset...")
    rigs = generate_rigs(300)
    
    output_file = "globe_rig_locations.json"
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(rigs, f, indent=2)
        
    print(f"Successfully generated {len(rigs)} naturally distributed rig locations.")

if __name__ == "__main__":
    main()
