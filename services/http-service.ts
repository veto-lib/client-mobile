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
  return [
    {
      id: '2',
      title: 'event',
      start: new Date(),
      end: new Date(),
      notes: 'notes',
      reason: 'Vaccination',
      customer: '2',
      animal: '12',
      veterinary: '1',
      callId: 'abcd',
    }
  ];
};

const getAnimalDocuments = async (animalId: string): Promise<Document[]> => {
  return [
    {
      id: '1',
      name: 'some-pdf',
      uploaded: new Date(),
      data: '',
      animal: '12',
      customer: '2',
    },
    {
      id: '2',
      name: 'some-pdf-2',
      uploaded: new Date(),
      data: '',
      animal: '12',
      customer: '2',
    }
  ];
};

const getNextEvents = async (): Promise<Event[]> => {
  return [
    {
      id: '2',
      title: 'event',
      start: new Date(),
      end: new Date(),
      notes: 'notes',
      reason: 'Vaccination',
      customer: '2',
      animal: '12',
      veterinary: '1',
      callId: 'abcd',
    }
  ];
};

const createEvent = async (event: CreateEvent): Promise<void> => {
  return;
};

export {
  getAnimals,
  getAnimal,
  getAnimalEvents,
  getAnimalDocuments,
  getNextEvents,
  createEvent
};
