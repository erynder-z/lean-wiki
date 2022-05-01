import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiSync } from '@mdi/js';
import '../styles/Featured.css';

function Featured(props) {
  const { article, openWiki } = props;

  return (
    <div className="featured-card">
      <h1>Todays Featured Article</h1>
      <h4 className="article-title">{article.displaytitle}</h4>
      <div className="article-body">
        {article.summary === 'fetching data' ? (
          <Icon path={mdiSync} size={3} spin />
        ) : (
          article.summary
        )}
      </div>
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
  article: PropTypes.shape({
    displaytitle: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    onthisday: PropTypes.arrayOf(
      PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        pages: PropTypes.array,
        text: PropTypes.string,
        year: PropTypes.number,
      }),
    ),
  }).isRequired,
  openWiki: PropTypes.func.isRequired,
};
