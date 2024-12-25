import { ERROR_FALLBACK } from '@/app/consts/api/error-fallback.const';
import {
  ErrorCode,
  PluralErrorCode,
} from '@/lib/soli/models/api/error-code.enum';

export const getErrorMessage = (data: any, isPlural = false) => {
  let errorMessage = data.error || ERROR_FALLBACK;
  const errorCode: ErrorCode | PluralErrorCode = data.message;
  if (!errorCode) {
    return errorMessage;
  }

  // Define a map of singular error messages.
  const singularMessages: Record<ErrorCode, string> = {
    API_NOT_FOUND_USER_BY_EMAIL_OR_PHONE: 'No registered user with this email',
    API_NULL_USER: 'The email address you entered is not found.',
    API_DUPLICATE_EMAIL: 'This user already exists.',
    API_TOKEN_INVALID: 'Token is expired.',
    API_BAD_CREDENTIAL: 'Wrong credentials.',
    API_ACCESS_NOT_ALLOWED: 'Not authorized.',
    API_UNVERIFIED_USER: 'The email address you entered is not found.',
  };

  // Define a map of plural error messages.
  const pluralMessages: Record<PluralErrorCode, string> = {};

  if (isPlural && errorCode in pluralMessages) {
    errorMessage = pluralMessages[errorCode as PluralErrorCode];
  } else if (!isPlural && errorCode in singularMessages) {
    errorMessage = singularMessages[errorCode as ErrorCode];
  }

  return errorMessage;
};
