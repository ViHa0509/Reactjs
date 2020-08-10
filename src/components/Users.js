// import axios  from 'axios';
import React, {Component} from 'react';
// import {API_ENDPOINT} from '../const';
import UserForm from './UserForm';
import { customStyles } from '../components/utils/CustomModal';
import Modal from 'react-modal';

import './Authors.css'

class Users extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            showForm: false,
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
               showForm: false
           });
       }
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

    // onDeleteUser = (id) =>{
    //     this.props.onDeleteUser(id);
    // }

    // onEditUser = async(author) =>{
    //     console.log("ON EDITING AUTHOR")
    //     await this.setState({
    //         showForm: true,
    //         selectedAuthor:{
    //             firstname: author.first_name,
    //             lastname: author.last_name,
    //             email: author.email,
    //             id: author.id
    //         }
    //     });


    // }

    // onToggleForm = () =>{
    //     var role = sessionStorage.getItem('role');
    //     if(role === 'user')
    //     {
    //         this.setState({ modalIsOpen: true });
    //     }
    //     else{
    //         this.setState({
    //             showForm: !this.state.showForm,
    //             selectedAuthor:{
    //                 'username':'',
    //                 'firstname': '',
    //                 'lastname': '',
    //                 'email': '',
    //                 'id': ''
    //             }
    
    //         })
    //     }
    // }

    onLogout = () =>{
        // console.log("asdasdasdasdas")
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
                                <button 
                                    type="button" 
                                    className="btn btn-info"
                                    // onClick={()=>{
                                    //     this.onEditAuthor(author)
                                    // }}
                                >
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button 
                                    // onClick={() => {   
                                    //     this.onDeleteAuthor(author.id)
                                    // }} 
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
                <center><button className="btn btn-primary" >Add New Record</button></center>
                {/* onClick={this.onToggleForm} */}
                {/* <div>
                    {
                        this.state.showForm ? 
                        <AuthorForm 
                            onCreateAuthor={this.props.onCreateAuthor}
                            selectedAuthor={this.state.selectedAuthor}
                            /> : 
                        null
                    }
                </div> */}
                <div><left><button className="btn btn-primary" onClick={this.onLogout}><i className="fa fa-sign" aria-hidden="true"> logout</i></button></left></div>
                <div>
                {/* {
                    this.renderUser(this.state.authors)
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