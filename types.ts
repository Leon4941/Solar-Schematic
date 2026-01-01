
export interface SolarData {
  billAmount: number;
  afaRate: number;
  estimatedUsage: number; // B
  solarGeneration: number; // C
  morningUsage: number; // D
  exportedToGrid: number; // E (Effective Capped Value)
  excessSolarExport: number; // Burned energy
  importedFromGrid: number; // F
  systemSize: number;
  panelCount: number;
  totalSaving: number; // Added field for estimated monthly savings
}

export interface CalculationResult {
  usageCost: number;
  capacityCost: number;
  networkCost: number;
  afaCost: number;
  retailCharge: number;
  kwtbbCost: number;
  sstCost: number;
  eeiCost: number;
  totalBill: number;
  unitRate: number;
}
