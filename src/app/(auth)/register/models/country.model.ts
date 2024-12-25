import {
  getCountryCallingCode,
  Country as CountryCode,
} from 'react-phone-number-input';
export type Country = {
  id: number;
  name: string;
  code: CountryCode;
  dialCode: ReturnType<typeof getCountryCallingCode>;
};
