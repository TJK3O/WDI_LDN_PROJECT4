import React from 'react';
// Flash gives us some static functions for setting, getting and clearing messages
import Flash from '../../lib/Flash';



//---------------------------------------//
class FlashMessages extends React.Component {

  render() {
    // We store the current messages in a variable before clearing the messages
    const messages = Flash.getMessages();
    Flash.clearMessages();

    return (
      <div className="container">
        {messages && Object.keys(messages).map((type, i) =>
          // We display the value associated with the key type
          <div key={i} className="flash">{messages[type]}</div>
        )}
      </div>
    );
  }
}

export default FlashMessages;
