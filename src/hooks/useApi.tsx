import apiInterface from 'api';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

const useApi = <P,>(
  api: (
    params?: P,
  ) => Promise<
    AxiosResponse<apiInterface.Response | apiInterface.ResponsePage>
  >,
  params?: P,
  then?: Function,
): apiInterface.Apihooks<P> => {
  const [loading, setLoading] = useState(false);
  const [_params, setParams] = useState<P | undefined>(params);
  const [data, setData] = useState<any>({});
  const [errorData, setErrorData] = useState({});

  useEffect(() => {
    if (!loading) return;
    getData();
  }, [loading]);

  function getData() {
    api(_params)
      .then((res) => {
        setData(res);
        then && then(res);
      })
      .catch((e) => {
        setErrorData(errorData);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return {
    loading,
    setLoading,
    setParams,
    data,
    errorData,
  };
};

export default useApi;
