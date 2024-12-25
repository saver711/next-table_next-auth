import { ReadonlyURLSearchParams, useRouter } from 'next/navigation';

/**
 * Hook for managing URL query parameters with options to update the router.
 * @param {ReadonlyURLSearchParams} searchParams - Current search parameters from the URL.
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.shouldUseRouter=true] - Whether to update the router when query parameters change.
 * @param {boolean} [options.scroll=false] - Whether to scroll or not on routing.
 * @param {'replace' | 'push'} [options.method='replace'] - Method to use for router update.
 * @param {boolean} [options.deleteFalseValues=false] - Whether to delete the parameter if the parameter value is a false value.
 * @property {Function} set - Sets multiple query parameters at once.
 * @property {Function} append - Appends values to existing query parameters or adds new ones.
 * @property {Function} delete - Removes specified query parameters.
 * @property {Function} get - Retrieves the value of a specified query parameter.
 * @returns {object} - An object containing methods to set, append, get and delete query parameters.
 */
export const useSearchQueryParams = (
  searchParams: ReadonlyURLSearchParams,
  options: {
    shouldUseRouter?: boolean;
    method?: 'replace' | 'push';
    scroll?: boolean;
    deleteFalseValues?: boolean;
  }
) => {
  const {
    method = 'push',
    scroll = false,
    shouldUseRouter = true,
    deleteFalseValues = false,
  } = options;
  const router = useRouter();

  const updateRouter = (newParamsString: string) => {
    if (shouldUseRouter && newParamsString !== searchParams.toString()) {
      if (method === 'push') {
        router.push(`?${newParamsString}`, { scroll });
      } else {
        router.replace(`?${newParamsString}`, { scroll });
      }
    }
  };

  /**
   * Sets multiple query parameters at once.
   * @param {Record<string, string | number | (string | number)[] | null>} params - Object containing parameter key-value pairs to set.
   * @returns {string} The new query string after setting the parameters.
   */
  const set = (
    params: Record<string, string | number | (string | number)[] | null>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    for (const [key, value] of Object.entries(params)) {
      if (
        value === null ||
        value === undefined ||
        (deleteFalseValues && !value)
      ) {
        newSearchParams.delete(key);
      } else if (Array.isArray(value)) {
        newSearchParams.delete(key); // Clear existing values for this key
        value.forEach((val) => newSearchParams.append(key, String(val)));
      } else {
        newSearchParams.set(key, String(value));
      }
    }

    const newParamsString = newSearchParams.toString();
    updateRouter(newParamsString);
    return newParamsString;
  };

  /**
   * Appends values to existing query parameters or adds new ones.
   * @param {Record<string, string | number | (string | number)[]>} params - Object containing parameter key-value pairs to append.
   * @returns {string} The new query string after appending the parameters.
   */
  const append = (
    params: Record<string, string | number | (string | number)[]>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((val) => newSearchParams.append(key, String(val)));
      } else {
        newSearchParams.append(key, String(value));
      }
    }

    const newParamsString = newSearchParams.toString();
    updateRouter(newParamsString);
    return newParamsString;
  };

  /**
   * Removes specified query parameters.
   * @param {string | string[]} keys - The key or array of keys to remove from the query parameters.
   * @returns {string} The new query string after deleting the specified parameters.
   */
  const deleteParam = (keys: string | string[]) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    if (Array.isArray(keys)) {
      keys.forEach((key) => newSearchParams.delete(key));
    } else {
      newSearchParams.delete(keys);
    }

    const newParamsString = newSearchParams.toString();
    updateRouter(newParamsString);
    return newParamsString;
  };

  /**
   * Retrieves the value of a specified query parameter.
   * @param {string} key - The key of the query parameter to retrieve.
   * @returns {string | null} The value of the specified query parameter, or null if not found.
   */
  const get = (key: string): string | null => {
    return searchParams.get(key);
  };

  return { set, append, delete: deleteParam, get };
};
