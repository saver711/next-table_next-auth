import { ERROR_FALLBACK } from '@/app/consts/api/error-fallback.const';
import { LOADING_TEXT } from '../../consts/api/loading-text';

export const getInputPlaceholder = (
  placeholder: string,
  isLoading: boolean,
  hasError: boolean
): string => {
  let _placeholder = placeholder;
  if (isLoading) _placeholder = LOADING_TEXT;
  if (hasError) _placeholder = ERROR_FALLBACK;
  return _placeholder;
};
