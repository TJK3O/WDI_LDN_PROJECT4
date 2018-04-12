import React from 'react';

const Search = ({ handleChange, handleSubmit }) => {

  const formStyles = {
    width: '100%',
    margin: '10px auto'
  };

  const inputStyles = {
    width: '100%',
    color: 'white',
    lineHeight: '3em',
    fontSize: '30px',
    outline: 'none',
    border: 'none',
    borderBottom: '4px solid white',
    backgroundColor: 'rgba(255,255,255,0)'
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={formStyles}
    >
      <input
        style={inputStyles}
        onChange={handleChange}
        placeholder="search"
      />
    </form>
  );
};

export default Search;
