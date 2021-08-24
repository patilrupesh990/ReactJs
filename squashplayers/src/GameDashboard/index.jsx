import React, { Component } from "react";
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import CreateVanueButton from "../SquashDashboard/CreateVanueButton";
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Tooltip from '@material-ui/core/Tooltip';
import EventNoteOutlinedIcon from '@material-ui/icons/EventNoteOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { Button as SymButton } from 'semantic-ui-react'
import { Pagination } from 'semantic-ui-react'
import Spinner from "../common/Spinner"

class GameDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gameList: [],
            currentPage: 0,
            rowPerPage: 10,
        }
    }

    componentDidMount() {
        this.getGamesList();
    }

    getGamesList() {
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

            axios.get('https://cors-anywhere.herokuapp.com/https://uat.squash.itomic.app/api/v1/view_games', config).then(res => {
                console.log(res);
                this.loadState(false);
                this.setState({
                    gameList: res.data.data
                })

            })
        } catch (err) {

        }
    }

    handleGameDelete= (id)=>{
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

            axios.get(`https://cors-anywhere.herokuapp.com/https://uat.squash.itomic.app/api/v1/delete_game/${id}`, config).then(res => {
                this.getGamesList();
                this.loadState(false);
            }).catch(err=>{
                this.loadState(false);
            })
        } catch (err) {

        }

    }
    loadState = value => {
        this.setState({ loadingState: value });

    };
    gamesCard() {
        if (this.state.gameList.length > 0) {
            return this.state.gameList.slice(this.state.currentPage * this.state.rowPerPage, this.state.currentPage * this.state.rowPerPage + this.state.rowPerPage).map((game, index) => {
                const imgUrl = typeof game.from_user.image !== 'undefined' ? game.from_user.image : "https://sargeant.rcsdk8.org/sites/main/files/main-images/camera_lense_0.jpeg";
                return (
                    <Card key={index} className="custom-card">
                        <Card.Img variant="top" src={imgUrl} style={{ height: "160px" }} />
                        <Card.Body className="px-0 py-0">
                            <div className="d-flex mt-2 ml-4">
                                <div>
                                    <FiberManualRecordIcon className="text-success" style={{ fontSize: "15px" }} />
                                </div>
                                <div className="d-flex ml-2">
                                    <div>
                                        <p style={{ fontWeight: '600' }}><span style={{ fontWeight: '900' }}>Created At </span> {game.game_datetime}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-2 ml-4">
                                <div>
                                    <FiberManualRecordIcon className="text-warning" style={{ fontSize: "15px" }} />
                                </div>
                                <div className="d-flex ml-2">
                                    <div>
                                        <p style={{ fontWeight: '600' }}><span style={{ fontWeight: '900' }}>From Score </span> {game.from_score}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-2 ml-4">
                                <div>
                                    <FiberManualRecordIcon className="text-warning" style={{ fontSize: "15px" }} />
                                </div>
                                <div className="d-flex ml-2">
                                    <div>
                                        <p style={{ fontWeight: '600' }}><span style={{ fontWeight: '900' }}>To Score </span> {game.to_score}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-2 ml-4">
                                <div>
                                    <EventNoteOutlinedIcon className="text-warning" style={{ fontSize: "15px" }} />
                                </div>
                                <div className="d-flex ml-2">
                                    <div>
                                        <p style={{ fontWeight: '600' }}><span style={{ fontWeight: '900' }}>PrivateNote </span> {game.from_user_private_not}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mt-2 ml-4">
                                <div>
                                    <CommentOutlinedIcon className="text-warning" style={{ fontSize: "15px" }} />
                                </div>
                                <div className="d-flex ml-2">
                                    <div>
                                        <p style={{ fontWeight: '600' }}><span style={{ fontWeight: '900' }}>Comment </span> {game.public_comments}</p>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <Card.Text className="my-2 ml-5 justify-content-center" onClick={()=>this.handleGameDelete(game.id)}>
                                <SymButton color='blue' className="d-flex">
                                        Delete Game
                                </SymButton>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })
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
            // data.activePage
            // props.handleChangeofPageParentCallback(data.activePage);
            // setPage(data.activePage);
        }
        return (
            <React.Fragment>
                 {this.state.loadingState ? <Spinner /> : ""}
                <div className="main-panel">
                    <Container className="pt-2 ml-4" fluid>
                        <Row className=" d-flex justify-content-between" style={{ width: '100%' }}>
                            <Col className=" mb-3">
                                <p className="h5 mt-3 ml-3"><b>All Games</b></p>
                            </Col>
                            <Col className=" mb-3" lg={3}>
                                <InputGroup className="mb-3 mt-2">
                                    <FormControl
                                        onChange={this.handleSearch}
                                        placeholder="Search Games"
                                        aria-label="Search Games"
                                        aria-describedby="basic-addon2"
                                    />
                                    <InputGroup.Text id="basic-addon2" onClick={this.searchVanue} style={{cursor:'pointer'}}><SearchIcon /></InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col className=" mb-3 ">
                                <CreateVanueButton title="Create Game" />
                            </Col>
                        </Row>
                        {/* Games List */}
                        <Row className="d-flex ticket-row ml-2 mt-4 mr-0">
                            {this.gamesCard()}
                        </Row>
                    </Container>
                    {
                        this.state.gameList.length > 0 ? (
                            <div className='d-none d-md-block mb-1' style={{alignItems:'center'}}>
                                <Pagination
                                    boundaryRange={0}
                                    defaultActivePage={this.state.currentPage}
                                    ellipsisItem={null}
                                    firstItem={null}
                                    lastItem={null}
                                    siblingRange={3}
                                    totalPages={totalPages(this.state.gameList.length, 10)}
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
export default GameDashboard