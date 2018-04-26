// This functional component allows users to search for a piece of content
import React from 'react';



//---------------------------------------//
const Search = ({ handleChange, handleSubmit }) => {

  // These are the inline styles for the component
  const formStyles = {
    width: '100%',
    margin: '10px auto'
  };

  const inputStyles = {
    width: '100%',
    color: 'white',
    lineHeight: '1em',
    fontSize: '30px',
    outline: 'none',
    border: 'none',
    borderBottom: '4px solid white',
    marginBottom: '10px',
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
