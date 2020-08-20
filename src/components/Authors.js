// import axios  from 'axios';
import React, {Component} from 'react';
// import {API_ENDPOINT} from '../const';
import AuthorForm from './AuthorForm';
import { customStyles } from '../components/utils/CustomModal';
import Modal from 'react-modal';
import './Authors.css'

class Authors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            showForm: false,
            selectedAuthor: {
            'firstname': '',
            'lastname': '',
            'email': '',
            'id': '',
            },
            modalIsOpen: false
        }
    }

   componentWillReceiveProps = (nextProps) =>{
       if(nextProps.authors !== this.state.authors){
           this.setState({
               authors: nextProps.authors,
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


    onGetAuthors = () =>{
        this.props.onGetAuthors();
    }

    onDeleteAuthor = (id) =>{
        this.props.onDeleteAuthor(id);
    }

    onEditAuthor = async(author) =>{
        console.log("ON EDITING AUTHOR")
        await this.setState({
            showForm: true,
            selectedAuthor:{
                firstname: author.first_name,
                lastname: author.last_name,
                email: author.email,
                id: author.id
            }
        });


    }

    onToggleForm = () =>{
        var role = sessionStorage.getItem('role');
        if(role === 'user')
        {
            this.setState({ modalIsOpen: true });
        }
        else{
            this.setState({
                showForm: !this.state.showForm,
                selectedAuthor:{
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
        this.onGetAuthors();
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }
    
    // onRedirectUser = () =>{
    //     this.props.onRedirectUser()
    // }
    // // renderUser = (data) => {
    // //     const userId = 1;
    // //     console.log('data',data)
    // //     return data && data.map(item => {
    // //         if (item.id === userId) {
    // //             return (
    // //                 <div>
    // //                     <div>{item.id}</div>
    // //                     <div>{item.first_name}</div>
    // //                 </div>
    // //             );
    // //         }
    // //     })    
    // // }

    onRedirectToUser = () =>{
        this.props.onRedirectToUser();
    }
    
    onRedirectToGroup = () =>{
        this.props.onRedirectToGroup();
    }

    render(){
        return(
            <div>
                <table className="table table-striped table-bordered table-sm tinymask ">
                <thead className="thead-dark">
                    <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                {this.state.authors.map((author, index) => (
                    <tr className="white-text" key={index}>
                        <td>{author.id}</td>
                        <td>{author.first_name}</td> 
                        <td>{author.last_name}</td>
                        <td>{author.email}</td>
                        <td>
                            <div className="icon-div">
                                <button 
                                    type="button" 
                                    className="btn btn-info"
                                    onClick={()=>{
                                        this.onEditAuthor(author)
                                    }}>
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button 
                                    onClick={() => {   
                                        this.onDeleteAuthor(author.id)
                                    }} 
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
                <center><button className="btn btn-success" onClick={this.onToggleForm}>Add New Record</button></center>
                <div>
                    {
                        this.state.showForm ? 
                        <AuthorForm 
                            onCreateAuthor={this.props.onCreateAuthor}
                            selectedAuthor={this.state.selectedAuthor}
                            /> : 
                        null
                    }
                </div>
                <div><left><button className="btn btn-primary" onClick={this.onLogout}><i className="fas fa-sign-in-alt" aria-hidden="true"> logout</i></button></left></div>
                <div>
                    <center>
                        <button className="btn btn-primary" onClick={this.onRedirectToUser}><i className="fa fa-user" aria-hidden="true"> User</i></button>
                        <button className="btn btn-success" onClick={this.onRedirectToGroup}><i className="fa fa-lock" aria-hidden="true"> Group</i></button>
                    </center>
                </div>
                <div>
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

export default Authors;