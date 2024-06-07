import React from 'react';

const Timer = ({ time }) => {
  return <h3>Time Remaining: <span style={{ color: 'yellow' }}>{time}</span>s</h3>;
};

export default Timer;
