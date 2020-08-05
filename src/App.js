import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, Router } from "react-router-dom";
import Login from './components/Login';
import Authors from './components/Authors';
// import {PrivateRoute} from './PrivateRoute';
import { createBrowserHistory } from 'history';
// import history from './history';
import axios from 'axios';
import { API_ENDPOINT } from './const';

const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            authors: [],
        }
    }


    checkValidToken = async () => {
        var token = sessionStorage.getItem('token');
        // console.log(token)
        var isValid = false;
        if (token) {
            let url = API_ENDPOINT + 'api/token/verify/';
            let options = {
                method: 'POST',
                url: url,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                data: {
                    "token": token
                }
            };

            await axios({ ...options }).then((res) => {
                if (res.status === 200) {
                    isValid = true
                }
            }).catch((err) => {
                console.log(err)
            })
        }

        return isValid;
    }

    componentDidMount = async () => {
        var { isLogin } = this.state;
        isLogin = await this.checkValidToken()
        if (isLogin === true) {
            await this.setState({ isLogin })
            history.push('/authors');
        }
        else {
            history.push('/login')
        }
    }


    onLogin = async (data) => {
        var { username } = data;
        var { password } = data;
        let url = API_ENDPOINT + 'login/';
        let options = {
            method: "POST",
            url: url,
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            data: {
                'username': username,
                'password': password
            }
        };

        await axios({ ...options }).then((res) => {
            if (res.data) 
            {
                var data = res.data
                this.setState({
                    token: data.access,
                    isLogin: true
                });

                sessionStorage.setItem('token', this.state.token);
                history.push('/authors')
            }
        }).catch((err) => {
            console.log(err);          
            window.confirm('Invalid username or password')
        })
    }


    onGetAuthors = async () => {
        var token = sessionStorage.getItem('token');
        if (token) {
            let url = API_ENDPOINT + 'book/authors/';
            console.log(url)
            let options = {
                method: "GET",
                url: url,
                header: {
                    "Authorization": "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            }

            await axios({ ...options }).then((res) => {
                //  console.log(res)
                if (res) {
                    var authorArr = res.data;
                    this.setState({
                        authors: authorArr
                    });
                    // console.log(this.state.author)
                }
            }).catch((err) => {
                console.log(err)
            })


        }
    }

    onCreateAuthor = (data) => {
        console.log(data);
        var token = sessionStorage.getItem('token');
        if (token) {
            if (data.id !== '') {
                console.log("UPDATING AUTHOR IN APP ");
                let {firstname, lastname, email, id} = data;
                let url = API_ENDPOINT + 'book/authors/' + id + '/';
                let options = {
                    method: 'PATCH',
                    url: url,
                    header: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        'first_name': firstname,
                        'last_name': lastname,
                        'email': email
                    }
                };
                

                axios({...options}).then((res)=>{
                    console.log(res)
                    if(res && res.status === 200){
                        this.onGetAuthors();
                    }
                }).catch((err)=>{
                    console.log(err);              
                    window.confirm('Email Existed!')
                })
            }
            else {
                console.log("CREATE NEW AUTHOR IN APP")
                let { firstname, lastname, email } = data;
                let url = API_ENDPOINT + 'book/authors/';
                let options = {
                    method: 'POST',
                    url: url,
                    header: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        'first_name': firstname,
                        'last_name': lastname,
                        'email': email
                    }
                };
                axios({ ...options }).then((res) => {
                    if (res && res.status === 201) {
                        this.onGetAuthors();
                    }
                }).catch((err) => {
                    console.log(err);
                    window.confirm('Email Existed!')
                })

            }
        }

    }

    onDeleteAuthor = async (data) => {
        // console.log("ON DELETE ID= ", data);
        var token = sessionStorage.getItem('token');
        if (token) {
            var id = data;
            var url = API_ENDPOINT + 'book/authors/' + id + "/";
            var options = {
                method: 'DELETE',
                url: url,
                header: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                credentials: "same-origin"
            }
            await axios({ ...options }).then((res) => {

                if (res && res.status === 204) {
                    this.onGetAuthors();
                }
            }).catch((err) => {
                console.log(err)
            })

        }
    }

    // onEditAuthor = (data) => {
    //     // console.log("ON EDIT ID= ", data);
    // }

    

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={(props) => (
                            <Login onLogin={this.onLogin} />
                        )} />

                    <Route
                        exact
                        path="/authors"
                        render={(props) => (
                            <Authors
                                onGetAuthors={this.onGetAuthors}
                                authors={this.state.authors}
                                onCreateAuthor={this.onCreateAuthor}
                                onDeleteAuthor={this.onDeleteAuthor}
                                onEditAuthor={this.onEditAuthor} />
                        )} />
                    <Redirect to="/login" from="/" />
                </Switch>
            </Router>

        );
    }
}

export default App;
