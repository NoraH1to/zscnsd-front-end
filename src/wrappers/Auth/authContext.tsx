import { Member } from 'api';
import { createContext, Dispatch } from 'react';

interface UserContext {
  user?: Member;
  setUser?: Dispatch<Member | undefined>;
}

export const authContext = createContext<UserContext>({});
