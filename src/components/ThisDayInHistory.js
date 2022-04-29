import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ThisDayInHistory.css';

function ThisDayInHistory(props) {
  const { onthisday } = props;

  const today = new Date();

  const month = today.getMonth() + 1;
  const day = today.getDate();
  const monthFormatted = month.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return (
    <div className="history-card">
      <h1>What happened on this day in history?</h1>
      <h4>{`${monthFormatted}/${day}`}</h4>
      {onthisday.map((item) => (
        <div key={onthisday.indexOf(item).toString()} className="day-item">
          <h5 className="day-title">{item.year}</h5>
          <p className="day-body">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ThisDayInHistory;

ThisDayInHistory.propTypes = {
  onthisday: PropTypes.arrayOf(
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      pages: PropTypes.array,
      text: PropTypes.string,
      year: PropTypes.number,
    }),
  ).isRequired,
};
