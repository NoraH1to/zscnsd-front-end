import * as H from 'history';
import { parse, ParsedQuery } from 'query-string';
import { useLocation } from 'umi';

const useRealLocation = <Q extends ParsedQuery<string>>() => {
  const location = useLocation<undefined>() as H.Location<undefined> & {
    query: Q;
  };
  const query = location.query || parse(location.search);

  return { ...location, query };
};

export default useRealLocation;
