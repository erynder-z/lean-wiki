import PropTypes from 'prop-types';
import '../styles/Recent.css';

function Recent(props) {
  const { queries, getRecentArticle, getRecentArticleKeypress } = props;
  return (
    <div className="recent-card">
      <h4>Recent searches:</h4>

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
    </div>
  );
}

export default Recent;

Recent.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.string).isRequired,
  getRecentArticle: PropTypes.func.isRequired,
  getRecentArticleKeypress: PropTypes.func.isRequired,
};
