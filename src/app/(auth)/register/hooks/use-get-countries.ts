import { swrFetchWrapper } from '@/lib/soli/utils/api/swr-fetch-wrapper';
import useSWR, { BareFetcher, SWRConfiguration } from 'swr';
import { Country } from '../models/country.model';
import { SWRError } from '@/lib/soli/models/api/swr-error.model';

export const useGetCountries = (
  swrConfig?: SWRConfiguration<Country[], any, BareFetcher<Country[]>>
) => {
  return useSWR<Country[], SWRError>(
    `/api/countries`,
    swrFetchWrapper,
    swrConfig
  );
};
