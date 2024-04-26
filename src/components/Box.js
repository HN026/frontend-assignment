import React from 'react';

const ColoredBox = ({ thiscolor, word }) => {
  const boxStyles = {
    backgroundColor: thiscolor,
    flex: 1,
    height: '13px',
    width: '13px',
    marginRight: '5px',
  };

  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyles}>
      <div style={boxStyles} />
      {word}
    </div>
  );
};

export default ColoredBox;