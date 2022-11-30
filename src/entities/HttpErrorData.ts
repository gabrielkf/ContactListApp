import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class HttpErrorData {
  public message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
  public status: number = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message: string = '', status: number = 0) {
    if (message) this.message = message;
    if (status) this.status = status;
  }
}
