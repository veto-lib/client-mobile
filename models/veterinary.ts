export interface Veterinary {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  compatibleAnimals: string[];
  enabled: boolean;
}
