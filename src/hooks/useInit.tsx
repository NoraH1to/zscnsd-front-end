import { useEffect } from 'react';
import useApi from './useApi';
import { CancelTokenSource } from 'axios';
import apiInterface from 'api';

const useInit = <P,>(
  api: apiInterface.Api<P>,
  params?: P,
  then?: Function,
): apiInterface.Apihooks<P> => {
  const { loading, setLoading, setParams, data, errorData, cancel } = useApi(
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
    cancel,
  };
};

export default useInit;
