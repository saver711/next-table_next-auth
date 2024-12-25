import { HttpStatusCodes } from './http-status-code.enum';

export type SWRError = { status: HttpStatusCodes; info: string };
