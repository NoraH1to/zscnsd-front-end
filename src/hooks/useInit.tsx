import { useEffect } from 'react';
import useApi from './useApi';
import { AxiosResponse } from 'axios';
import apiInterface from 'api';

const useInit = <P,>(
  api: (
    params?: P,
  ) => Promise<
    AxiosResponse<apiInterface.Response | apiInterface.ResponsePage>
  >,
  params?: P,
  then?: Function,
): apiInterface.Apihooks<P> => {
  const { loading, setLoading, setParams, data, errorData } = useApi(
    api,
    params,
    then,
  );

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setParams(params);
    setLoading(true);
  }

  return {
    loading,
    setLoading,
    setParams,
    data,
    errorData,
  };
};

export default useInit;
