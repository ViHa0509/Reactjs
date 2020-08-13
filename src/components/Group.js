// import axios  from 'axios';
import React, {Component} from 'react';
// import {API_ENDPOINT} from '../const';
import Register from './Register';
import UserEdit from './UserEdit';
import { customStyles } from './utils/CustomModal';
import Modal from 'react-modal';

import './Authors.css'

class Group extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],

            modalIsOpen: false
        }
    }


    onGetUsers = () =>{
        this.props.onGetUsers();
    }

    componentDidMount =() =>{
        this.onGetUsers();
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }


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
                                <button type="button" className="btn btn-info"> 
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button 
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
                <center><button className="btn btn-primary">Add New User</button></center>
                <div><left><button className="btn btn-primary"><i className="fa fa-sign" aria-hidden="true"> logout</i></button></left></div>
                <div><center><button className="btn btn-primary"><i className="fa fa-user" aria-hidden="true"> Author</i></button></center></div>
                <div>
                {/* {
                    this.renderUser(this.state.users)
                } */}
                </div>
            </div>
        );
    }
}

export default Group;