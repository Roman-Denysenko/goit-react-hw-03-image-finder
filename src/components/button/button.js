import React from 'react';
import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className={s.buttonContainer}>
      <button type="button" className={s.button} onClick={handleClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
