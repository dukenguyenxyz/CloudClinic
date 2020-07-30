import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { SearchContext } from '../../globalState/index';
import SearchResults from '../SearchResults/SearchResults';

const MotionContainer = ({
  children,
  inAnimation,
  outAnimation,
  transition,
  initialAnimation,
  variants,
}) => {
  const { searchValue } = useContext(SearchContext);

  return (
    <motion.div
      variants={variants}
      initial={initialAnimation}
      animate={inAnimation}
      exit={outAnimation}
      transition={transition}
    >
      {searchValue ? <SearchResults /> : children}
    </motion.div>
  );
};

export default MotionContainer;
