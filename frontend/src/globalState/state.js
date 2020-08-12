import React from 'react';
import { SearchContextProvider } from './context/searchContext';
import { AuthContextProvider } from './context/authContext';
import { LoadingContextProvider } from './context/loadingContext';
import { NavbarContextProvider } from './context/navbarContext';
import { DoctorListContextProvider } from './context/doctorListContext';
import { MessageContextProvider } from './context/messageContext';

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

const ContextProvider = ({ children }) => {
  return (
    <ProviderComposer
      contexts={[
        <MessageContextProvider />,
        <DoctorListContextProvider />,
        <SearchContextProvider />,
        <AuthContextProvider />,
        <LoadingContextProvider />,
        <NavbarContextProvider />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;
