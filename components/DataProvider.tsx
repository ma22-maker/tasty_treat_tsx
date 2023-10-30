"use client"
import React, { ReactNode } from 'react';
import store from '@/store/reduxstore';
import { Provider } from 'react-redux';

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default DataProvider;
