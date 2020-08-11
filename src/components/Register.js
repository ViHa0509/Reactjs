import React, { Component } from "react";
import './Authors.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username:'',
            firstname: '',
            lastname: '',
            email: '',
            password:''
        }
    }

    checkvalidmail(email){
        var check, position, count;
        check = true;
        position = email.indexOf('com');
        count = email.slice(position);
        if (position < 0 || count.length > 3) 
            check = false; 
        return check;
    }

    handleValidation(){
        let email = this.state.email;
        let emailIsValid = true;
        if(this.checkvalidmail(email) === false)
        {
            emailIsValid = false;   
        }
        return emailIsValid;
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

    onCreateUser = (event) =>{
        console.log('asdasddasdas')
        event.preventDefault();
        if(this.handleValidation()){
            this.props.onCUser(this.state);
         }else{
            window.confirm('Invalid email');
         }
    }

    render() {
        return (
            <div className="white-text add-author">
                <form onSubmit={this.onCreateUser}>
                    <div className="container">
                        <br />
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label" />
                            <div className="col-sm-6">
                                <h3>Create User</h3>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Email:</label>
                            <div className="col-sm-9">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Username</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Password:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange} />
                            </div>
                        </div>                     
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label " />
                            <div className="col-sm-6">
                                <button type="submit" className="btn btn-success custom-button">Create</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;