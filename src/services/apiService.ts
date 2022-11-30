import axios from 'axios';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { Contact } from '../entities/Contact';
import { HttpErrorData } from '../entities/HttpErrorData';

const SERVER_PORT = 3030;
const baseUrl = `http://localhost:${SERVER_PORT}/contacts`;

// private httpClient = axios.create({
//   baseURL: `http://localhost:${this.SERVER_PORT}/contacts`,
// });

export async function listContacts(): Promise<Contact[] | HttpErrorData> {
  try {
    const { data, status } = await axios.get<Contact[]>(baseUrl);

    if (status !== StatusCodes.OK) {
      return new HttpErrorData(getReasonPhrase(status), status);
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { message, status } = error;
      return new HttpErrorData(message, status);
    } else {
      return new HttpErrorData();
    }
  }
}
