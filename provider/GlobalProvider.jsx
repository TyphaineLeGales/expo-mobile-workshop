import React, { createContext, useContext } from 'react';
import { PeopleProvider } from './PeopleProvider';
import { EventsProvider } from './EventsProvider';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const providers = [PeopleProvider, EventsProvider];
  const initialValue = {};

  return (
    <GlobalContext.Provider value={initialValue}>
      {providers.reduce(
        (children, Provider) => (
          <Provider>{children}</Provider>
        ),
        children
      )}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw Error('useDaronContext must be used inside a `DaronProvider`');
  return context;
};