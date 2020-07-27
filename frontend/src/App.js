import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
    }
  }

  componentDidMount = () =>{
    var token = sessionStorage.getItem('token')
    console.log(token)
  }

  onLogin = async (data) =>{
    var {username} = data;
    var {password} = data;
    let url = 'http://54.254.255.101:8000/login/';
    let options = {
      method: 'POST',
      url: url,
      headers: {
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
      console.log(res.data);
      this.setState({
        token: res.data,
      });

      sessionStorage.setItem('token', this.state.token);
      console.log("LOGIN SUCCESS");
    }).catch((err)=>{
      console.log(err)
      console.log("LOGIN FAIL, PLEASE TRY AGAIN")
    })


  }

  render(){
    return (
      <div className="App">
        <Login onLogin={this.onLogin}/>
      </div>
    );
  }
  
}

export default App;
