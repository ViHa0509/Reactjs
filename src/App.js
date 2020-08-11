import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, Router, useLocation } from "react-router-dom";
import Login from './components/Login';
import Authors from './components/Authors';
import Users from './components/Users';
// import {PrivateRoute} from './PrivateRoute';
import { createBrowserHistory } from 'history';
// import history from './history';
import axios from 'axios';
import { API_ENDPOINT } from './const';
import Modal from 'react-modal';
import { customStyles } from './components/utils/CustomModal';

const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            authors: [],
            users:[],
            role:'',
            isLogin: false,
            modalIsOpen: false
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
        let isCheckvalid = await this.checkValidToken()
        var currentLocation = window.location.pathname;
        if (isCheckvalid === true) {
            await this.setState({ isLogin: isCheckvalid })
            console.log('current url:',''+ currentLocation);
            if(currentLocation === '/login' || currentLocation === '/')
            {
                history.push('/authors');
            }
            else {
                history.push(currentLocation);
            }
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
                var data = res.data;
                this.setState({
                    token: data.access_token,
                    role: data.role,
                    isLogin: true
                });

                sessionStorage.setItem('token', this.state.token);
                sessionStorage.setItem('role', this.state.role);
                // console.log(this.state.token)
                history.push('/authors')
            }
        }).catch((err) => {
            console.log(err);          
            window.confirm('Invalid username or password')
        })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onGetAuthors = async () => {
        var token = sessionStorage.getItem('token');
        if (token) {
            let url = API_ENDPOINT + 'authors/';
            // console.log(token)
            // console.log(url)
            let options = {
                method: "GET",
                url: url,
                headers: {
                    "Authorization": "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            }

            await axios({ ...options }).then((res) => {
                 console.log(res)
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

    onGetUsers = async () => {
        var token = sessionStorage.getItem('token');
        if (token) {
            let url = API_ENDPOINT + 'users/';
            let options = {
                method: "GET",
                url: url,
                headers: {
                    "Authorization": "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            }

            await axios({ ...options }).then((res) => {
                if (res) {
                    var userArr = res.data;
                    this.setState({
                        users: userArr
                    });
                }
            }).catch((err) => {
                console.log(err)
            })


        }
    }

    onCreateAuthor = (data) => {
        // console.log(data);
        var token = sessionStorage.getItem('token');
        var role = sessionStorage.getItem('role');
        // console.log('role', role)
        if (token) {
            if (data.id) {
                console.log("UPDATING AUTHOR IN APP ");
                let {firstname, lastname, email, id} = data;
                let url = API_ENDPOINT + 'authors/' + id + '/';
                let options = {
                    method: 'PATCH',
                    url: url,
                    headers: {
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
                    // window.confirm('Email Existed!')
                })
            }
            else {
                if(role==='admin')
                {
                    console.log("CREATE NEW AUTHOR IN APP")
                    let { firstname, lastname, email } = data;
                    let url = API_ENDPOINT + 'authors/';
                    let options = {
                        method: 'POST',
                        url: url,
                        headers: {
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
                else
                {
                    window.confirm('You dont have permission to create');
                    this.onGetAuthors();
                }

            }
        }

    }

    onCreateUser = (data) => {
        var token = sessionStorage.getItem('token');
        var role = sessionStorage.getItem('role');
        if (token) 
        {
            if(role === 'admin')
            {
                console.log("CREATE NEW USER IN APP")
                let {email,username,password } = data;
                let url = API_ENDPOINT + 'register/';
                let options = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        'email':email,
                        'username':username,
                        'password': password
                    }
                };
                axios({ ...options }).then((res) => {
                    if (res && res.status === 201) {
                        this.onGetUsers();
                    }
                }).catch((err) => {
                    console.log(err);
                    window.confirm('Email Existed!')
                })
            }
            else
            {
                window.confirm('You dont have permission to create');
                this.onGetUsers();
            }
        }

    }

    onEditUser = (data) => {
        var token = sessionStorage.getItem('token');
        if (token) {
            if (data.id) {
                console.log("UPDATING AUTHOR IN APP ");
                let {firstname, lastname, email, id} = data;
                let url = API_ENDPOINT + 'users/' + id + '/';
                let options = {
                    method: 'PATCH',
                    url: url,
                    headers: {
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
                        this.onGetUsers();
                    }
                }).catch((err)=>{
                    console.log(err);              
                    // window.confirm('Email Existed!')
                })
            }
        }

    }

    onDeleteAuthor = async (data) => {
        // console.log("ON DELETE ID= ", data);
        var token = sessionStorage.getItem('token');
        var role = sessionStorage.getItem('role');
        if (token) {
            if(role === 'admin')
            {
                if (window.confirm('Are you sure you wish to delete this item?'))
                {
                    var id = data;
                    var url = API_ENDPOINT + 'authors/' + id + "/";
                    var options = {
                        method: 'DELETE',
                        url: url,
                        headers: {
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
            else {
                // window.confirm('You dont have permission to delete');
                this.onGetAuthors();
                this.setState({ modalIsOpen: true });
            }

        }
    }

    // onRedirectToUser =  () => {
    //     console.log("asdasdasdasdasdas")
    //     // let isCheckvalid = await this.checkValidToken()
    //     // if (isCheckvalid === true) {
    //     //     await this.setState({ isLogin: isCheckvalid })
    //     //     history.push('/users');
    //     // }
    //     // else {
    //     //     history.push('/login')
    //     // }
    // }

    onRedirectToUser = async () =>{
        let isCheckvalid = await this.checkValidToken()
        if (isCheckvalid === true) {
            await this.setState({ isLogin: isCheckvalid })
            history.push('/users');
        }
        else {
            history.push('/login')
        }
    }
    
    onRedirectToAuthor = async () =>{
        let isCheckvalid = await this.checkValidToken()
        if (isCheckvalid === true) {
            await this.setState({ isLogin: isCheckvalid })
            history.push('/authors');
        }
        else {
            history.push('/login')
        }
    }

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
                                onEditAuthor={this.onEditAuthor}
                                onRedirectToUser={this.onRedirectToUser}
                                 />
                        )} />

                    <Route
                        exact
                        path="/users"
                        render={(props) => (
                            <Users
                                onGetUsers={this.onGetUsers}
                                users={this.state.users}
                                onCRUser={this.onCreateUser}
                                onEditUser={this.onEditUser}
                                onRedirectToAuthor={this.onRedirectToAuthor} 
                            />
                        )} />
                    <Redirect to="/login" from="/" />
                </Switch>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <div className="error-message">You dont have permission to delete</div>
                    <button className="btn-close" onClick={this.closeModal}>Close</button>
                </Modal>
            </Router>

        );
    }
}

export default App;
