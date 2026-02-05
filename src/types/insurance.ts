// Insurance application types and interfaces

export type InsuranceType = 'tech-eo' | 'dno' | 'cyber' | 'epli' | 'fiduciary' | 'crime';

export type ApplicationStatus = 'draft' | 'submitted' | 'under-review' | 'approved' | 'denied' | 'more-info-needed';

export interface CompanyInformation {
  legalName: string;
  dba?: string;
  businessStructure: 'llc' | 'corporation' | 's-corp' | 'partnership' | 'sole-proprietorship' | 'other';
  yearEstablished: number;
  numberOfEmployees: number;
  annualRevenue: number;
  website: string;
  industry: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface ContactInformation {
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  billingContact?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface CoverageDetails {
  requestedLimits: number;
  requestedDeductible: number;
  effectiveDate: string;
  expirationDate: string;
  priorCoverage: boolean;
  priorCarrier?: string;
  priorPolicyNumber?: string;
  claimsHistory: {
    hasClaimsHistory: boolean;
    claims?: {
      date: string;
      description: string;
      amount: number;
      status: string;
    }[];
  };
}

// Tech E&O Specific Fields
export interface TechEOSpecificData {
  productsServices: string[];
  technologyStack: string[];
  softwareType: 'saas' | 'on-premise' | 'mobile' | 'web' | 'embedded' | 'other';
  dataHandling: {
    handlesPII: boolean;
    handlesPaymentData: boolean;
    dataEncryption: boolean;
    gdprCompliant: boolean;
  };
  securityMeasures: {
    hasPenetrationTesting: boolean;
    hasSecurityAudit: boolean;
    hasCyberInsurance: boolean;
    hasIncidentResponsePlan: boolean;
  };
  developmentPractices: {
    hasQA: boolean;
    hasStagingEnvironment: boolean;
    codeReviewProcess: boolean;
    automatedTesting: boolean;
  };
  clientContracts: {
    typicalContractValue: number;
    largestContractValue: number;
    hasWrittenContracts: boolean;
    hasIndemnificationClauses: boolean;
  };
}

// D&O Specific Fields
export interface DNOSpecificData {
  governance: {
    boardSize: number;
    independentDirectors: number;
    hasAuditCommittee: boolean;
    hasCompensationCommittee: boolean;
  };
  financials: {
    isPubliclyTraded: boolean;
    tickerSymbol?: string;
    hasExternalAudit: boolean;
    isprofitable: boolean;
  };
  ownership: {
    ownershipStructure: string;
    majorShareholders: string;
    hasVCBacking: boolean;
    vcFirms?: string[];
  };
  compliance: {
    hasComplianceOfficer: boolean;
    hasCodeOfConduct: boolean;
    hasWhistleblowerPolicy: boolean;
  };
}

// Cyber Specific Fields
export interface CyberSpecificData {
  dataProfile: {
    recordsStored: number;
    typesOfData: string[];
    dataLocations: string[];
  };
  securityInfrastructure: {
    hasFirewall: boolean;
    hasIDS: boolean;
    hasEncryption: boolean;
    hasMultiFactorAuth: boolean;
    hasSIEM: boolean;
  };
  incidentHistory: {
    hasBreachHistory: boolean;
    breaches?: {
      date: string;
      impact: string;
      recordsAffected: number;
    }[];
  };
  businessContinuity: {
    hasDisasterRecoveryPlan: boolean;
    hasBackupSystem: boolean;
    backupFrequency: string;
  };
  compliance: {
    certifications: string[];
    regulatoryRequirements: string[];
  };
}

// EPLI Specific Fields
export interface EPLISpecificData {
  workforce: {
    fullTimeEmployees: number;
    partTimeEmployees: number;
    contractors: number;
    locations: string[];
  };
  hrPractices: {
    hasHRDepartment: boolean;
    hasEmployeeHandbook: boolean;
    hasAntiHarassmentPolicy: boolean;
    providesDiversityTraining: boolean;
  };
  employmentHistory: {
    hasEEOCClaims: boolean;
    claims?: {
      date: string;
      type: string;
      outcome: string;
    }[];
    turnoverRate: number;
  };
}

// Main Application Interface
export interface InsuranceApplication {
  id: string;
  userId: string;
  insuranceType: InsuranceType;
  status: ApplicationStatus;
  
  // Common information
  companyInfo: CompanyInformation;
  contactInfo: ContactInformation;
  coverageDetails: CoverageDetails;
  
  // Type-specific data (only one will be populated)
  specificData?: TechEOSpecificData | DNOSpecificData | CyberSpecificData | EPLISpecificData;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  lastSavedStep: number;
  
  // Notes and attachments
  notes?: string;
  attachments?: string[];
  
  // Admin/Agent fields
  assignedAgent?: string;
  agentNotes?: string;
}

// Form step configuration
export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields?: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date' | 'multi-select' | 'currency';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternMessage?: string;
    message?: string;
  };
  dependsOn?: {
    field: string;
    value: any;
  };
  helperText?: string;
}

export interface InsuranceTypeConfig {
  id: InsuranceType;
  name: string;
  description: string;
  icon: string;
  commonSteps: FormStep[];
  specificSteps: FormStep[];
}
