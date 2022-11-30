import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class HttpException extends Error {
  public status: number;

  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
    this.status = status;
  }
}
