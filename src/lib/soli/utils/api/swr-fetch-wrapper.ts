import { ERROR_FALLBACK } from '@/app/consts/api/error-fallback.const';

export const swrFetchWrapper = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.error || ERROR_FALLBACK);
    (error as any).status = res.status;
    (error as any).info = data.error;
    throw error;
  }

  return data;
};
