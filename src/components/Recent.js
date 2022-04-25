import PropTypes from 'prop-types';

function Recent(props) {
  const { queries } = props;
  return (
    <div className="recent-container">
      <h4>Recent searches:</h4>
      <ul>
        {queries.recentQueries.map((item) => (
          <li key={queries.recentQueries.indexOf(item).toString()} className="query-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recent;

Recent.propTypes = {
  queries: PropTypes.shape({
    recentQueries: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
