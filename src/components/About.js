/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import '../styles/About.css';

function About(props) {
  const { darkmode } = props;
  return (
    <div className={`about ${darkmode ? 'dark' : null}`}>
      <div className="about-card">
        <h1>About this app</h1>
        <h4 className="about-title">lean wiki - a no-bs wikipedia client </h4>
        <div className="about-body">
          Enjoy the knowledge of wikipedia without all the distractions. No more getting lost in
          link after link and spending way more time on wikipedia than you intended!
          <br />
          Most of the time just a small extract on a particular subject is all you really want.
          <h4>lean wiki - sometimes just enough is all you really need!</h4>
          <h5>Things you can do:</h5>
          <ul>
            <li>get todays featured wikipedia article</li>
            <li>show what happened on this day in history</li>
            <li>get a random article from wikipedia</li>
            <li>search for any article on wikipedia</li>
            <li>read the full article on wikipedia</li>
            <li>see your recent searches</li>
            <li>toggle between dark and light theme</li>
          </ul>
          <h5>This app uses the following:</h5>
          <ul>
            <li>
              <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                React
              </a>
            </li>
            <li>
              <a
                href="https://www.mediawiki.org/wiki/Wikimedia_REST_API"
                target="_blank"
                rel="noreferrer"
              >
                Wikimedia REST API
              </a>
            </li>
            <li>
              <a href="https://materialdesignicons.com/" target="_blank" rel="noreferrer">
                Material Design Icons
              </a>
            </li>
          </ul>
        </div>
        <div className="contactBtn">
          {' '}
          Copyright © Erynder-Z 2022 ||&nbsp;
          <a href="https://github.com/erynder-z" target="_blank" rel="noreferrer">
            <Icon path={mdiGithub} size={2} color="black" className="icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;

About.propTypes = {
  darkmode: PropTypes.bool.isRequired,
};
