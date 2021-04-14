import apiInterface from 'api';
import { useState, useEffect } from 'react';

const useApi = <P,>(
  api: (
    params?: P,
  ) => Promise<apiInterface.Response | apiInterface.ResponsePage>,
  params?: P,
  then?: Function,
): apiInterface.Apihooks<P> => {
  const [loading, setLoading] = useState(false);
  const [_params, setParams] = useState<P | undefined>(params);
  const [data, setData] = useState<any>({});
  const [errorData, setErrorData] = useState<
    apiInterface.ResponseBase['errorData']
  >(null);

  useEffect(() => {
    if (!loading) return;
    getData();
  }, [loading]);

  function getData() {
    api(_params)
      .then((res) => {
        setData(res);
        setErrorData(res.errorData);
        then && then(res);
      })
      .catch((e) => {
        setErrorData(e.errorData);
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
