// This functional component allows you to share a piece of content with a followedUser
import React from 'react';



//---------------------------------------//
const Share = ( { handleShare, followedUsers } ) => {

  return (
    <ul className="columns is-multiline">
      {followedUsers.map((user, i) =>
        <div key={i} className="column is-one-third">
          <div>
            <img
              className="profile-pic followed-user-show-card"
              src={user.image}
              value={user._id}
              onClick={handleShare}
            />
            <button
              className="center-button followed-user-show-card"
              value={user._id}
              onClick={handleShare}
            >{user.username}</button>
          </div>
        </div>
      )}
    </ul>
  );
};

export default Share;
