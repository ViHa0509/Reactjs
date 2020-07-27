import axios  from 'axios';
import React, {Component} from 'react';
class Authors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authors: []
        }
    }
    getAuthors =  async (data) => {
        console.log("ok")
        let url = 'http://127.0.0.1:8000/book/authors/';
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
            console.log("LOGIN FAIL, PLEASE TRY AGAIN")
        })
        

    }

    createAuthor =  async (data) => {
        var first_name = 'vi'
        var last_name = 'hoan'

        var email = '123@gmail.com'
        console.log("ok")
        let url = 'http://127.0.0.1:8000/book/authors//';
        var token = 'Token ' + localStorage.getItem('token')
        console.log(token)

        let options = {
            method: 'POST',
            url : url,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email
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

    updateAuthor = async (author) => {
        let url = 'http://127.0.0.1:8000/book/authors/' + author.id + '/';
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
        let url = 'http://127.0.0.1:8000/book/authors/' + author.id + '/';
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
            console.log("LOGIN FAIL, PLEASE TRY AGAIN")
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
                        <td><button onClick={() => this.deleteAuthor(author)}>{author.email}</button></td>
                    </tr>
                ))}
                </tbody>
                </table>
                <center><button className="btn btn-primary" onClick={this.createAuthor}>Add New Record</button></center>
        </div>
        );
    }
}

export default Authors;