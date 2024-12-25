import { AuthError } from 'next-auth';

export class CustomAuthError extends AuthError {
  static message: string;

  constructor(message?: string) {
    super();
    if (message) this.message = message;
  }
}
