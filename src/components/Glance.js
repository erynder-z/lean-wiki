import React, { useState, useEffect } from 'react';
import Featured from './Featured';
import ThisDayInHistory from './ThisDayInHistory';
import '../styles/Glance.css';

function Glance() {
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

  const openWiki = () => {
    window.open(`https://en.wikipedia.org/wiki/${article.title}`);
  };

  useEffect(() => {
    fetchFeaturedArticle();
  }, []);

  return (
    <div className="glance">
      <Featured article={article} openWiki={openWiki} />
      <ThisDayInHistory onthisday={article.onthisday} />
    </div>
  );
}

export default Glance;
