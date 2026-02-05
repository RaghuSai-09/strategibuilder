import { InsuranceTypeConfig } from '@/types/insurance';
import { techEOConfig } from './tech-eo';

// Export all insurance configurations
export const insuranceConfigs: Record<string, InsuranceTypeConfig> = {
  'tech-eo': techEOConfig,
  // Add other types as needed
  // 'dno': dnoConfig,
  // 'cyber': cyberConfig,
  // 'epli': epliConfig,
};

export const getInsuranceConfig = (type: string): InsuranceTypeConfig | undefined => {
  return insuranceConfigs[type];
};

export const getAllSteps = (type: string) => {
  const config = getInsuranceConfig(type);
  if (!config) return [];
  
  return [...config.commonSteps, ...config.specificSteps];
};
