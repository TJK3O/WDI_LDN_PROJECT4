import React from 'react';

const Search = ({ handleChange, handleSubmit }) => {

  const formStyles = {
    width: '400px',
    margin: '10px auto'
  };

  const inputStyles = {
    width: '100%',
    color: 'grey',
    lineHeight: '1.5em',
    fontSize: '25px',
    outline: 'none',
    border: 'none',
    borderBottom: '4px solid grey',
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
