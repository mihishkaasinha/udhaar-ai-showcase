
export type UrgencyLevel = 'High' | 'Medium' | 'Low';

export interface RecoveryInput {
  customerName: string;
  amount: string;
  daysOverdue: string;
  customerType: 'Startup' | 'SMB' | 'Enterprise';
  paymentHistory: 'New Customer' | 'Usually On Time' | 'Usually Late';
  previousAttempts: string;
  paymentLink?: string;
}

export interface AIResponse {
  urgency: UrgencyLevel;
  analysis: string;
  messages: {
    whatsapp: string;
    email: string;
    call_script: string;
  };
  recommended_channel: 'WhatsApp' | 'Email' | 'Phone';
  reasoning: string;
  payment_probability: number;
  next_steps: string[];
}
