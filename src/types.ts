export interface SoilInput {
  n: number;
  p: number;
  k: number;
  ph: number;
}

export type CropCategory = 'Cereal' | 'Pulse' | 'Fruit' | 'Commercial' | 'Legume' | 'Vegetable';

export interface CropProfile {
  id: string;
  name: string;
  emoji: string;
  category: CropCategory;
  description: string;
  idealN: [number, number];
  idealP: [number, number];
  idealK: [number, number];
  idealPh: [number, number];
  tempRange: [number, number]; // in °C
  rainfallRange: [number, number]; // in mm
  humidityRange: [number, number]; // in %
  waterRequirement: 'Low' | 'Medium' | 'High' | 'Very High';
  season: string;
  soilType: string;
  growthDuration: string;
  plantingMethod: string;
  majorPests: string[];
  harvestIndicators: string[];
  tips: string[];
}

export interface ParameterSuitability {
  status: 'low' | 'optimal' | 'high';
  score: number; // 0 to 100
  feedback: string;
  difference: number;
}

export interface PredictionResult {
  crop: CropProfile;
  confidence: number; // 0-100%
  overallScore: number;
  runnersUp: {
    crop: CropProfile;
    score: number;
    confidence: number;
  }[];
  soilHealthAssessment: {
    npkBalance: 'Balanced' | 'Nitrogen-Deficient' | 'Phosphorus-Deficient' | 'Potassium-Deficient' | 'High-Fertility';
    phNature: 'Strongly Acidic' | 'Moderately Acidic' | 'Neutral (Optimal)' | 'Moderately Alkaline' | 'Strongly Alkaline';
    suitability: {
      n: ParameterSuitability;
      p: ParameterSuitability;
      k: ParameterSuitability;
      ph: ParameterSuitability;
    };
    recommendationSummary: string;
  };
}

export interface SoilPreset {
  id: string;
  name: string;
  region: string;
  description: string;
  values: SoilInput;
  tag: string;
}

export interface SavedSoilRecord {
  id: string;
  plotName: string;
  location?: string;
  date: string;
  input: SoilInput;
  recommendedCrop: string;
  cropEmoji: string;
  category: CropCategory;
  confidence: number;
  notes?: string;
}

export interface FertilizerRecommendation {
  nutrient: 'Nitrogen (N)' | 'Phosphorus (P₂O₅)' | 'Potassium (K₂O)' | 'Soil pH Correction';
  status: 'Deficit' | 'Balanced' | 'Excess';
  deficitAmount: number; // in kg/ha
  primarySource: string;
  ratePerHectare: number; // in kg
  ratePerAcre: number; // in kg
  applicationTiming: string;
  notes: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}
