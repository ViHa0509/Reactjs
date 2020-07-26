import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
function App(){
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
