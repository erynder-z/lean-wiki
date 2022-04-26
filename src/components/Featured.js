import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Featured.css';

function Featured(props) {
  const { article, openWiki } = props;

  return (
    <div className="featured-card">
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

Featured.propTypes = {
  article: PropTypes.objectOf(PropTypes.string).isRequired,
  openWiki: PropTypes.func.isRequired,
};
