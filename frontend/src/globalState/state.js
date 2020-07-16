import React from 'react';
import { SearchContextProvider } from './searchContext';
import { NavbarContextProvider } from './navbarContext';

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
      contexts={[<SearchContextProvider />, <NavbarContextProvider />]}
    >
      {children}
    </ProviderComposer>
  );
};

export default ContextProvider;
