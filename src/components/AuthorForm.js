import React, { Component } from "react";
import './Authors.css';

class AuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            email: ''
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

    componentWillReceiveProps = (nextProps) =>{
        console.log("RECEIVING PROPS")
        console.log(nextProps.selectedAuthor);
        var selectedAuthor = nextProps.selectedAuthor
        if(nextProps.selectedAuthor.id !== this.state.id){
            this.setState({
                id: selectedAuthor.id,
                firstname: selectedAuthor.firstname,
                lastname: selectedAuthor.lastname,
                email: selectedAuthor.email
            })
        }
    }

    componentWillMount = () =>{
        console.log("UPDATING");
        if(this.props.selectedAuthor.id !== ''){
            var {selectedAuthor} = this.props;
            console.log(selectedAuthor);
            this.setState({
                id: selectedAuthor.id,
                firstname: selectedAuthor.firstname,
                lastname: selectedAuthor.lastname,
                email: selectedAuthor.email
            })
        }
    }

    onCreateAuthor = (event) =>{
        event.preventDefault();
        this.props.onCreateAuthor(this.state);
    }



    render() {
        return (
            <div className="white-text add-author">
                <form onSubmit={this.onCreateAuthor}>
                    <div className="container">
                        <br />
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label" />
                            <div className="col-sm-6">
                                <h3>{this.state.id !== ''? 
                                "Edit Author":
                                "Create Author"}</h3>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">First Name:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="firstname"
                                    name="firstname"
                                    value={this.state.firstname}
                                    onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Last Name:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="lastname"
                                    name="lastname"
                                    value={this.state.lastname}
                                    onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Email:</label>
                            <div className="col-sm-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label " />
                            <div className="col-sm-6">
                                <button 
                                    type="submit" 
                                    className="btn btn-success custom-button">
                                        {this.state.id !== '' ? 
                                        "Edit":
                                        "Create"}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AuthorForm;