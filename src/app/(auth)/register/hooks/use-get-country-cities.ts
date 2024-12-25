import { SWRError } from '@/lib/soli/models/api/swr-error.model';
import { swrFetchWrapper } from '@/lib/soli/utils/api/swr-fetch-wrapper';
import useSWR, { BareFetcher, SWRConfiguration } from 'swr';
import { City } from '../models/city.model';
export const useGetCountryCities = (
  countryId?: string,
  swrConfig?: SWRConfiguration<City[], any, BareFetcher<City[]>>
) => {
  return useSWR<City[], SWRError>(
    countryId ? `/api/countries/${countryId}` : null,
    swrFetchWrapper,
    swrConfig
  );
};
