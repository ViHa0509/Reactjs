// import axios  from 'axios';
import React, {Component} from 'react';
// import {API_ENDPOINT} from '../const';
// import Register from './Register';
// import UserEdit from './UserEdit';
// import { customStyles } from './utils/CustomModal';
// import Modal from 'react-modal';
import './Authors.css'

class Group extends Component{
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            modalIsOpen: false
        }
    }

    componentWillReceiveProps = (nextProps) =>{
        if(nextProps.groups !== this.state.groups){
            this.setState({
                groups: nextProps.groups,
                showForm: false
            });
        }
    }

    onGetGroups = () =>{
        this.props.onGetGroups();
    }

    componentDidMount =() =>{
        this.onGetGroups();
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }


    onRedirectToAuthor = () =>{
        this.props.onRedirectToAuthor();
    }

    onRedirectToUser = () =>{
        this.props.onRedirectToUser();
    }

    onLogout = () =>{
        sessionStorage.removeItem('token');
        window.location.reload()
    }

    render(){
        console.log('abcdefg',this.state.groups)
        return(
            <div>
                <table className="table table-striped table-bordered table-sm tinymask ">
                <thead className="thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>Permissions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                
                {this.state.groups.map((group, index) =>(
                    <tr key={index}>
                        <td>{group.id}</td>
                        <td>{group.name}</td>
                        <td>
                            {group.permissions.map((perm,i)=>(<li key={i}>{perm.name}</li>))}
                        </td>  
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
                <center><button className="btn btn-success">Add New Group</button></center>
                <div><left><button className="btn btn-primary" onClick={this.onLogout}><i className="fas fa-sign-in-alt" aria-hidden="true"> logout</i></button></left></div>
                <div>
                    <center>
                        <button className="btn btn-primary" onClick={this.onRedirectToAuthor}><i className="fa fa-user" aria-hidden="true"> Author</i></button>
                        <button className="btn btn-danger" onClick={this.onRedirectToUser}><i className="fa fa-user" aria-hidden="true"> User</i></button>
                    </center>
                </div>
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