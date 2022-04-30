import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Search.css';
import { mdiLayersSearchOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Recent from './Recent';

function Search(props) {
  const { darkmode } = props;
  const localdata = localStorage.getItem('queries');
  const [article, setArticle] = useState({
    title: null,
    summary: null,
  });

  const [currentQuery, setMyQuery] = useState('');
  const [queries, setQueries] = useState(localdata ? JSON.parse(localdata) : []);

  const apiEndpoint = 'https://en.wikipedia.org/w/api.php';
  const params =
    'format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';

  async function fetchArticle(query) {
    setArticle(() => ({
      title: null,
      summary: 'fetching data',
    }));
    try {
      const response = await fetch(`${apiEndpoint}?${params}${query}`);

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
      if (!queries.includes(currentQuery)) {
        if (currentQuery !== '') {
          setQueries(() => [...queries, currentQuery]);
        }
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
      fetchArticle(currentQuery);
      e.target.blur();
    }
  };

  const handleSubmit = () => {
    fetchArticle(currentQuery);
  };

  const getRecentArticle = (query, e) => {
    fetchArticle(query);
    e.target.blur();
  };

  const getRecentArticleKeypress = (query, e) => {
    if (e.keyCode === 13) {
      fetchArticle(query);
    }
    e.target.blur();
  };

  const openWiki = (e) => {
    e.target.blur();
    window.open(`https://en.wikipedia.org/wiki/${article.title}`);
  };

  useEffect(() => {
    localStorage.setItem('queries', JSON.stringify(queries));
  }, [queries]);

  return (
    <div className={`search ${darkmode === true ? 'dark' : null}`}>
      <div role="article" className="article-container">
        <h4 className="article-title">{article.title}</h4>
        <div className="article-body">{article.summary}</div>
        {article.title && article.summary !== 'No matching article found...' && (
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
        {article.title === null && (
          <div className="placeholder-container">
            <Icon path={mdiLayersSearchOutline} size={3} color="black" className="icon" />
            <h2>Enter your search below</h2>
          </div>
        )}
      </div>
      <Recent
        queries={queries}
        getRecentArticle={getRecentArticle}
        getRecentArticleKeypress={getRecentArticleKeypress}
      />
      <div className="searchinput">
        <input
          type="input"
          placeholder="enter your search..."
          value={currentQuery}
          onChange={(e) => {
            handleInput(e);
          }}
          onKeyDown={handleKeypress}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;

Search.propTypes = {
  darkmode: PropTypes.bool.isRequired,
};
