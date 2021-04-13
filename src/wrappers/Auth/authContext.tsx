import { User } from 'api';
import { createContext, Dispatch } from 'react';

interface UserContext {
  user?: User;
  setUser?: Dispatch<User | undefined>;
}

export const authContext = createContext<UserContext>({});
