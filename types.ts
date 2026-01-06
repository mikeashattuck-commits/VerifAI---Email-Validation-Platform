export enum ValidationStatus {
  IDLE = 'IDLE',
  VALIDATING = 'VALIDATING',
  VALID = 'VALID',
  INVALID = 'INVALID',
  WARNING = 'WARNING'
}

export interface MxRecord {
  exchange: string;
  priority: number;
}

export interface VerificationResult {
  email: string;
  user: string;
  domain: string;
  formatValid: boolean;
  mxFound: boolean;
  disposable: boolean;
  roleAccount: boolean;
  didYouMean?: string;
  score: number; // 0 to 100
  aiAnalysis?: string;
  mxRecords?: string[];
  status: ValidationStatus;
}

export interface DnsResponse {
  Status: number;
  Answer?: {
    name: string;
    type: number;
    TTL: number;
    data: string;
  }[];
}

export type ViewState = 'HOME' | 'DASHBOARD' | 'DOCS';