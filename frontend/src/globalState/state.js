import React from 'react';
import { SearchContextProvider } from './context/searchContext';
import { AuthContextProvider } from './context/authContext';
import { SignupContextProvider } from './context/signupContext';
import { NavbarContextProvider } from './context/navbarContext';

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
        <SearchContextProvider />,
        <AuthContextProvider />,
        <SignupContextProvider />,
        <NavbarContextProvider />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;
