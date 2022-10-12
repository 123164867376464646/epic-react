import {createContext, useContext} from 'react';
import AuthStore from './auth';
import UserStore from './user'
import ImageStore from './image'

const context = createContext({
  UserStore,
  AuthStore,
  ImageStore
});

window.stores = {
  UserStore,
  AuthStore,
  ImageStore
}

export const useStores = () => useContext(context);