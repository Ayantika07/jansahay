export type Language = 'en' | 'hi' | 'bn';

export type SchemeCategory = 
  | 'Agriculture'
  | 'Education'
  | 'Women & Child'
  | 'Healthcare'
  | 'Housing'
  | 'Employment'
  | 'Social Security'
  | 'Financial Inclusion';

export interface Scheme {
  id: string;
  name: {
    en: string;
    hi: string;
    bn: string;
  };
  slug: string;
  category: SchemeCategory;
  ministry: string;
  state: string; // 'All India' or specific state
  shortDescription: {
    en: string;
    hi: string;
    bn: string;
  };
  description: {
    en: string;
    hi: string;
    bn: string;
  };
  benefits: {
    en: string[];
    hi: string[];
    bn: string[];
  };
  eligibilitySummary: {
    en: string;
    hi: string;
    bn: string;
  };
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number; // Annual income in INR
    occupation?: string[]; // e.g. ['farmer', 'student', 'vendor', 'artisan']
    gender?: 'All' | 'Female' | 'Male';
    targetGroup?: string[]; // e.g. ['Senior Citizen', 'Student', 'Farmer', 'Woman', 'BPL']
    states?: string[];
    isStudent?: boolean;
  };
  documentsRequired: {
    en: string[];
    hi: string[];
    bn: string[];
  };
  applicationProcess: {
    en: string[];
    hi: string[];
    bn: string[];
  };
  officialUrl: string;
  applicationUrl: string;
  isPopular?: boolean;
}

export interface EligibilityInput {
  age: number;
  gender: string;
  state: string;
  occupation: string;
  annualIncome: number;
  isStudent: boolean;
  isFarmer: boolean;
  isSeniorCitizen: boolean;
  isBPL: boolean;
  category: string; // General, OBC, SC, ST
}

export interface EligibilityResult {
  scheme: Scheme;
  status: 'Eligible' | 'Possibly Eligible' | 'Not Eligible';
  score: number; // 0 - 100
  reasons: string[];
}

export type GrievanceStatus = 'Submitted' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved';

export interface Grievance {
  id: string;
  referenceId: string; // e.g., JAN-2026-482019
  name: string;
  email: string;
  phone: string;
  department: string;
  category: string;
  subject: string;
  description: string;
  status: GrievanceStatus;
  createdAt: string;
  updatedAt: string;
  timeline: {
    status: GrievanceStatus;
    timestamp: string;
    note: string;
  }[];
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  state?: string;
  occupation?: string;
  savedSchemes?: string[]; // Scheme IDs
  token?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  language: Language;
  timestamp: string;
  schemeContext?: {
    id: string;
    name: string;
  };
}
