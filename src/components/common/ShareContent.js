import React from 'react';

const Share = ( props ) => {

  return (
    <div>

      <button
        onClick={props.handleShareToggle}
      >Share</button>

      {props.content &&
      <ul className="columns is-multiline">
        {props.content.followedUsers.map((user, i) =>
          <div key={i} className="column is-one-third">
            <a>{user.username}</a>
          </div>
        )}
      </ul>
      }
    </div>
  );
};

export default Share;
