import React, { Component } from "react";
import axios from "axios";
import Spinner from "../common/Spinner"

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state={
            userData:{
                fname:"",
                lname:"",
                email:"",
                rpassword:"",
                password:"",
                moNob:""
            },
            loadingState: false,
        }

    }


    handleChange = e => {
        const userData = this.state.userData;
        if(typeof e.target.value!=='undefined'){
            userData[e.target.name] = e.target.value;
            this.setState({ userData });
        }
    }
    loadState = value => {
        this.setState({ loadingState: value });
    };

    handleSubmit(){
        this.loadState(true);
        if( this.state.userData.email.length === 0 ){
            this.errorHandling("Please Enter Email");
        }else if(this.state.userData.fname.length === 0){
            this.errorHandling("Please Enter First Name");
        }else if(this.state.userData.password.length<6){
            this.errorHandling("password should more than 6 characters");
        }
        else if(this.state.userData.rpassword !== this.state.userData.password){
            this.errorHandling("Password Mismatch");
        }else{
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }

            let data = {
                "first_name":this.state.userData.fname,
                "last_name":this.state.userData.lname,
                "email":this.state.userData.email,
                "password":this.state.userData.password,
                "mobile":this.state.userData.moNob,
                "device_token": "0c9def3e-1b93-4af5-b276-0f529406f0ce",
                "device_type": "0"
            }
            axios.post('https://cors-anywhere.herokuapp.com/https://uat.squash.itomic.app/api/v1/register', data, headers).then((res) => {
            if(res.data.error){
                    this.errorHandling("Invalid Email or Password");
                    console.log(res);
                    this.loadState(false);
                }
                else{
                    this.loadState(false);
                    this.errorHandling("");
                    this.props.history.push(`/dashboard`);
                    localStorage.setItem('token',res.data.device_token)
                    localStorage.setItem('authorization',res.data.authorization)
                }
            }).catch((err)=>{
                this.loadState(false);
                this.errorHandling("Something Went Wrong Please try again..")
            })
        }
    }

    errorHandling(err) {
        this.setState({ errors: err, loadState: false });
    }

    render() {
        return (
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                 {this.state.loadingState ? <Spinner /> : ""}
                <div style={{ marginTop: '7%', width: '34%' }}>
                    <div className="mb-3">
                        <h3>Register your self</h3>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group">
                            <label>FirstName</label>
                            <input type="text" name="fname" className="form-control" value={this.state.fname} onChange={this.handleChange} placeholder="Enter FirstName" />
                        </div>
                        <div className="form-group">
                            <label>LastName</label>
                            <input type="text" name="lname" className="form-control" value={this.state.lname} onChange={this.handleChange} placeholder="Enter LastName" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group">
                            <label>Set Password</label>
                            <input type="password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password} placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="password" className="form-control" onChange={this.handleChange} value={this.state.rpassword} placeholder="Confirm password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                    </div>
                    
                    
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="text" name="mobNo" className="form-control" value={this.state.moNob} onChange={this.handleChange} placeholder="Enter Phono" />
                    </div>

                    <div>
                        <p style={{ color: 'red' }}>{this.state.errors}</p>
                    </div>
                    <button className="btn btn-dark btn-lg btn-block" onClick={this.handleSubmit}>Sign Up</button>
                    <p className="forgot-password text-right">
                         <a href="/login">Back To Login</a>
                    </p>
                </div>
            </div>

        );
    }
}