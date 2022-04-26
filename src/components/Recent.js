import PropTypes from 'prop-types';
import '../styles/Recent.css';

function Recent(props) {
  const { queries, getRecentArticle } = props;
  return (
    <div className="recent-container">
      <h4>Recent searches:</h4>
      <ul>
        {queries.map((item) => (
          <div
            key={queries.indexOf(item).toString()}
            className="query-item"
            onClick={() => {
              getRecentArticle(item);
            }}
            onKeyDown={() => {
              getRecentArticle(item);
            }}
            role="link"
            tabIndex={0}
          >
            {item}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Recent;

Recent.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.string).isRequired,
  getRecentArticle: PropTypes.func.isRequired,
};
