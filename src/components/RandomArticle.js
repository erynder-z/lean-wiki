import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import '../styles/RandomArticle.css';

function RandomArticle() {
  const [trigger, setTrigger] = useState(0);
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
        displaytitle: fetchData.displaytitle.replace(/<\/?[^>]+(>|$)/g, ''),
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

  const triggerChange = (e) => {
    e.target.blur();
    setTrigger(trigger + 1);
  };

  useEffect(() => {
    fetchRandomArticle();
  }, [trigger]);

  return (
    <div className="random-card">
      <h1>Random Wikipedia Article</h1>
      <h4 className="random-title">{randomarticle.displaytitle}</h4>

      <div className="random-body">
        {randomarticle.summary === 'fetching data' ? (
          <Icon path={mdiSync} size={3} spin />
        ) : (
          randomarticle.summary
        )}
      </div>
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
      <div
        className="newArticleBtn"
        onClick={triggerChange}
        onKeyDown={triggerChange}
        role="button"
        tabIndex={0}
      >
        Get other random article
      </div>
    </div>
  );
}

export default RandomArticle;
