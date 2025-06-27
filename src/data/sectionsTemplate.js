export const sectionsTemplate = {
  'A. Molecules & Redox Couples': [
    { name: 'Active species name(s)', required: true },
    { name: 'Molecular structure (sketch or SMILES)', required: true },
    { name: 'Molecular weight (g mol⁻¹)', required: true },
    { name: 'Purity (%)', required: false },
    { name: 'Supplier / synthesis route', required: false },
    { name: 'Redox reaction (half-cell)', required: true },
    { name: 'Standard redox potential (E° vs. SHE)', required: true }
  ],
  'B. Electrolyte Formulation': [
    { name: 'Posolyte active species', required: true },
    { name: 'Negolyte active species', required: true },
    { name: 'Supporting electrolyte', required: true },
    { name: 'Additives', required: false },
    { name: 'Total electrolyte volume', required: false }
  ],
  'C. Physicochemical Properties': [
    { name: 'Density (g cm⁻³)', required: false },
    { name: 'Viscosity (mPa s)', required: false },
    { name: 'Conductivity (S cm⁻¹)', required: true },
    { name: 'pH', required: true },
    { name: 'UV/Vis λₘₐₓ (nm)', required: false },
    { name: 'Nernst potential', required: true }
  ],
  'D. Flow-Cell Design & Materials': [
    { name: 'Cell geometry', required: true },
    { name: 'Active area (cm²)', required: true },
    { name: 'Membrane type/composition', required: true },
    { name: 'Electrode material', required: true },
    { name: 'Flow frame / distributor', required: false },
    { name: 'Current collectors', required: false },
    { name: 'Stack compression force', required: false }
  ],
  'E. Operating Conditions': [
    { name: 'Temperature (°C)', required: true },
    { name: 'Flow rate (mL min⁻¹)', required: true },
    { name: 'Current density (mA cm⁻²)', required: true },
    { name: 'Voltage cut-offs (V)', required: true },
    { name: 'Cycle protocol', required: false },
    { name: 'Number of cycles', required: false }
  ],
  'F. Characterization Methods': [
    { name: 'UV/Vis spectroscopy', required: false },
    { name: 'Electrochemical impedance spectroscopy', required: false },
    { name: 'NMR spectroscopy', required: false },
    { name: 'Mass spectrometry', required: false },
    { name: 'pH sensor', required: false },
    { name: 'Pressure sensors', required: false }
  ],
  'G. State-of-Charge (SOC) Metrics': [
    { name: 'Coulomb counting', required: false },
    { name: 'Spectroscopic (UV/Vis)', required: false },
    { name: 'Electrochemical (OCV)', required: false }
  ],
  'H. State-of-Health (SOH) Metrics': [
    { name: 'Capacity retention', required: true },
    { name: 'Electrolyte composition', required: false }
  ],
  'I. Electrolyte Degradation': [
    { name: 'Side-reactions (e.g. O₂ evolution)', required: false },
    { name: 'Crossover / imbalances', required: false },
    { name: 'Precipitation', required: false }
  ],
  'J. Performance & Efficiencies': [
    { name: 'Coulombic efficiency (%)', required: true },
    { name: 'Voltage efficiency (%)', required: true },
    { name: 'Energy efficiency (%)', required: true },
    { name: 'Round-trip efficiency (%)', required: false },
    { name: 'Power density (W cm⁻²)', required: false },
    { name: 'Capacity utilization (%)', required: false }
  ],
  'K. Operation & Regeneration Strategies': [
    { name: 'Electrolyte rebalancing', required: false },
    { name: 'Electrochemical reconditioning', required: false },
    { name: 'BMS-controlled temp. cycling', required: false }
  ],
  'L. Battery Management System (BMS)': [
    { name: 'SOC tracking', required: true },
    { name: 'Temperature control', required: true },
    { name: 'Safety cut-offs', required: true },
    { name: 'Data logging', required: false }
  ]
};
