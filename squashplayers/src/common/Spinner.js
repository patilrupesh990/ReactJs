import { Component } from "react";
import {MetroSpinner} from "react-spinners-kit";
import '../assets/css/spinner.css'

class Spinner extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
       };
    }
    render() {
        const { loading } = this.state;
        return(
            <div className="spinner-container">
                <div className="spinner">
                
                <MetroSpinner size={50}
                 color="#3f51b5"
                 loading={loading}
                  />
                </div>
            </div>
        )
    }
}
export default Spinner