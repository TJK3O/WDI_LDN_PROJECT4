import React from 'react';
import { Link } from 'react-router-dom';

// We import props from the indexroute so that we can display content stored in that components state
const ResultsDisplay = ({ films, music, users, tv }) => {

  // Using an if else statement we only return the ul relevant to the mediatype passed through props
  if(music)
    return (
      <ul className="columns is-multiline is-mobile">
        {/* Here we map over each track and display a linked image, title and artist */}
        {music.map((track, i) =>
          <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-third-tablet is-one-quarter-desktop">
            {/* The object keys are different for topfifty and search so we use the condition track.track && to show only if no search result has been entered */}
            {track.track &&
              <div>
                <Link to={`/content/music/${track.track.external_ids.isrc}`}>
                  <img src={track.track.album.images[0].url} />
                </Link>
                <h2>{track.track.album.name}</h2>
                {/* A second map is needed because the artists are stored in an array */}
                {track.track.album.artists.map((artists, j) =>
                  <h3 key={j}>{artists.name}</h3>)}
              </div>
            }
            {/* As with above, this section only displays if the props contains a search result */}
            {!track.track &&
              <div>
                <Link to={`/content/music/${track.external_ids.isrc}`}>
                  <img src={track.album.images[0].url} />
                </Link>
                <h2>{track.album.name}</h2>
                {/* A second map is needed because the artists are stored in an array */}
                {track.album.artists.map((artists, j) =>
                  <h3 key={j}>{artists.name}</h3>)}
              </div>
            }
          </div>
        )}
      </ul>
    );

  else if(films)
    return (
      <ul className="columns is-multiline is-mobile">
        {films.map((film, i) =>
          <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-third-tablet is-one-quarter-desktop">
            <Link to={`/content/films/${film.id}`}>
              {/* This ternary shows a placeholder if the poster_path is undefined */}
              <img src={film.poster_path ? `https://image.tmdb.org/t/p/w500/${film.poster_path}` : '/assets/poster-placeholder.png'} />
            </Link>
            <h1>{film.original_title}</h1>
          </div>
        )}
      </ul>
    );

  else if(tv)
    return (
      <ul className="columns is-multiline is-mobile">
        {tv.map((tv, i) =>
          <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-third-tablet is-one-quarter-desktop">
            <Link to={`/content/tv/${tv.id}`}>
              {/* This ternary shows a placeholder if the poster_path is undefined */}
              <img src={tv.poster_path ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}` : '/assets/poster-placeholder.png'} />
            </Link>
            <h1>{tv.original_title}</h1>
          </div>
        )}
      </ul>
    );


  else if(users)
    return (
      <ul className="columns is-multiline is-mobile">
        {users.map((user, i) =>
          <div key={i} className="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-third-tablet is-one-quarter-desktop">
            <Link to={`/user/${user._id}`}>
              <img
                className="profile-pic"
                src={user.image}
              />
              <h1 className="indexpage-user">{user.username}</h1>
            </Link>
          </div>
        )}
      </ul>
    );
};

export default ResultsDisplay;
