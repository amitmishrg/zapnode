import { PAGINATION } from '@/config/constants';
import { useEffect, useState } from 'react';

interface UseEntitySearchProps<
  T extends {
    search: string;
    page: number;
  }
> {
  params: T;
  setParams: (params: T) => void;
  debounceMs?: number;
}

export const useEntitySearch = <
  T extends {
    search: string;
    page: number;
  }
>(
  props: UseEntitySearchProps<T>
) => {
  const { params, setParams, debounceMs = 500 } = props;
  const [search, setSearch] = useState(params.search);

  useEffect(() => {
    if (search === '' && params.search !== '') {
      setParams({ ...params, search: '', page: PAGINATION.DEFAULT_PAGE });
      return;
    }

    const timeout = setTimeout(() => {
      if (search !== params.search) {
        setParams({ ...params, search, page: PAGINATION.DEFAULT_PAGE });
      }
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [search, debounceMs, params, setParams]);

  useEffect(() => {
    setSearch(params.search);
  }, [params.search]);

  return { search, setSearch };
};
