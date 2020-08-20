import React from 'react';
import * as icons from 'react-feather';

const Icon = ({ name, ...rest }) => {
  const IconComponent = icons[name];
  return <IconComponent {...rest} />;
};

export default Icon;
