import React, { Component } from "react";
import './Authors.css';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username:'',
            firstname: '',
            lastname: '',
            email: '',
            ListGroups:[],
            groups: 1,
        }
    }


    componentDidMount = async () =>{
        console.log('sasasdasdasdadasd')
        const ListGroups = await this.props.groups;
        this.setState({
            ListGroups
        });  
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

    handleChange = (e) => {
        this.setState({ groups: e.target.value })
    }

    componentWillReceiveProps = (nextProps) =>{
        console.log("RECEIVING PROPS")
        var selectedUser = nextProps.selectedUser
        if(nextProps.selectedUser.id !== this.state.id){
            this.setState({
                id: selectedUser.id,
                firstname: selectedUser.firstname,
                lastname: selectedUser.lastname,
                email: selectedUser.email
            })
        }
    }

    componentWillMount = () =>{
        console.log("UPDATING");
        if(this.props.selectedUser.id !== ''){
            var {selectedUser} = this.props;
            console.log(this.props)
            this.setState({
                id: selectedUser.id,
                firstname: selectedUser.firstname,
                lastname: selectedUser.lastname,
                email: selectedUser.email,              
            })
        }
    }
    
    onEditUser = (event) =>{
        event.preventDefault();
        if(this.handleValidation()){
            const data = this.state;
            data.groups = [this.state.groups];
            this.props.onEUser(data);

         }
         else{
            if(this.state.email===''||this.state.username === ''|| this.state.password==='')
            {
               window.confirm('Please fill all information');
            }
             else{
                window.confirm('Invalid email');
             }
         }
    }    

    

    render() {

        let options = this.state.ListGroups.map((group) => {
            return { value: group.id, label: group.id };
          })

        console.log(this.state.groups)
        return (
            <div className="white-text add-author">
                <form onSubmit={this.onEditUser}>
                    <div className="container">
                        <br />
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label" />
                            <div className="col-sm-6">
                                <h3>Edit User</h3>
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
                                    type="email"
                                    className="form-control"
                                    placeholder="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange} />
                            </div>
                        </div>   

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Group:</label>
                            <div className="col-sm-9">
                                <select id="perm" className="form-control" onChange={this.handleChange}>
                                    {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                                </select>      
                            </div>
                        </div>  

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label " />
                            <div className="col-sm-6">
                                <button type="submit" className="btn btn-success custom-button">Edit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserEdit;