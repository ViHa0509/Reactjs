// import axios  from 'axios';
import React, {Component} from 'react';
// import {API_ENDPOINT} from '../const';
import AuthorForm from './AuthorForm';

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
            'id': ''
            }
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

    // onCreateAuthor = (event) =>{
    //     event.preventDefault();
    //     this.props.onCreateAuthor(this.state);
    // }

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

    onLogout = () =>{
        console.log("asdasdasdasdas")
        sessionStorage.removeItem('token');
        window.location.reload()
    }

    componentDidMount =() =>{
        this.onGetAuthors();
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
                                        if (window.confirm('Are you sure you wish to delete this item?'))   
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
                <center><button className="btn btn-primary" onClick={this.onToggleForm}>Add New Record</button></center>
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
                <div><left><button className="btn btn-primary" onClick={this.onLogout}><i className="fa fa-sign" aria-hidden="true"> logout</i></button></left></div>
            </div>
        );
    }
}

export default Authors;