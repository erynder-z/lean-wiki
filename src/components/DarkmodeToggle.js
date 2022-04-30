import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DarkmodeToggle.css';
import Icon from '@mdi/react';
import { mdiBrightness6 } from '@mdi/js';

function DarkmodeToggle(props) {
  const { toggleDarkMode } = props;

  return (
    <Icon
      className="darkModeBtn"
      path={mdiBrightness6}
      onClick={toggleDarkMode}
      onKeyDown={toggleDarkMode}
      role="button"
      tabIndex={0}
      /*  size={2} */
    />
  );
}

export default DarkmodeToggle;

DarkmodeToggle.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
};
