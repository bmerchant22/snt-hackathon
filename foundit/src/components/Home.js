import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Found It!</h1>
      <nav>
        <ul>
          <li>
            <Link to="/lost-items">Lost Items</Link>
          </li>
          <li>
            <Link to="/found-items">Found Items</Link>
          </li>
          <li>
            <Link to="/report-lost">Report Lost Item</Link>
          </li>
          <li>
            <Link to="/report-found">Report Found Item</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
