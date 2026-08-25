// HTTP error type. The error handler serializes these to FastAPI's
// `{ "detail": "<message>" }` response shape, with the given status code.
export class HttpError extends Error {
  status: number;
  detail: string;
  headers?: Record<string, string>;

  constructor(status: number, detail: string, headers?: Record<string, string>) {
    super(detail);
    this.name = 'HttpError';
    this.status = status;
    this.detail = detail;
    this.headers = headers;
  }
}
