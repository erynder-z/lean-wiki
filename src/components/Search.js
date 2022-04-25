import React, { useState } from 'react';
import '../styles/Search.css';

function Search() {
  const [article, setArticle] = useState({
    title: '',
    summary: '',
  });

  const [myQuery, setMyQuery] = useState('');

  const apiEndpoint = 'https://en.wikipedia.org/w/api.php';
  const params =
    'format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';

  async function fetchArticle() {
    try {
      const response = await fetch(`${apiEndpoint}?${params}${myQuery}`);

      const fetchData = await response.json();
      const articleID = Object.keys(fetchData.query.pages);

      if (fetchData.query.pages[`${articleID}`].extract === undefined) {
        setArticle({
          title: fetchData.query.pages[`${articleID}`].title,
          summary: 'No matching article found...',
        });
      } else {
        setArticle({
          title: fetchData.query.pages[`${articleID}`].title,
          summary: fetchData.query.pages[`${articleID}`].extract,
        });
      }
    } catch (error) {
      console.log(`There has been a problem with your fetch operation:${error}`);
    }
  }

  const handleInput = (e) => {
    setMyQuery(() => e.target.value);
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      fetchArticle();
    }
  };

  const openWiki = () => {
    window.open(`https://en.wikipedia.org/wiki/${article.title}`);
  };

  return (
    <div className="search">
      <input
        type="input"
        placeholder="query"
        value={myQuery}
        onChange={(e) => {
          handleInput(e);
        }}
        onKeyDown={handleKeypress}
      />
      <button type="submit" onClick={fetchArticle}>
        Search
      </button>
      <div className="article-container">
        <h4 className="article-title">{article.title}</h4>
        <div className="article-body">{article.summary}</div>
        <div
          className="readmoreBtn"
          onClick={openWiki}
          onKeyDown={openWiki}
          role="button"
          tabIndex={0}
        >
          Read more on Wikipedia
        </div>
      </div>
    </div>
  );
}

export default Search;
