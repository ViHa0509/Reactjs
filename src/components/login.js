import React, { Component } from 'react';
import axios  from 'axios';
import '../App.css';
import LoginView from './loginView';
import { withRouter } from 'react-router';

class Login extends Component{
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
    }
    
    onLogin =  async (data) =>{
        var {username} = data;
        var {password} = data;
        let url = 'http://10.0.0.61:8000/login/';
        let options = {
            method: 'POST',
            url : url,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "same-origin",
            data: {
                'username' : username,
                'password' : password
            }
        };

        await axios({...options}).then((res)=>{
            if (res.data) {
              this.setState({
                token : res.data.token,
              });
              this.props.history.push("/authors");
            }

            //sessionStorage.setItem('token', this.state.token);
            localStorage.setItem('token', this.state.token);
            console.log("LOGIN SUCCESS");
        }).catch((err)=>{
            console.log(err)
            console.log("LOGIN FAIL, PLEASE TRY AGAIN")
        })
        

    }

    render(){
        return (
          <div className="app">
            <LoginView onLogin={this.onLogin} history={this.props.history}/>
          </div>
        );
    }
}

export default withRouter(Login);
