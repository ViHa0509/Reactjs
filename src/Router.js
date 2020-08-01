import React from 'react';
import Login from './components/login';
import Authors from './components/Authors';
import { Route, Switch } from 'react-router-dom'

export class Router extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/authors' component={Authors}/>
            </Switch>
        )
    }
}

export default Router;