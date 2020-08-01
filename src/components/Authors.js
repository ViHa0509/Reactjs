import axios  from 'axios';
import React, {Component} from 'react';
import {API_ENDPOINT} from '../const';

class Authors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            showForm: false,
            firstname: '',
            lastname: '',
            email: '',
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
        console.log(this.state)
      }

    renderForm() {
        return (
            <div> 
                <form onSubmit={this.createAuthor}>  
                    <div className="container">  
                    <br />  
                    <div className="form-group row">  
                        <label className="col-sm-1 col-form-label" />  
                        <div className="col-sm-4">  
                            <h3>Create Author</h3>  
                        </div>  
                    </div>   
                    <div className="form-group row">  
                        <label className="col-sm-2 col-form-label">First Name:</label>  
                        <div className="col-sm-4">  
                        <input 
                            type="text"  
                            className="form-control" 
                            placeholder="firstname"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.onChange}/>  
                        </div>  
                    </div>
                    <div className="form-group row">  
                        <label className="col-sm-2 col-form-label">Last Name:</label>  
                        <div className="col-sm-4">  
                        <input 
                            type="text"  
                            className="form-control" 
                            placeholder="lastname"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.onChange}/> 
                        </div>  
                    </div>  
                    <div className="form-group row">  
                        <label className="col-sm-2 col-form-label">Email:</label>  
                        <div className="col-sm-4">  
                        <input 
                            type="text"  
                            className="form-control" 
                            placeholder="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}/> 
                        </div>  
                    </div>  
                    <div className="form-group row">  
                        <label className="col-sm-1 col-form-label" />  
                        <div className="col-sm-4">  
                        <button type="submit" className="btn btn-success">Create</button>  
                        </div>  
                    </div>  
                    </div>  
                </form>
           </div>
        );
      }
     


    getAuthors =  async (data) => {
        console.log("ok")
        let url = API_ENDPOINT + 'book/authors/';
        var token = 'Token ' + localStorage.getItem('token')
        console.log(token)

        let options = {
            method: 'GET',
            url : url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            credentials: "same-origin",
        };

        await axios({...options}).then((res)=>{
            if (res.data) {
              console.log(res.data);
              this.setState({authors: res.data});
            }
        }).catch((err)=>{
            console.log(err)
            console.log("Error")
        })
        

    }

    createAuthor =  async (event) => {
        event.preventDefault();
        console.log("ok");
        let url = API_ENDPOINT +'book/authors/';
        var token = 'Token ' + localStorage.getItem('token')
        console.log(this.state.firstname)

        let options = {
            method: 'POST',
            url : url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                email: this.state.email
            },
            credentials: "same-origin",
        };

        await axios({...options}).then((res)=>{
            if (res.data) {
              console.log(res.data);
              //this.setState({authors: res.data});
            }
        }).catch((err)=>{
            console.log(err)
            console.log("Create fail")
        })
        

    }

    updateAuthor = async (author) => {
        let url = API_ENDPOINT + 'book/authors/' + author.id + '/';
        var token = 'Token ' + localStorage.getItem('token')
        console.log(token)

        let options = {
            method: 'PATCH',
            url : url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                first_name: 'hello',
            },
            credentials: "same-origin",
        };

        await axios({...options}).then((res)=>{
            if (res.data) {
              console.log(res.data);
              //this.setState({authors: res.data});
            }
        }).catch((err)=>{
            console.log(err)
            console.log("LOGIN FAIL, PLEASE TRY AGAIN")
        })
        
    }

    deleteAuthor = async (author) => {
        let url = API_ENDPOINT + 'book/authors/' + author.id + '/';
        var token = 'Token ' + localStorage.getItem('token')
        console.log(token)

        let options = {
            method: 'DELETE',
            url : url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            credentials: "same-origin",
        };

        await axios({...options}).then((res)=>{
            if (res.data) {
              console.log(res.data);
              //this.setState({authors: res.data});
            }
        }).catch((err)=>{
            console.log(err)
            console.log("Can't delete")
        })
        
    }

    componentDidMount =() =>{
        this.getAuthors();
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
                    <tr>
                        <td>{author.id}</td>
                        <td>{author.first_name}</td> 
                        <td>{author.last_name}</td>
                        <td>{author.email}</td>
                        <td><button type="button" class="btn btn-info"><span class="glyphicon glyphicon-pencil"></span></button>
                        <button onClick={() => this.deleteAuthor(author)} type="button" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>
                    </tr>
                ))}
                </tbody>
                </table>
                <center><button className="btn btn-primary" onClick={() => this.setState({showForm: true})}>Add New Record</button></center>
                <div>
                    {this.state.showForm ? this.renderForm() : null}
                </div>
        </div>
        );
    }
}

export default Authors;