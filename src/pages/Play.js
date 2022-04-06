import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p>Adelson vai arrasar no THUNK :rocket:</p>
        <Link to="/feedback">Feedback</Link>
      </div>
    );
  }
}

export default App;
