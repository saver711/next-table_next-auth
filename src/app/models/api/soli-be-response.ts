import { ErrorCode } from '@/lib/soli/models/api/error-code.enum';

export type SoliBEResponse<T> = {
  data: T;
  totalCount: number;
  errorCode: ErrorCode;
};
