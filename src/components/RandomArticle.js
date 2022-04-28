import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/RandomArticle.css';

function RandomArticle(props) {
  const { trigger } = props;
  const [randomarticle, setRandomArticle] = useState({
    title: null,
    displaytitle: null,
    summary: null,
  });

  async function fetchRandomArticle() {
    setRandomArticle(() => ({
      title: null,
      displaytitle: null,
      summary: 'fetching data',
    }));
    try {
      const response = await fetch('https://en.wikipedia.org/api/rest_v1/page/random/summary');

      const fetchData = await response.json();

      setRandomArticle({
        displaytitle: fetchData.displaytitle,
        title: fetchData.title,
        summary: fetchData.extract,
      });
    } catch (error) {
      console.log(`There has been a problem with your fetch operation:${error}`);
    }
  }

  const openWiki = (e) => {
    e.target.blur();
    window.open(`https://en.wikipedia.org/wiki/${randomarticle.title}`);
  };

  useEffect(() => {
    fetchRandomArticle();
  }, [trigger]);

  return (
    <div className="random-card">
      <h1>Random Wikipedia Article</h1>
      <h4 className="random-title">{randomarticle.displaytitle}</h4>
      <div className="random-body">{randomarticle.summary}</div>
      {randomarticle.displaytitle && (
        <div
          className="readmoreBtn"
          onClick={openWiki}
          onKeyDown={openWiki}
          role="button"
          tabIndex={0}
        >
          Read more on Wikipedia
        </div>
      )}
    </div>
  );
}

export default RandomArticle;

RandomArticle.propTypes = {
  trigger: PropTypes.number.isRequired,
};
