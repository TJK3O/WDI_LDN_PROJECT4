// This component loads if no matching page is found
import React from 'react';
import { Link } from 'react-router-dom';



//---------------------------------------//
const NotFound = () => {
  return (
    <div className="show-container">
      <h1 className="home-main-logo">c o n t e n t</h1>
      <h1 className="title">4 0 4 : &nbsp; n o t &nbsp; f o u n d</h1>
      <div  className="home-button">
        <Link to="/">h o m e</Link>
      </div>
    </div>
  );
};

export default NotFound;
