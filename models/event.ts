export interface Event {
  id: string;
  title: string;
  start: Date;  
  end: Date;
  notes: string;
  reason: string;
  customer: string;  
  animal: string;  
  veterinary: string;
  callId: string;
}

export interface CreateEvent {
  title: string;
  start: Date;
  end: Date;
  notes: string;
  reason: 'Vaccination' | 'Consultation' | 'Identification' | 'Visite de contrôle';
  animal: string;
  customer: string;
  veterinary: string;
}
