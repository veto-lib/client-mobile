import { Animal } from './animal';
import { Veterinary } from './veterinary';

export interface Event {
  id: string;
  title: string;
  start: Date;  
  end: Date;
  notes: string;
  reason: 'Vaccination' | 'Consultation' | 'Identification' | 'Visite de contrôle';
  customer: string;  
  animal: Animal;  
  veterinary: Veterinary;
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
