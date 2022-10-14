import {createContext, useContext} from 'react';
import AuthStore from './auth';
import UserStore from './user'
import ImageStore from './image'
import HistoryStore from './history'

const context = createContext({
  UserStore,
  AuthStore,
  ImageStore,
  HistoryStore
});

window.stores = {
  UserStore,
  AuthStore,
  ImageStore,
  HistoryStore
}

export const useStores = () => useContext(context);