import { Component } from "react";
import axios from "axios";
import Spinner from "../common/Spinner"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                email: "",
                password: ""
            },
            loadingState: false,
        }
    }

    loadState = value => {
        this.setState({ loadingState: value });
    };

    handleChange = e => {
        this.errorHandling("");
        const data = this.state.data;
        data[e.target.name] = e.target.value;
        this.setState({ data });
    }
    errorHandling(err) {
        this.setState({ errors: err, loadState: false });
    }
    handleSubmit = () => {
        this.loadState(true);
        if (
            this.state.data.email.length === 0 ||
            this.state.data.password.length === 0
        ) {
            this.errorHandling("Missing Fields, Please Fill All the Details");
            this.loadState(false);
        } else {
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }

            let data = {
                "email": this.state.data.email,
                "password": this.state.data.password,
                "device_token": "0c9def3e-1b93-4af5-b276-0f529406f0ce",
                "device_type": "0"
            }
            axios.post('https://cors-anywhere.herokuapp.com/https://uat.squash.itomic.app/api/v1/login', data, headers).then((res) => {
                console.log(res);    
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

    render() {
        return (
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                {this.state.loadingState ? <Spinner /> : ""}
                <div style={{ marginTop: '10%', width: '50vh' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3>Log in</h3>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password} placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <p style={{ color: 'red' }}>{this.state.errors}</p>
                    </div>

                    <button className="btn btn-dark btn-lg btn-block" onClick={this.handleSubmit}>Sign in</button>
                    <p className="forgot-password text-right">
                         <a href="/register">New User?</a>
                    </p>
                </div>
            </div>

        )
    }
}
export default Login