import { Link } from 'react-router-dom';

function Nav() {
  const navStyle = {
    color: 'whitesmoke',
    textDecoration: 'none',
  };

  return (
    <nav>
      <h3>
        <Link style={navStyle} to="/">
          Something
        </Link>
      </h3>
      <ul className="nav-links">
        <Link style={navStyle} to="/search">
          Search
        </Link>
        <Link style={navStyle} to="/about">
          About
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
