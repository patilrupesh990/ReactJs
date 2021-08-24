import React, { Component } from "react";
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import { Header, Icon, Segment, Loader, Dimmer, Image, Form as syForm } from 'semantic-ui-react'
import { Button as SymButton } from 'semantic-ui-react'
import axios from "axios";
import Spinner from "../common/Spinner"
import '../assets/css/vanuecard.css'
import Divider from '@material-ui/core/Divider';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateVanueButton from "./CreateVanueButton";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { Dropdown, Pagination } from 'semantic-ui-react'

class SquashDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vanueList: [],
            loadingState: false,
            createVanue: false,
            isSuburbEdit: false,
            isStateEdit: false,
            suburbData: [],
            currentPage: 0,
            rowPerPage: 10,
            searchKey:"",
            selectedSuburb:"",
            
        }


    }

    loadState = value => {
        this.setState({ loadingState: value });

    };

    componentDidMount() {
        this.getVanueList()
    }



    handleSuburbEdit = (data) => {
        console.log(data);
        this.state.vanueList.map((vl) => {
            if (vl.id === data.id) {
                vl.isSuburbEdit = true;
            } else {
                vl.isSuburbEdit = false;
            }
        })
        const state = data.state !== null ? data.state : "";
        this.setState({
            isSuburbEdit: true
        })
        try {
            let Authorization = {
                "Authorization": "Bearer" + localStorage.getItem('token')
            }
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` }
            };

            var bodyFormData = new FormData();
            bodyFormData.append("Authorization", JSON.stringify(Authorization));

            axios.get(`https://cors-anywhere.herokuapp.com/https://uat.squash.itomic.app/api/v1/view_suburbs?state=${state}`, config).then(res => {
                let processArray = [];
                let processedObject = {
                    key: '',
                    text: '',
                    value: '',
                }
                console.log(res.data);
                res.data.suburb.map((data) => {
                    processedObject = {
                        key: data,
                        text: data,
                        value: data,
                    }
                    processArray.push(processedObject);
                })
                this.setState({
                    suburbData: processArray
                })
            })
        } catch (err) {

        }
    }
    handleStateEdit = () => {
        this.setState({
            isStateEdit: true
        })
    }
    handleSuburbChange=(event,data)=>{
        this.setState({
            selectedSuburb:data.value
        })
    }

    getVanueList() {
        this.loadState(true);
        try {
            let Authorization = {
                "Authorization": "Bearer" + localStorage.getItem('token')
            }
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` }
            };

            var bodyFormData = new FormData();
            bodyFormData.append("Authorization", JSON.stringify(Authorization));

            axios.get('https://cors-anywhere.herokuapp.com/https://uat.squash.itomic.app/api/v1/view_venues', config).then(res => {
                this.loadState(false);
                res.data.data.map((vanue) => {
                    vanue.isSuburbEdit = false;
                })
                this.setState({
                    vanueList: res.data.data
                })

            })
        } catch (err) {

        }
    }
    searchVanue=()=>{
        console.log("search");
        this.loadState(true)
        try {
            let Authorization = {
                "Authorization": "Bearer" + localStorage.getItem('token')
            }
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('authorization')}` }
            };

            var bodyFormData = new FormData();
            bodyFormData.append("Authorization", JSON.stringify(Authorization));

            axios.get(`https://cors-anywhere.herokuapp.com/https://uat.squash.itomic.app/api/v1/search_venues?country_code=au&venue=${this.state.searchKey}`, config).then(res => {
                console.log(res.data.data);
                if (typeof res.data.data !== 'undefined') {
                    this.loadState(false)
                    res.data.data.map((vanue) => {
                        vanue.isSuburbEdit = false;
                    })
                    this.setState({
                        vanueList: res.data.data
                    })
                }
                else{
                    this.loadState(false)
                    this.setState({
                        vanueList:[]
                    })
                }

            })
        } catch (err) {

        }
    }
    handleSearch = async (event, data) => {
        console.log(event.target.value);
        if (event.target.value === "") {
            this.getVanueList()
        }else{
            this.setState({
                searchKey:event.target.value
            })
        }
        
    }
    vanueCards() {
        console.log(this.state.vanueList.length);
        if (this.state.vanueList.length > 0) {
            return this.state.vanueList.slice(this.state.currentPage * this.state.rowPerPage, this.state.currentPage * this.state.rowPerPage + this.state.rowPerPage).map((vanue, index) => {
                const imgUrl = typeof vanue.images[0] !== 'undefined' ? vanue.images[0].image : "https://sargeant.rcsdk8.org/sites/main/files/main-images/camera_lense_0.jpeg";
                return (
                    <Card key={index} className="custom-card">
                        <Card.Img variant="top" src={imgUrl} style={{ height: "160px" }} />
                        <Card.Body className="px-0 py-0">
                            <div className="mt-3 mb-4 ml-3 mr-2">
                                <div className="mt-2">
                                    <Card.Text style={{ fontWeight: 'bold', fontFamily: 'Muli', fontSize: '16px', width: '200px', color: '#000000', lineHeight: '19px', cursor: 'pointer' }}>{vanue.name}</Card.Text>
                                </div>
                            </div>
                            <Divider />
                            <Card.Text>
                                <div className="mb-3">
                                    {/* <div className="d-flex mt-2 ml-4 "> */}

                                    {vanue.isSuburbEdit ? (
                                        <div className="d-flex my-2 mx-2 justify-content-between ">
                                            <div className="mr-1">
                                                <Dropdown placeholder='State' onChange={this.handleSuburbChange} search selection options={this.state.suburbData} />
                                            </div>
                                            <div style={{ cursor: 'pointer' }}>
                                                <Tooltip title="Save Suburb" aria-label="add">
                                                    <Button className="mt-1">Save</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ) : (

                                        <div className="d-flex ml-2 my-2 mx-2">
                                            <div>
                                                <FiberManualRecordIcon className="text-danger" style={{ fontSize: "15px" }} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: '600' }}><span style={{ fontWeight: '900' }}>Suburb: </span> {vanue.suburb}</p>
                                            </div>
                                            <div className="ml-3 " style={{ cursor: 'pointer' }}>
                                                <Tooltip title="Edit Suburb" aria-label="add">
                                                    <EditIcon fontSize="small" onClick={() => this.handleSuburbEdit(vanue)} />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    )
                                    }
                                    {/* </div> */}
                                    <div className="d-flex mt-2 ml-4">
                                        <div>
                                            <FiberManualRecordIcon className="text-success" style={{ fontSize: "15px" }} />
                                        </div>
                                        <div className="d-flex ml-2">
                                            <div>
                                                <p style={{ fontWeight: '600' }}><span style={{ fontWeight: '900' }}>State: </span> {vanue.state}</p>
                                            </div>
                                            <div className="ml-3 " style={{ cursor: 'pointer' }}>
                                                <Tooltip title="Edit State" aria-label="add">
                                                    <EditIcon fontSize="small" />
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })

        } else {
            return (

                <Segment placeholder className='m-2' style={{ width: '100%' }}>
                    <Header icon>
                        <Icon name='search' size='large' />
                        <h3>No Data Found</h3>
                    </Header>
                </Segment>
            )
        }

    }
    render() {
        const totalPages = (totalCount, dataPerPage) => {
            if (totalCount % dataPerPage === 0) {
                return Math.round(totalCount / dataPerPage);
            } else if (totalCount % dataPerPage < 5) {
                return Math.round(totalCount / dataPerPage) + 1;
            } else {
                return Math.round(totalCount / dataPerPage);
            }
        };

        const changePage = (event, data) => {
            console.log('event: ', event, 'data: ', data);
            this.setState({
                currentPage: data.activePage - 1
            })
            
        }

        return (
            <React.Fragment>
                <div className="main-panel">
                    {this.state.loadingState ? <Spinner /> : ""}
                    <Container className="pt-2 ml-4" fluid>
                        <Row className=" d-flex justify-content-between" style={{ width: '100%' }}>
                            <Col className=" mb-3">
                                <p className="h5 mt-3 ml-3"><b>All Vanue</b></p>
                            </Col>
                            <Col className=" mb-3" lg={3}>
                                <InputGroup className="mb-3 mt-2">
                                    <FormControl
                                        onChange={this.handleSearch}
                                        placeholder="Search Vanue"
                                        aria-label="Search Vanue"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2" onClick={this.searchVanue} style={{cursor:'pointer'}}><SearchIcon /></InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col className=" mb-3 ">
                                <CreateVanueButton title="Create Vanue"/>
                            </Col>
                        </Row>
                        <Row className="d-flex ticket-row ml-2 mt-4 mr-0">
                            {this.vanueCards()}
                        </Row>

                    </Container>
                    {
                        this.state.vanueList.length > 0 ? (
                            <div className='d-none d-md-block'>
                                <Pagination
                                    boundaryRange={0}
                                    defaultActivePage={this.state.currentPage}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    siblingRange={3}
                                    totalPages={totalPages(this.state.vanueList.length, 10)}
                                    onPageChange={changePage}
                                />
                            </div>
                        ) : null
                    }

                </div>
            </React.Fragment>
        )
    }
}
export default SquashDashboard;