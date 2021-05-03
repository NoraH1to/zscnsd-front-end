import apiInterface from 'api';
import { CancelTokenSource } from 'axios';
import { useState, useEffect } from 'react';

const useApi = <P,>(
  api: apiInterface.Api<P>,
  params?: P,
  then?: Function,
): apiInterface.Apihooks<P> => {
  const [loading, setLoading] = useState(false);
  const [_params, setParams] = useState<P | undefined>(params);
  const [data, setData] = useState<any>({});
  const [errorData, setErrorData] = useState<
    apiInterface.ResponseBase['errorData']
  >(null);
  const [cancelContainer] = useState<{ cancel: CancelTokenSource | undefined }>(
    { cancel: undefined },
  );

  useEffect(() => {
    if (!loading) return;
    getData();
  }, [loading]);

  useEffect(
    () => () => {
      cancelContainer.cancel && cancelContainer.cancel.cancel();
    },
    [],
  );

  function getData() {
    const apiObj = api(_params);
    cancelContainer.cancel = apiObj.cancel;
    apiObj
      .request()
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
    cancel: cancelContainer.cancel,
  };
};

export default useApi;
