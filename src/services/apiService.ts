import axios from 'axios';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { Contact, ContactData } from '../entities/Contact';
import { HttpException } from '../entities/HttpException';

const SERVER_PORT = 3030;
const apiClient = axios.create({
  baseURL: `http://localhost:${SERVER_PORT}/contacts`,
});

export async function listContacts(): Promise<Contact[]> {
  try {
    const { data, status } = await apiClient.get<Contact[]>('');

    if (status !== StatusCodes.OK) {
      throw new HttpException(getReasonPhrase(status), status);
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) || error instanceof HttpException) {
      const { message, status } = error;
      throw new HttpException(message, status);
    } else {
      throw new HttpException();
    }
  }
}

export async function removeContact(id: string): Promise<void> {
  try {
    const { status } = await apiClient.delete(id);

    if (status !== StatusCodes.OK) {
      throw new HttpException(getReasonPhrase(status));
    }
  } catch (error) {
    handleError(error);
  }
}

export async function updateContact(
  id: string,
  contactData: ContactData
): Promise<void> {
  try {
    const { status } = await apiClient.patch(id, contactData);

    if (status !== StatusCodes.OK) {
      throw new HttpException(getReasonPhrase(status));
    }
  } catch (error) {
    handleError(error);
  }
}

export async function createContact(
  contactData: ContactData
): Promise<Contact | undefined> {
  try {
    const { data, status } = await apiClient.post('', contactData);

    if (status !== StatusCodes.CREATED) {
      if (data.message && data.message[0]) {
        throw new HttpException(data.message[0]);
      }
      throw new Error();
    }

    return data as Contact;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error: any) {
  if (axios.isAxiosError(error) || error instanceof HttpException) {
    const { message, status } = error;
    throw new HttpException(message, status);
  } else {
    throw new HttpException();
  }
}
