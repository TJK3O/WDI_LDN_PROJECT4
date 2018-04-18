import React from 'react';
import { Link } from 'react-router-dom';

const ResultsDisplay = ({ results }) => {
  return (
    <ul className="columns is-multiline is-mobile">
      {results.map((film, i) =>
        <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-third-tablet is-one-quarter-desktop">
          <Link to={`/content/films/${film.id}`}>
            <img src={film.poster_path ? `https://image.tmdb.org/t/p/w500/${film.poster_path}` : '/assets/poster-placeholder.png'} />
          </Link>
          <h1>{film.original_title}</h1>
        </div>
      )}
    </ul>
  );
};

export default ResultsDisplay;
