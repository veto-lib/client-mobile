import axios from 'axios';

import { getToken } from './auth-service';
import { Animal } from '../models/animal';
import { Event, CreateEvent } from '../models/event';
import { Document } from '../models/document';
import { Veterinary } from '../models/veterinary';

const getVeterinaries = async (): Promise<Veterinary[]> => {
  return [
    {
      email: 'quentin.caritey@outlook.fr',
      firstName: 'toto',
      lastName: 'titi',
      birthDate: new Date(),
      gender: 'M',
      compatibleAnimals: [ 'Chien' ],
      enabled: true
    },
    {
      email: 'xy@example.com',
      firstName: 'toto',
      lastName: 'tata',
      birthDate: new Date(),
      gender: 'M',
      compatibleAnimals: [ 'Chien' ],
      enabled: true
    }
  ];
};

const getAnimals = async (): Promise<Animal[]> => {
  const token = getToken();

  return axios.get('https://veto-lib-back.herokuapp.com/api/customers/quentin.caritey@outlook.fr/animals', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(data => { 
    return data.data;
  });
};

const getAnimal = async (id: string): Promise<Animal> => {
  const token = getToken();

  return axios.get(`https://veto-lib-back.herokuapp.com/api/customers/quentin.caritey@outlook.fr/animals/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(data => { 
    return data.data;
  });
};

const getAnimalEvents = async (animalId: string): Promise<Event[]> => {
  const token = getToken();

  return axios.get(`https://veto-lib-back.herokuapp.com/api/customers/quentin.caritey@outlook.fr/animals/${animalId}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(data => { 
    return data.data;
  });
};

const getAnimalDocuments = async (animalId: string): Promise<Document[]> => {
  const token = getToken();

  return axios.get(`https://veto-lib-back.herokuapp.com/api/customers/quentin.caritey@outlook.fr/animals/${animalId}/documents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(data => { 
    return data.data;
  });
};

const getNextEvents = async (): Promise<Event[]> => {
  const token = getToken();

  return axios.get(`https://veto-lib-back.herokuapp.com/api/customers/quentin.caritey@outlook.fr/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(data => { 
    return data.data;
  });
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
  createEvent,
  getVeterinaries,
};
