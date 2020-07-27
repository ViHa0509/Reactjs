import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import { withRouter } from 'react-router';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            token:'',
        }
    }

    componentDidMount =() =>{
        var token = localStorage.getItem('token');
        console.log('token', token)
        if (!token) {
          this.props.history.push("/login")
        }
    }
    

    render(){
        console.log('this.props', this.props)
        return (
            <div className="App">
                <Router />
            </div>
        );
    }
}

export default withRouter(App);
