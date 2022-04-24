import React, { useState } from 'react';

function Featured() {
  const [article, setArticle] = useState({
    title: '',
    summary: '',
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
        title: fetchData.tfa.displaytitle,
        summary: fetchData.tfa.extract,
      });
    } catch (error) {
      console.log(`There has been a problem with your fetch operation:${error}`);
    }
  }

  fetchFeaturedArticle();

  return (
    <div className="featured">
      <h1>Featured Article</h1>
      <h4 className="article-title">{article.title}</h4>
      <div className="article-body">{article.summary}</div>
    </div>
  );
}

export default Featured;
