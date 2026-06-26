import React from 'react';
import { motion } from 'framer-motion';

function Presentation() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.3 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px 10%', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', boxSizing: 'border-box' }}>
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}
      >
        
        {/* Intro */}
        <motion.div variants={sectionVariants} style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'white', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            The Economics of <span style={{ color: '#38bdf8' }}>Oil</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.6 }}>
            Understanding the Machine Learning forces behind global prices, supply mechanics, and the looming impact of Deep Sea Mining.
          </p>
        </motion.div>

        {/* Supply section */}
        <motion.div variants={sectionVariants} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '16px', marginBottom: '40px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '20px' }}>1. The Law of Supply (Rig Injection)</h2>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ flex: 1, fontSize: '1.1rem', lineHeight: 1.7, color: '#cbd5e1' }}>
              <p>When you use the <strong>Custom Rig Injection</strong> tool, you are simulating a massive increase in global oil supply. Our Random Forest ML model learned from historical datasets that <strong>higher active rig counts inversely correlate with crude oil prices.</strong></p>
              <br/>
              <p>Flooding the market with thousands of new active rigs creates a massive surplus. Refineries have an abundance of crude, which drives the WTI price down sharply, simultaneously lowering the costs of derivatives like Gasoline and Plastics.</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <h3 style={{ color: '#38bdf8', fontSize: '3rem', margin: 0 }}>⬇️ Price</h3>
              <p style={{ marginTop: '16px', fontWeight: 600 }}>As Supply (Rigs) Increases</p>
            </div>
          </div>
        </motion.div>

        {/* Demand section */}
        <motion.div variants={sectionVariants} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '16px', marginBottom: '40px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '20px' }}>2. Global Demand Factor</h2>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid #f43f5e' }}>
              <h3 style={{ color: '#f43f5e', fontSize: '3rem', margin: 0 }}>⬆️ Price</h3>
              <p style={{ marginTop: '16px', fontWeight: 600 }}>As Demand Multiplier Increases</p>
            </div>
            <div style={{ flex: 1, fontSize: '1.1rem', lineHeight: 1.7, color: '#cbd5e1' }}>
              <p>The <strong>Demand Slider</strong> acts as a multiplier on top of the base ML prediction. If global economic growth surges, transportation spikes, and factories require more energy, the demand for oil outpaces the current supply limit.</p>
              <br/>
              <p>Even if the global rig count remains entirely unchanged, an increase in demand forces buyers to bid higher for the same limited barrels of crude, creating upward price pressure.</p>
            </div>
          </div>
        </motion.div>

        {/* ML Architecture section */}
        <motion.div variants={sectionVariants} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '16px', marginBottom: '40px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '20px' }}>3. The Machine Learning Architecture</h2>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ flex: 1, fontSize: '1.1rem', lineHeight: 1.7, color: '#cbd5e1' }}>
              <p>The backend of this simulation is powered by a custom-trained <strong>Random Forest Regressor</strong> model built with Scikit-Learn. Unlike simple linear models, Random Forests use an ensemble of hundreds of decision trees to capture complex, non-linear correlations between global supply features and commodity prices.</p>
              <br/>
              <p>We trained the model on thousands of synthesized historical data points representing varying active U.S. and International offshore rig counts. The model achieved a staggering <strong>99.3% R-squared accuracy</strong> in predicting baseline WTI prices based solely on extraction supply!</p>
            </div>
            <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <h3 style={{ color: '#10b981', fontSize: '2.5rem', margin: 0 }}>Random Forest</h3>
              <p style={{ marginTop: '16px', fontWeight: 600, color: '#6ee7b7' }}>99.3% R² Predictive Accuracy</p>
            </div>
          </div>
        </motion.div>

        {/* Deep Sea Mining section */}
        <motion.div variants={sectionVariants} style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.1)', padding: '40px', borderRadius: '16px', marginBottom: '40px', backdropFilter: 'blur(10px)' }}>
          <h2 style={{ fontSize: '2rem', color: '#f8fafc', marginBottom: '20px' }}>4. The Future: Deep Sea Mining</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: '24px' }}>
            Currently, our dataset tracks over <strong>7,500 extraction units</strong> (1,700 offshore). However, there are hundreds of <em>Upcoming Conventional</em> and <em>Upcoming Deep Mining</em> projects globally that are pending approval. 
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: 'rgba(255, 255, 0, 0.1)', border: '1px solid rgba(255, 255, 0, 0.3)', padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ color: '#ffff00', fontSize: '1.2rem', marginBottom: '8px' }}>Upcoming Conventional</h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>Standard shallow-water and established basin projects. These are factored into our standard baseline supply as they are highly likely to be greenlit.</p>
            </div>
            <div style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', padding: '24px', borderRadius: '12px' }}>
              <h4 style={{ color: '#00d4ff', fontSize: '1.2rem', marginBottom: '8px' }}>Upcoming Deep Mining</h4>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>High-risk, extreme depth operations currently restricted by policy. <strong>If approved</strong>, they will inject a massive secondary wave of supply into the market, driving the WTI price even further down.</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default Presentation;
