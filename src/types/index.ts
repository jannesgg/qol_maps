export interface AreaData {
  id: string;
  name: string;
  geometry: any;
  crimeLevel: number; // 0-100 scale
  tertiaryEducation: number; // percentage
  medianIncome: number; // SEK
  population: number;
  area: number; // km²
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  style: string;
}

export interface CrimeData {
  areaId: string;
  crimeType: string;
  count: number;
  year: number;
}

export interface EducationData {
  areaId: string;
  educationLevel: string;
  percentage: number;
  year: number;
}

export interface IncomeData {
  areaId: string;
  incomeType: string;
  amount: number;
  year: number;
} 