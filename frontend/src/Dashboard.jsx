import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const GLOBE_IMAGE_URL = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const BUMP_IMAGE_URL = "//unpkg.com/three-globe/example/img/earth-topology.png";
const BACKGROUND_IMAGE_URL = "//unpkg.com/three-globe/example/img/night-sky.png";
const COUNTRIES_GEOJSON_URL = "https://unpkg.com/three-globe/example/img/ne_110m_admin_0_countries.geojson";
const BACKEND_SIMULATE_URL = "http://localhost:8000/api/simulate";

function Dashboard() {
  const globeRef = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [rigs, setRigs] = useState([]);
  
  // Simulation Controls State
  const [deepMiningAllowed, setDeepMiningAllowed] = useState(false);
  const [demandFactor, setDemandFactor] = useState(1.0);
  const [manualRigIncrease, setManualRigIncrease] = useState(0);
  
  // Metrics State
  const [metrics, setMetrics] = useState({
    wti_price: 0,
    gasoline: 0,
    plastics: 0,
    fertilizer: 0
  });

  // Fetch Country Boundaries (runs once)
  useEffect(() => {
    fetch(COUNTRIES_GEOJSON_URL)
      .then(res => res.json())
      .then(setCountries)
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  // Trigger Simulation whenever controls change
  useEffect(() => {
    const runSimulation = async () => {
      try {
        const response = await fetch(BACKEND_SIMULATE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            deep_mining_allowed: deepMiningAllowed,
            demand_factor: parseFloat(demandFactor),
            manual_rig_increase: parseInt(manualRigIncrease) || 0
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update Metrics instantly with the ML prediction results
        setMetrics({
          wti_price: data.wti_price,
          gasoline: data.downstream_impact.gasoline_percent,
          plastics: data.downstream_impact.plastics_percent,
          fertilizer: data.downstream_impact.fertilizer_percent
        });
        
        // Update Globe Data seamlessly behind the overlay
        setRigs(data.rigs);
        
      } catch (err) {
        console.error("Error running simulation:", err);
      }
    };
    
    // Fire the API call
    runSimulation();
  }, [deepMiningAllowed, demandFactor, manualRigIncrease]);

  // Map rig status to distinct colors
  const getRigColor = (status) => {
    switch(status) {
      case 'Active': return '#00ff00'; // Green
      case 'Upcoming_Conventional': return '#ffff00'; // Yellow
      case 'Upcoming_Deep_Mining': return '#00d4ff'; // Cyan
      case 'Inactive': return '#475569'; // Grey
      default: return '#ffffff';
    }
  };

  return (
    <div style={{ margin: 0, padding: 0, width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      
      {/* 3D Globe Container (Background) */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, width: '100%', height: '100%' }}>
        <Globe
          ref={globeRef}
          globeImageUrl={GLOBE_IMAGE_URL}
          bumpImageUrl={BUMP_IMAGE_URL}
          backgroundImageUrl={BACKGROUND_IMAGE_URL}
          
          polygonsData={countries.features}
          polygonAltitude={0.005}
          polygonCapColor={() => 'rgba(0, 0, 0, 0)'}
          polygonSideColor={() => 'rgba(0, 0, 0, 0)'}
          polygonStrokeColor={() => 'rgba(255, 255, 255, 0.4)'}
          
          pointsData={rigs}
          pointLat="lat"
          pointLng="lng"
          pointColor={d => getRigColor(d.status)}
          pointAltitude={0.01}
          pointRadius={0.4}
          pointsMerge={false}
          pointLabel={d => `
            <div style="background: rgba(15, 23, 42, 0.9); padding: 12px; border-radius: 8px; color: white; font-family: Inter, sans-serif; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(8px);">
              <b style="font-size: 1.1em; color: #38bdf8;">${d.name || d.id}</b><br/>
              <div style="margin-top: 8px;">
                <span style="color: #94a3b8;">Operator:</span> ${d.operator || 'Unknown'}<br/>
                <span style="color: #94a3b8;">Region:</span> ${d.region}<br/>
                <span style="color: #94a3b8;">Status:</span> 
                  <span style="color: ${getRigColor(d.status)}; font-weight: bold;">${d.status.replace(/_/g, ' ')}</span><br/>
                <span style="color: #94a3b8;">Capacity:</span> ${d.production_capacity ? d.production_capacity.toLocaleString() : 'N/A'} BPD
              </div>
            </div>
          `}
        />
      </div>

      {/* Dashboard Overlay */}
      <div className="dashboard-container">
        
        {/* Top Metrics Panel */}
        <div className="metrics-panel">
          <div className="metric-card">
            <h3>WTI Crude Oil</h3>
            <div className="value">${metrics.wti_price.toFixed(2)}</div>
          </div>
          <div className="metric-card">
            <h3>Gasoline</h3>
            <div className="value">${metrics.gasoline.toFixed(2)}</div>
          </div>
          <div className="metric-card">
            <h3>Plastics Index</h3>
            <div className="value">${metrics.plastics.toFixed(2)}</div>
          </div>
          <div className="metric-card">
            <h3>Fertilizer Index</h3>
            <div className="value">${metrics.fertilizer.toFixed(2)}</div>
          </div>
        </div>

        {/* Right Sidebar Controls */}
        <div className="sidebar">
          <h2>Simulation Controls</h2>
          
          <div className="control-group">
            <label className="title">Deep Sea Mining Policy</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={deepMiningAllowed}
                  onChange={(e) => setDeepMiningAllowed(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: deepMiningAllowed ? '#38bdf8' : '#94a3b8', transition: 'color 0.3s' }}>
                {deepMiningAllowed ? "ALLOWED" : "RESTRICTED"}
              </span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
              {deepMiningAllowed 
                ? "Deep sea fields are active, increasing global supply." 
                : "Deep sea operations are locked, tightening global supply."}
            </div>
          </div>

          <div className="control-group">
            <label className="title">
              Global Demand Factor: <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{parseFloat(demandFactor).toFixed(2)}x</span>
            </label>
            <input 
              type="range" 
              min="0.5" 
              max="2.0" 
              step="0.05"
              value={demandFactor}
              onChange={(e) => setDemandFactor(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
              <span>Low (0.5x)</span>
              <span>High (2.0x)</span>
            </div>
          </div>

          <div className="control-group">
            <label className="title">Custom Rig Injection (What-If Scenario)</label>
            <input 
              type="number" 
              className="glass-input"
              min="0"
              value={manualRigIncrease}
              onChange={(e) => setManualRigIncrease(e.target.value)}
              placeholder="0"
            />
            <div style={{ marginTop: '12px', fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.4' }}>
              Inject extra active rigs into global supply to test extreme ML scenarios (e.g. 100 or 1000).
            </div>
          </div>
          
          <div style={{ marginTop: '40px', padding: '16px', background: 'rgba(56, 189, 248, 0.1)', borderLeft: '4px solid #38bdf8', borderRadius: '8px', fontSize: '0.85rem', color: '#e2e8f0', lineHeight: '1.5' }}>
            <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '8px' }}>🤖 ML Integration Active</strong>
            Adjusting these controls runs live inference against the trained Random Forest model.
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
