import React, { useState, useEffect } from 'react';
import '../styles/Featured.css';

function Featured() {
  const [article, setArticle] = useState({
    title: null,
    displaytitle: null,
    summary: null,
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
      });
    } catch (error) {
      console.log(`There has been a problem with your fetch operation:${error}`);
    }
  }

  const openWiki = () => {
    window.open(`https://en.wikipedia.org/wiki/${article.title}`);
  };

  useEffect(() => {
    fetchFeaturedArticle();
  }, []);

  return (
    <div className="featured">
      <h1>Todays Featured Article</h1>
      <h4 className="article-title">{article.displaytitle}</h4>
      <div className="article-body">{article.summary}</div>
      {article.displaytitle && (
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

export default Featured;
