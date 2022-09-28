import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseAsyncEffectResponse<T> {
  isLoading: boolean;
  data?: T;
  error?: Error;
}

const useAsyncEffect = <T>(
  asyncFunction: () => Promise<T>
): UseAsyncEffectResponse<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const isCancelled = useRef(false);

  const execute = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await asyncFunction();
      if (!isCancelled.current) {
        setData(result);
      }
    } catch (err: any) {
      if (!isCancelled.current) {
        setError(err);
      }
    }

    if (!isCancelled.current) {
      setIsLoading(false);
    }
  }, [asyncFunction, isCancelled]);

  useEffect(() => {
    isCancelled.current = false;
    execute();
    return (): void => {
      isCancelled.current = true;
    };
  }, [execute]);

  return {
    isLoading,
    data,
    error,
  };
};

export default useAsyncEffect;
