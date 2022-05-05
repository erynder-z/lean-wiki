import '../styles/Nav.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Nav(props) {
  const { darkmode } = props;

  return (
    <nav className={`${darkmode ? 'dark' : null}`}>
      <h3>lean wiki</h3>
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/about">About</Link>
      </ul>
    </nav>
  );
}

export default Nav;

Nav.propTypes = {
  darkmode: PropTypes.bool.isRequired,
};
