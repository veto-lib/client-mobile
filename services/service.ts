import axios from 'axios';

import { Animal } from '../models/animal';
import { Event, CreateEvent } from '../models/event';
import { Document } from '../models/document';

const getAnimals = async (): Promise<Animal[]> => {
  return [
    {
      id: '12',
      gender: 'M',
      name: 'Pépito',
      type: 'Chien'
    },
    {
      id: '11',
      gender: 'F',
      name: 'Loubna',
      type: 'Chien'
    },
    {
      id: '13',
      gender: 'F',
      name: 'Nina',
      type: 'Chien'
    }
  ];
};

const getAnimal = async (id: string): Promise<Animal> => {
  return {
    id,
    gender: 'M',
    name: 'Pépito',
    type: 'Chien'
  };
};

const getAnimalEvents = async (animalId: string): Promise<Event[]> => {
  return [];
};

const getAnimalDocuments = async (animalId: string): Promise<Document[]> => {
  return [];
};

const getNextEvents = async (): Promise<Event[]> => {
  return [];
};

const createEvent = async (event: CreateEvent): Promise<void> => {
  return;
};

export { getAnimals, getAnimal };
