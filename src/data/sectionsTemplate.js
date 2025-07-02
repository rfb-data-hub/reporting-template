export const sectionsTemplate = {
  'A. Molecules & Redox Couples': {
    essential: true,
    fields: [
      { name: 'Active species name(s)', essential: true },
      { name: 'Molecular structure (sketch or SMILES)', essential: true },
      { name: 'Molecular weight (g mol⁻¹)', essential: true },
      { name: 'Purity (%)', essential: false },
      { name: 'Supplier / synthesis route', essential: false },
      { name: 'Redox reaction (half-cell)', essential: true },
      { name: 'Standard redox potential (E° vs. SHE)', essential: true }
    ]
  },
  'B. Electrolyte Formulation': {
    essential: true,
    fields: [
      { name: 'Posolyte active species', essential: true },
      { name: 'Negolyte active species', essential: true },
      { name: 'Supporting electrolyte', essential: true },
      { name: 'Additives', essential: false },
      { name: 'Total electrolyte volume', essential: false }
    ]
  },
  'C. Physicochemical Properties': {
    essential: false,
    fields: [
      { name: 'Density (g cm⁻³)', essential: false },
      { name: 'Viscosity (mPa s)', essential: false },
      { name: 'Conductivity (S cm⁻¹)', essential: true },
      { name: 'pH', essential: true },
      { name: 'UV/Vis λₘₐₓ (nm)', essential: false },
      { name: 'Nernst potential', essential: true }
    ]
  },
  'D. Flow-Cell Design & Materials': {
    essential: true,
    fields: [
      { name: 'Cell geometry', essential: true },
      { name: 'Active area (cm²)', essential: true },
      { name: 'Membrane type/composition', essential: true },
      { name: 'Electrode material', essential: true },
      { name: 'Flow frame / distributor', essential: false },
      { name: 'Current collectors', essential: false },
      { name: 'Stack compression force', essential: false }
    ]
  },
  'E. Operating Conditions': {
    essential: true,
    fields: [
      { name: 'Temperature (°C)', essential: true },
      { name: 'Flow rate (mL min⁻¹)', essential: true },
      { name: 'Current density (mA cm⁻²)', essential: true },
      { name: 'Voltage cut-offs (V)', essential: true },
      { name: 'Cycle protocol', essential: false },
      { name: 'Number of cycles', essential: false }
    ]
  },
  'F. Characterization Methods': {
    essential: false,
    fields: [
      { name: 'UV/Vis spectroscopy', essential: false },
      { name: 'Electrochemical impedance spectroscopy', essential: false },
      { name: 'NMR spectroscopy', essential: false },
      { name: 'Mass spectrometry', essential: false },
      { name: 'pH sensor', essential: false },
      { name: 'Pressure sensors', essential: false }
    ]
  },
  'G. State-of-Charge (SOC) Metrics': {
    essential: false,
    fields: [
      { name: 'Coulomb counting', essential: false },
      { name: 'Spectroscopic (UV/Vis)', essential: false },
      { name: 'Electrochemical (OCV)', essential: false }
    ]
  },
  'H. State-of-Health (SOH) Metrics': {
    essential: false,
    fields: [
      { name: 'Capacity retention', essential: true },
      { name: 'Electrolyte composition', essential: false }
    ]
  },
  'I. Electrolyte Degradation': {
    essential: false,
    fields: [
      { name: 'Side-reactions (e.g. O₂ evolution)', essential: false },
      { name: 'Crossover / imbalances', essential: false },
      { name: 'Precipitation', essential: false }
    ]
  },
  'J. Performance & Efficiencies': {
    essential: true,
    fields: [
      { name: 'Coulombic efficiency (%)', essential: true },
      { name: 'Voltage efficiency (%)', essential: true },
      { name: 'Energy efficiency (%)', essential: true },
      { name: 'Round-trip efficiency (%)', essential: false },
      { name: 'Power density (W cm⁻²)', essential: false },
      { name: 'Capacity utilization (%)', essential: false }
    ]
  },
  'K. Operation & Regeneration Strategies': {
    essential: false,
    fields: [
      { name: 'Electrolyte rebalancing', essential: false },
      { name: 'Electrochemical reconditioning', essential: false },
      { name: 'BMS-controlled temp. cycling', essential: false }
    ]
  },
  'L. Battery Management System (BMS)': {
    essential: false,
    fields: [
      { name: 'SOC tracking', essential: true },
      { name: 'Temperature control', essential: true },
      { name: 'Safety cut-offs', essential: true },
      { name: 'Data logging', essential: false }
    ]
  }
};
