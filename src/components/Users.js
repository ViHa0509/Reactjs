// import axios  from 'axios';
import React, {Component} from 'react';
// import {API_ENDPOINT} from '../const';
import Register from './Register';
import UserEdit from './UserEdit';
import { customStyles } from '../components/utils/CustomModal';
import Modal from 'react-modal';

import './Authors.css'

class Users extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showRegisterForm: false,
            showEditForm: false,
            selectedUSer: {
            'username':'',
            'firstname': '',
            'lastname': '',
            'email': '',
            'id': '',
            },
            modalIsOpen: false
        }
    }

    componentWillReceiveProps = (nextProps) =>{
       if(nextProps.users !== this.state.users){
           this.setState({
               users: nextProps.users,
               showRegisterForm: false,
               showEditForm: false,
           });
       }
    }

    onCreateUser = (data) =>{
        this.props.onCRUser(data);
    }

    onEditedUser = (data) =>{
        this.props.onEditUser(data);
    }

    onChange = async (event) =>{
        console.log('ON CHANGING VALUE')
        var target = event.target;
        var name = target.name;
        var value = target.value;
        await this.setState({
            [name] : value
        });
      }


    onGetUsers = () =>{
        this.props.onGetUsers();
    }

    onDeleteUser = (id) =>{
        this.props.onDeleteUser(id);
    }

    onSelectedUser = async(user) =>{
        console.log("ON EDITING USER")
        console.log('user', user)
        await this.setState({
            showEditForm: true,
            selectedUser:{
                firstname: user.first_name,
                lastname: user.last_name,
                email: user.email,
                id: user.id
            }
        });
    }

    onRegisterForm = () =>{
        var role = sessionStorage.getItem('role');
        if(role === 'user')
        {
            this.setState({ modalIsOpen: true });
        }
        else{
            this.setState({
                showRegisterForm: !this.state.showRegisterForm,
            })
        }
    }

    onEditForm = () =>{
        var role = sessionStorage.getItem('role');
        if(role === 'user')
        {
            this.setState({ modalIsOpen: true });
        }
        else{
            this.setState({
                showEditForm: !this.state.showEditForm,
                selectedUser:{
                    'firstname': '',
                    'lastname': '',
                    'email': '',
                    'id': ''
                }
    
            })
        }
    }


    onLogout = () =>{
        sessionStorage.removeItem('token');
        window.location.reload()
    }

    componentDidMount =() =>{
        this.onGetUsers();
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    // renderUser = (data) => {
    //     const userId = 1;
    //     console.log('data',data)
    //     return data && data.map(item => {
    //         if (item.id === userId) {
    //             return (
    //                 <div>
    //                     <div>{item.id}</div>
    //                     <div>{item.first_name}</div>
    //                 </div>
    //             );
    //         }
    //     })
       
    // }
        
    onRedirectToAuthor = () =>{
        this.props.onRedirectToAuthor();
    }

    

    render(){
        return(
            <div>
                <table className="table table-striped table-bordered table-sm tinymask ">
                <thead className="thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                {this.state.users.map((user, index) => (
                    <tr className="white-text" key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.first_name}</td> 
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>
                            <div className="icon-div">
                                <button type="button" className="btn btn-info" 
                                    onClick={()=>{this.onSelectedUser(user)}}> 
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button 
                                    onClick={() => { this.onDeleteUser(user.id)}} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                           
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
                <center><button className="btn btn-primary" onClick={this.onRegisterForm}>Add New User</button></center>
                <div>
                    {
                        this.state.showRegisterForm ? 
                        <Register
                            onCUser={this.onCreateUser}
                            /> : 
                        null
                    }
                </div>
                <div>
                    {
                        this.state.showEditForm ? 
                        <UserEdit
                            onEUser={this.onEditedUser}
                            selectedUser={this.state.selectedUser}
                            /> : 
                        null
                    }
                </div>
                <div><left><button className="btn btn-primary" onClick={this.onLogout}><i className="fa fa-sign" aria-hidden="true"> logout</i></button></left></div>
                <div><center><button className="btn btn-primary" onClick={this.onRedirectToAuthor}><i className="fa fa-user" aria-hidden="true"> Author</i></button></center></div>
                <div>
                {/* {
                    this.renderUser(this.state.users)
                } */}
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
                    <div className="error-message">You dont have permission to create</div>
                    <button className="btn-close" onClick={this.closeModal}>Close</button>
                </Modal>
            </div>
        );
    }
}

export default Users;