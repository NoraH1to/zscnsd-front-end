import { useApi, useInit } from '@/hooks';
import { FC, useState } from 'react';

const login: FC = () => {
  const [counter, setCounter] = useState(0);
  const { loading, setLoading, data, errorData } = useInit(
    (params: any) =>
      new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data: {},
            code: 233,
            msg: '2333',
          });
        }, 3000);
      }),
    {},
  );
  return (
    <div>
      <button onClick={() => setLoading(true)}>233</button>
      {`${loading}:${JSON.stringify(data)}`}
      <button onClick={() => setCounter(counter + 1)}>{counter}</button>
    </div>
  );
};

export default login;
