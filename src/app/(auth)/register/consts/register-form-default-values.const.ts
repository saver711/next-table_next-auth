import { RegistrationFormParams } from '../models/register-form-params.model';

export const REGISTER_FORM_DEFAULT_VALUES: RegistrationFormParams = {
  email: '',
  firstName: '',
  lastName: '',
  companyName: '',
  companyAddress: '',
  countryId: '',
  cityId: '',
  userPhone: '',
  dialCode: '20',
};
