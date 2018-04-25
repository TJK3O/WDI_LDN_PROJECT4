import React from 'react';
import { Link } from 'react-router-dom';

const ResultsDisplay = ({ results, items, searchItems }) => {
  if(results)
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
  else if(items)
    return (
      <ul className="columns is-multiline is-mobile">
        {items.map((track, i) =>
          <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-third-tablet is-one-quarter-desktop">
            {track.track &&
              <div>
                <Link to={`/content/music/${track.track.external_ids.isrc}`}>
                  <img src={track.track.album.images[0].url} />
                </Link>
                <h2>{track.track.album.name}</h2>
                {track.track.album.artists.map((artists, j) =>
                  <h3 key={j}>{artists.name}</h3>)}
              </div>
            }
            {!track.track &&
              <div>
                <Link to={`/content/music/${track.external_ids.isrc}`}>
                  <img src={track.album.images[0].url} />
                </Link>
                <h2>{track.album.name}</h2>
                {/* artists are in an array so we need to map over them */}
                {track.album.artists.map((artists, j) =>
                  <h3 key={j}>{artists.name}</h3>)}
              </div>
            }
          </div>
        )}
      </ul>
    );
  // else if(items.)
  //   return (
  //     <ul className="columns is-multiline content-grid is-mobile">
  //       {searchItems.map((track, i) =>
  //         <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop">
  // <Link to={`/content/music/${track.external_ids.isrc}`}>
  //   <img src={track.album.images[0].url} />
  // </Link>
  //           <h2>{track.album.name}</h2>
  //           artists are in an array so we need to map over them
  //           {track.album.artists.map((artists, j) =>
  //             <h3 key={j}>{artists.name}</h3>)}
  //         </div>)}
  //     </ul>
  //   );

};

export default ResultsDisplay;
