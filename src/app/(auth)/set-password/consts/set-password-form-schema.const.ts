import { z } from 'zod';

export const SET_PASSWORD_FORM_SCHEMA = z
  .object({
    password: z.string().min(7, 'Minimum 7 characters'),
    confirmPassword: z.string(),
    token: z.string().min(1, 'Required!'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Both passwords entered must be identical',
        path: ['confirmPassword'],
      });
    }

    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    const containSpaces = password.includes(' ');
    // const containsSpecialChar = (ch: string) =>
    //   /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0,
      countOfLowerCase = 0;
    // countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      let ch = password.charAt(i);
      if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      // else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1 ||
      countOfUpperCase < 1 ||
      // countOfSpecialChar < 1 ||
      containSpaces
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'password does not meet complexity requirements',
        path: ['password'],
      });
    }
  });
