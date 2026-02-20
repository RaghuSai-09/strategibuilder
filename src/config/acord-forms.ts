// ACORD Form configuration - defines available forms and PDF field mappings

export interface AcordFormConfig {
    id: string;
    insuranceType: string;
    formName: string;
    acordNumber: string;
    fileName: string;
    downloadPath: string;
    description: string;
    icon: string;
    color: string;
    bgColor: string;
    borderColor: string;
    pageCount: number;
    // Maps meaningful labels to PDF field names for display
    fieldLabels: Record<string, string>;
}

// Human-readable labels for the generic PDF field names in the Tech E&O form
const techEOFieldLabels: Record<string, string> = {
    // Page 1 - Company Information
    'Text1': 'Named Insured / Applicant Name',
    'Text2': 'DBA (Doing Business As)',
    'Text3': 'Mailing Address',
    'Text4': 'City',
    'Text5': 'State',
    'Text6': 'Zip Code',
    'Text7': 'Website',
    'Check Box8': 'Corporation',
    'Check Box9': 'LLC',
    'Check Box10': 'Partnership',
    'Check Box11': 'Other Entity Type',
    'Text12': 'Other Entity Type Description',
    'Text13': 'State of Incorporation',
    'Text14': 'Year Established',
    'Text15': 'FEIN / Tax ID',
    'Text16': 'SIC Code',
    'Text17': 'NAICS Code',
    'Text18': 'Contact Name',
    'Text19': 'Contact Title',
    'Text20': 'Contact Phone',
    'Text21': 'Contact Email',
    'Text22': 'Nature of Business / Description',
    'Text23': 'Number of Employees',
    'Text24': 'Annual Revenue',

    // Coverage Information
    'Check Box25': 'New Policy',
    'Check Box26': 'Renewal Policy',
    'Text27': 'Current Carrier',
    'Text28': 'Current Policy Number',
    'Check Box29': 'E&O / Professional Liability',
    'Check Box30': 'Cyber Liability',
    'Check Box31': 'Media Liability',
    'Check Box32': 'Technology Products',

    // Revenue breakdown
    'Text34': 'Products Revenue',
    'Text35': 'Services Revenue',
    'Text36': 'Consulting Revenue',
    'Text37': 'Outsourcing Revenue',
    'Text38': 'Other Revenue',
    'Check Box39': 'Government Contracts',
    'Text40': 'Government Contract Details',

    // Operations
    'Check Box41': 'Cloud Services',
    'Check Box42': 'SaaS Provider',
    'Check Box43': 'Managed Services',
    'Text44': 'Number of Clients',
    'Text45': 'Largest Client Revenue %',
    'Text46': 'Top 5 Clients Revenue %',
    'Text47': 'Description of Services',
    'Text48': 'Subcontractor Details',

    // Security Questions
    'Check Box49': 'Written Information Security Policy - Yes',
    'Check Box50': 'Written Information Security Policy - No',
    'Text51': 'Security Policy Details',
    'Check Box52': 'Firewall - Yes',
    'Check Box53': 'Firewall - No',
    'Check Box54': 'Antivirus - Yes',
    'Check Box55': 'Antivirus - No',
    'Check Box56': 'Encryption - Yes',
    'Check Box57': 'Encryption - No',
    'Check Box58': 'Intrusion Detection - Yes',
    'Check Box59': 'Intrusion Detection - No',
    'Check Box60': 'Access Controls - Yes',
    'Check Box61': 'Access Controls - No',
    'Email sec provider': 'Email Security Provider',
    'Text62': 'Email Security Details',
    'Check Box63': 'Backup Procedures - Yes',
    'Check Box64': 'Backup Procedures - No',
    'Check Box65': 'Backup Offsite - Yes',
    'Check Box66': 'Backup Offsite - No',
    'Check Box67': 'Backup Tested - Yes',
    'Check Box68': 'Backup Tested - No',

    // MFA & Authentication
    'MFA provider': 'MFA Provider',
    'MFA': 'MFA Enabled',
    'MFA type': 'MFA Type',
    'Text69': 'MFA Details',
    'Text70': 'Authentication Details',
    'Check Box71': 'Remote Access Secured - Yes',
    'Check Box72': 'Remote Access Secured - No',

    // Endpoint Security
    'Check Box74': 'Endpoint Protection - Yes',
    'Check Box75': 'Endpoint Protection - No',
    'Check Box76': 'Patch Management - Yes',
    'Check Box77': 'Patch Management - No',
    'Check Box78': 'Vulnerability Scanning - Yes',
    'Check Box79': 'Vulnerability Scanning - No',
    'NGAV provider': 'Next-Gen Antivirus Provider',
    'Text80': 'NGAV Details',
    'Check Box81': 'EDR Deployed - Yes',
    'Check Box82': 'EDR Deployed - No',
    'EDR provider': 'EDR Provider',
    'Text83': 'EDR Details',

    // Security Operations
    'Check Box84': 'Penetration Testing - Yes',
    'Check Box85': 'Penetration Testing - No',
    'Check Box86': 'Annual Pen Test',
    'Check Box87': 'Semi-Annual Pen Test',
    'Check Box88': 'Quarterly Pen Test',
    'Check Box89': 'Security Training - Yes',
    'Check Box90': 'Security Training - No',
    'Check Box91': 'Incident Response Plan - Yes',
    'Check Box92': 'Incident Response Plan - No',
    'Check Box94': 'IR Plan Tested - Yes',

    // Privileged Access
    'Text95': 'Privileged Access Details',
    'Check Box96': 'PAM Solution - Yes',
    'Check Box97': 'PAM Solution - No',
    'Check Box98': 'Segregation of Duties - Yes',
    'Check Box99': 'Segregation of Duties - No',
    'Check Box100': 'Least Privilege - Yes',
    'Text101': 'Access Control Details',

    // Development & QA
    'Check Box102': 'SDLC Process - Yes',
    'Check Box103': 'SDLC Process - No',
    'Check Box104': 'Code Review - Yes',
    'tool_provider': 'Development Tool Provider',
    'Text105': 'Development Tool Details',
    'Check Box106': 'QA Testing - Yes',
    'Check Box107': 'QA Testing - No',
    'Check Box108': 'Staging Environment - Yes',
    'Check Box109': 'Staging Environment - No',
    'Check Box110': 'Automated Testing - Yes',
    'Check Box111': 'Automated Testing - No',

    // Data Handling
    'Check Box112': 'Handles PII - Yes',
    'Check Box113': 'Handles PII - No',
    'Check Box114': 'Handles PHI - Yes',
    'Check Box115': 'Handles PHI - No',
    'Text116': 'Data Types Handled',
    'Check Box117': 'PCI Compliant - Yes',
    'Check Box118': 'PCI Compliant - No',
    'Check Box119': 'HIPAA Compliant - Yes',
    'Check Box120': 'HIPAA Compliant - No',
    'Check Box121': 'SOC 2 - Yes',
    'Check Box122': 'SOC 2 - No',
    'Check Box123': 'ISO 27001 - Yes',
    'Check Box124': 'ISO 27001 - No',
    'Check Box125': 'GDPR Compliant - Yes',
    'Check Box126': 'GDPR Compliant - No',
    'Check Box127': 'Data Retention Policy - Yes',
    'Check Box128': 'Data Retention Policy - No',
    'Check Box129': 'Data Encryption at Rest - Yes',

    // Contracts & Liability
    'Text130': 'Contract Details',
    'Check Box131': 'Written Contracts - Yes',
    'Check Box132': 'Written Contracts - No',
    'Check Box133': 'Limitation of Liability - Yes',
    'Check Box134': 'Limitation of Liability - No',
    'Check Box135': 'Hold Harmless - Yes',
    'Check Box136': 'Hold Harmless - No',
    'Check Box137': 'Indemnification - Yes',

    // Prior Claims & History
    'Check Box149': 'Prior Claims - Yes',
    'Check Box139': 'Prior Claims - No',
    'Check Box140': 'Known Circumstances - Yes',
    'Check Box141': 'Known Circumstances - No',
    'Check Box142': 'Data Breach History - Yes',
    'Check Box143': 'Data Breach History - No',
    'Check Box144': 'Litigation - Yes',
    'Check Box145': 'Litigation - No',
    'Check Box146': 'Prior Coverage Cancelled - Yes',
    'Check Box147': 'Prior Coverage Cancelled - No',
    'Check Box148': 'Prior Coverage Declined - Yes',
    'Text150': 'Claims Details',
    'Check Box151': 'Claims Paid - Yes',
    'Check Box152': 'Claims Paid - No',
    'Text153': 'Claims Amount',

    // Coverage Limits & Deductibles
    'Text155': 'Requested Coverage Limit',
    'Text157': 'Requested Deductible',

    // Signatures & Dates
    'Text198': 'Signature Date',
    'Text199': 'Applicant Signature',

    // Additional fields
    'Text216': 'Broker Name',
    'Text217': 'Broker Email',
    'Text218': 'Broker Phone',
    'Text219': 'Broker License',
};

export const acordForms: AcordFormConfig[] = [
    {
        id: 'tech-eo-tmhcc',
        insuranceType: 'tech-eo',
        formName: 'Tech E&O Application',
        acordNumber: 'TMHCC Tech E&O 1.2022',
        fileName: 'tech-eo-mainform-app-tmhcc-1-2022.pdf',
        downloadPath: '/tech-eo-mainform-app-tmhcc-1-2022.pdf',
        description: 'Technology Errors & Omissions insurance application form from Tokio Marine HCC. Covers professional liability, cyber liability, and media liability for technology companies.',
        icon: 'Globe',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        pageCount: 8,
        fieldLabels: techEOFieldLabels,
    },
    // Future forms can be added here:
    // { id: 'dno-acord', insuranceType: 'dno', ... },
    // { id: 'cyber-acord', insuranceType: 'cyber', ... },
    // { id: 'epli-acord', insuranceType: 'epli', ... },
];

export const getAcordForm = (id: string): AcordFormConfig | undefined => {
    return acordForms.find(f => f.id === id);
};

export const getAcordFormsByType = (insuranceType: string): AcordFormConfig[] => {
    return acordForms.filter(f => f.insuranceType === insuranceType);
};
