import {createContext, useContext} from 'react';
import AuthStore from './auth';
import UserStore from './user'

const context = createContext({
  UserStore,
  AuthStore
});

window.stores = {
  UserStore,
  AuthStore
}

export const useStores = () => useContext(context);