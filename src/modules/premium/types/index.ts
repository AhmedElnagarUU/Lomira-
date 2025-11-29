export interface UserFeatures {
  aiTextGenerator: boolean;
  aiImageGeneration: boolean;
  abTesting: boolean;
  leadForms: boolean;
  whatsappIntegration: boolean;
  pixelIntegration: boolean;
  customDomain: boolean;
  pdfExport: boolean;
  advancedAnalytics: boolean;
}

export interface PremiumFeature {
  id: keyof UserFeatures;
  name: string;
  description: string;
  icon?: string;
}


