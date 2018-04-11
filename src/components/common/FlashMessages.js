import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessages extends React.Component {

  render() {

    const messages = Flash.getMessages();
    Flash.clearMessages();

    return (
      <div className="container">
        {messages && Object.keys(messages).map((type, i) =>
          <div key={i} className="flash">{messages[type]}</div>
        )}
      </div>
    );
  }
}

export default FlashMessages;
