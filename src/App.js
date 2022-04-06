import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Play from './pages/Play';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/play" component={ Play } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
