import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, Router} from  "react-router-dom";
import Login from './components/Login';
import Test from './components/Test';
import Authors from './components/Authors';
import {PrivateRoute} from './PrivateRoute';
import { createBrowserHistory } from 'history';
// import history from './history';
import axios from 'axios';
import {API_ENDPOINT} from './const';

const history = createBrowserHistory();

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            token:'',
            isLogin: false
        }
    }

    // componentDidMount =() =>{
    //     var token = localStorage.getItem('token');
    //     console.log('token', token)
    //     if (!token) {
    //       this.props.history.push("/login")
    //     }
    // }
    onClick = (data) =>{
        console.log(data)
        history.push('/test');
    }

    onLogin = async(data) =>{
        var {username} = data;
        var {password} = data;
        let url = API_ENDPOINT + 'login/';
        let options = {
            method: "POST",
            url: url,
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            data:{
                'username': username,
                'password': password
            }
        };

        await axios({...options}).then((res)=>{
            if(res.data){
                var data = res.data
                this.setState({
                    token: data.token,
                    user_id: res.data.user_id,
                    isLogin: true
                });
                
                sessionStorage.setItem('token', this.state.token);
                sessionStorage.setItem('user_id', this.state.user_id);
                console.log('2222222222222222222222222')
                history.push('/authors')
                console.log('1111111111111111111111111')
                console.log(this.state)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    

    render(){
        var {isLogin} = this.state;
        return (
            <Router  history={history}>
                <Switch>
                    <Route 
                        exact 
                        path="/login" 
                        render={(props)=>(
                            <Login onLogin={this.onLogin} onClick={this.onClick}/>
                        )}/>
                    <Route 
                        exact
                        path="/test"
                        component={Test}/>
                    <PrivateRoute 
                        exact 
                        path="/authors" 
                        component={Authors} 
                        condition={isLogin}/>
                    <Redirect to="/login" from="/"/>
                </Switch>
            </Router>
            
        );
    }
}

export default App;
