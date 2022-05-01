import PropTypes from 'prop-types';
import '../styles/Recent.css';

function Recent(props) {
  // eslint-disable-next-line object-curly-newline
  const { queries, getRecentArticle, getRecentArticleKeypress, clearRecent } = props;
  return (
    <div className="recent-card">
      <h4>Recent searches:</h4>

      {queries.length === 0 && <div className="no-recent">No recent searches</div>}

      {queries.map((item) => (
        <div
          key={queries.indexOf(item).toString()}
          className="query-item"
          onClick={(e) => {
            getRecentArticle(item, e);
          }}
          onKeyDown={(e) => {
            getRecentArticleKeypress(item, e);
          }}
          role="link"
          tabIndex={0}
        >
          {item}
        </div>
      ))}

      <div
        className="clear-recent"
        onClick={(e) => {
          clearRecent(e);
        }}
        onKeyDown={(e) => {
          clearRecent(e);
        }}
        role="button"
        tabIndex={0}
      >
        clear recent
      </div>
    </div>
  );
}

export default Recent;

Recent.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.string).isRequired,
  getRecentArticle: PropTypes.func.isRequired,
  getRecentArticleKeypress: PropTypes.func.isRequired,
  clearRecent: PropTypes.func.isRequired,
};
