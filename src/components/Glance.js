/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import Featured from './Featured';
import RandomArticle from './RandomArticle';
import ThisDayInHistory from './ThisDayInHistory';
import '../styles/Glance.css';

function Glance() {
  const [mode, setMode] = useState('featured');
  const [article, setArticle] = useState({
    title: null,
    displaytitle: null,
    summary: null,
    onthisday: [
      {
        text: null,
        year: null,
      },
    ],
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const monthFormatted = month.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  async function fetchFeaturedArticle() {
    try {
      const response = await fetch(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${year}/${monthFormatted}/${day}`,
      );

      const fetchData = await response.json();

      setArticle({
        displaytitle: fetchData.tfa.displaytitle,
        title: fetchData.tfa.title,
        summary: fetchData.tfa.extract,
        onthisday: fetchData.onthisday,
      });
    } catch (error) {
      console.log(`There has been a problem with your fetch operation:${error}`);
    }
  }

  const openWiki = (e) => {
    e.target.blur();
    window.open(`https://en.wikipedia.org/wiki/${article.title}`);
  };

  const toggleMode = (e) => {
    e.target.blur();
    if (mode === 'featured') {
      setMode('random');
    } else if (mode === 'random') {
      setMode('featured');
    }
  };

  useEffect(() => {
    fetchFeaturedArticle();
  }, []);

  return (
    <div className="glance">
      <div className="glance-main-container">
        {mode === 'featured' ? (
          <Featured article={article} openWiki={openWiki} />
        ) : (
          <RandomArticle />
        )}

        <div
          className="getarticleBtn"
          onClick={toggleMode}
          onKeyDown={toggleMode}
          role="button"
          tabIndex={0}
        >
          Get {mode === 'random' && 'other'} random article
        </div>
      </div>
      <ThisDayInHistory onthisday={article.onthisday} />
    </div>
  );
}

export default Glance;
