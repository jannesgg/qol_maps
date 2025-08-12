import { AreaData, CrimeData, EducationData, IncomeData } from '../types';

// Gothenburg coordinates
export const GOTHENBURG_CENTER: [number, number] = [11.9746, 57.7089];

// Mock area data for Gothenburg districts
export const areaData: AreaData[] = [
  {
    id: 'centrum',
    name: 'Centrum',
    geometry: null, // Will be loaded from GeoJSON
    crimeLevel: 45,
    tertiaryEducation: 78,
    medianIncome: 420000,
    population: 45000,
    area: 2.1
  },
  {
    id: 'haga',
    name: 'Haga',
    geometry: null,
    crimeLevel: 35,
    tertiaryEducation: 82,
    medianIncome: 380000,
    population: 12000,
    area: 0.8
  },
  {
    id: 'linnégatan',
    name: 'Linnégatan',
    geometry: null,
    crimeLevel: 25,
    tertiaryEducation: 85,
    medianIncome: 450000,
    population: 18000,
    area: 1.2
  },
  {
    id: 'vasastan',
    name: 'Vasastan',
    geometry: null,
    crimeLevel: 30,
    tertiaryEducation: 80,
    medianIncome: 410000,
    population: 25000,
    area: 1.8
  },
  {
    id: 'olskroken',
    name: 'Olskroken',
    geometry: null,
    crimeLevel: 55,
    tertiaryEducation: 65,
    medianIncome: 320000,
    population: 22000,
    area: 1.5
  },
  {
    id: 'angered',
    name: 'Angered',
    geometry: null,
    crimeLevel: 75,
    tertiaryEducation: 45,
    medianIncome: 280000,
    population: 35000,
    area: 3.2
  },
  {
    id: 'bergsjön',
    name: 'Bergsjön',
    geometry: null,
    crimeLevel: 70,
    tertiaryEducation: 50,
    medianIncome: 290000,
    population: 28000,
    area: 2.8
  },
  {
    id: 'kortedala',
    name: 'Kortedala',
    geometry: null,
    crimeLevel: 60,
    tertiaryEducation: 55,
    medianIncome: 310000,
    population: 32000,
    area: 2.5
  },
  {
    id: 'torslanda',
    name: 'Torslanda',
    geometry: null,
    crimeLevel: 40,
    tertiaryEducation: 70,
    medianIncome: 360000,
    population: 15000,
    area: 4.1
  },
  {
    id: 'mölndal',
    name: 'Mölndal',
    geometry: null,
    crimeLevel: 35,
    tertiaryEducation: 75,
    medianIncome: 390000,
    population: 42000,
    area: 5.2
  }
];

export const crimeData: CrimeData[] = [
  { areaId: 'centrum', crimeType: 'Theft', count: 1250, year: 2023 },
  { areaId: 'centrum', crimeType: 'Assault', count: 180, year: 2023 },
  { areaId: 'centrum', crimeType: 'Vandalism', count: 320, year: 2023 },
  { areaId: 'haga', crimeType: 'Theft', count: 450, year: 2023 },
  { areaId: 'haga', crimeType: 'Assault', count: 45, year: 2023 },
  { areaId: 'linnégatan', crimeType: 'Theft', count: 280, year: 2023 },
  { areaId: 'linnégatan', crimeType: 'Assault', count: 25, year: 2023 },
  { areaId: 'vasastan', crimeType: 'Theft', count: 520, year: 2023 },
  { areaId: 'vasastan', crimeType: 'Assault', count: 65, year: 2023 },
  { areaId: 'olskroken', crimeType: 'Theft', count: 890, year: 2023 },
  { areaId: 'olskroken', crimeType: 'Assault', count: 120, year: 2023 },
  { areaId: 'angered', crimeType: 'Theft', count: 1450, year: 2023 },
  { areaId: 'angered', crimeType: 'Assault', count: 280, year: 2023 },
  { areaId: 'bergsjön', crimeType: 'Theft', count: 1200, year: 2023 },
  { areaId: 'bergsjön', crimeType: 'Assault', count: 220, year: 2023 },
  { areaId: 'kortedala', crimeType: 'Theft', count: 980, year: 2023 },
  { areaId: 'kortedala', crimeType: 'Assault', count: 150, year: 2023 },
  { areaId: 'torslanda', crimeType: 'Theft', count: 320, year: 2023 },
  { areaId: 'torslanda', crimeType: 'Assault', count: 35, year: 2023 },
  { areaId: 'mölndal', crimeType: 'Theft', count: 680, year: 2023 },
  { areaId: 'mölndal', crimeType: 'Assault', count: 85, year: 2023 }
];

export const educationData: EducationData[] = [
  { areaId: 'centrum', educationLevel: 'Tertiary', percentage: 78, year: 2023 },
  { areaId: 'haga', educationLevel: 'Tertiary', percentage: 82, year: 2023 },
  { areaId: 'linnégatan', educationLevel: 'Tertiary', percentage: 85, year: 2023 },
  { areaId: 'vasastan', educationLevel: 'Tertiary', percentage: 80, year: 2023 },
  { areaId: 'olskroken', educationLevel: 'Tertiary', percentage: 65, year: 2023 },
  { areaId: 'angered', educationLevel: 'Tertiary', percentage: 45, year: 2023 },
  { areaId: 'bergsjön', educationLevel: 'Tertiary', percentage: 50, year: 2023 },
  { areaId: 'kortedala', educationLevel: 'Tertiary', percentage: 55, year: 2023 },
  { areaId: 'torslanda', educationLevel: 'Tertiary', percentage: 70, year: 2023 },
  { areaId: 'mölndal', educationLevel: 'Tertiary', percentage: 75, year: 2023 }
];

export const incomeData: IncomeData[] = [
  { areaId: 'centrum', incomeType: 'Median', amount: 420000, year: 2023 },
  { areaId: 'haga', incomeType: 'Median', amount: 380000, year: 2023 },
  { areaId: 'linnégatan', incomeType: 'Median', amount: 450000, year: 2023 },
  { areaId: 'vasastan', incomeType: 'Median', amount: 410000, year: 2023 },
  { areaId: 'olskroken', incomeType: 'Median', amount: 320000, year: 2023 },
  { areaId: 'angered', incomeType: 'Median', amount: 280000, year: 2023 },
  { areaId: 'bergsjön', incomeType: 'Median', amount: 290000, year: 2023 },
  { areaId: 'kortedala', incomeType: 'Median', amount: 310000, year: 2023 },
  { areaId: 'torslanda', incomeType: 'Median', amount: 360000, year: 2023 },
  { areaId: 'mölndal', incomeType: 'Median', amount: 390000, year: 2023 }
]; 