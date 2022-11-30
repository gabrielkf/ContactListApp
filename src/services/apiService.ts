import axios from 'axios';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { Contact } from '../entities/Contact';
import { HttpException } from '../entities/HttpException';

const SERVER_PORT = 3030;
const baseUrl = `http://localhost:${SERVER_PORT}/contacts`;

// const httpClient = axios.create({
//   baseURL: `http://localhost:${this.SERVER_PORT}/contacts`,
// });

export async function listContacts(): Promise<Contact[]> {
  try {
    const { data, status } = await axios.get<Contact[]>(baseUrl);

    if (status !== StatusCodes.OK) {
      throw new HttpException(getReasonPhrase(status), status);
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { message, status } = error;
      throw new HttpException(message, status);
    } else {
      throw new HttpException();
    }
  }
}
