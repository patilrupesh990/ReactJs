import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import WarningIcon from '@material-ui/icons/Warning';
import Spinner from '../common/Spinner'
import { CircularProgress } from '@material-ui/core';
import { Form, Dropdown } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';
import { Button as SymButton } from 'semantic-ui-react'

const CreateVanueModal = ({ createVanueModal, setCreateVanueModal, title }) => {
    const toggle = () => {
        setCreateVanueModal(!createVanueModal)

    }
    const closeBtn = <button size="md" style={{ color: 'white', height: '25px', width: '25px' }} className="bg-dark" onClick={toggle}>X</button>;

    const handleSubmit = (event, data) => {

    }

    const favoriteVanueOptions = [
        { key: 1, text: 'yes', value: 1 },
        { key: 2, text: 'No', value: 2 },
    ]


    return (
        <div>
            <Modal centered isOpen={createVanueModal} toggle={toggle} >
                <ModalHeader style={{ width: '100%', height: '55px', backgroundColor: '#3f51b5' }} close={closeBtn}>
                    <p style={{ color: 'white' }}>{title}</p>
                </ModalHeader>
                <ModalBody style={{ width: '100%', margin: 0 }}>
                    <div class="log-issue-main py-2 px-1">
                        <Container>
                            <Form style={{ width: '100%', margin: 0 }} >
                                <Row className="my-1">
                                    <Col>
                                        <Form.Select
                                            // options={props.array}
                                            required={true}
                                            label="Vanue"
                                            search={true}
                                            placeholder="Select Vanue"
                                            fluid
                                            clearable={true}
                                            scrolling={true}
                                            closeOnChange={true}
                                            noResultsMessage='Try another Vanue search.'
                                        />
                                    </Col>
                                </Row>

                                <Row className="my-1">
                                    <Col>
                                        <Form.Select
                                            // options={props.array}
                                            required={true}
                                            label="is your favourite venue?"
                                            search={false}
                                            placeholder="Select Option"
                                            fluid
                                            clearable={true}
                                            options={favoriteVanueOptions}
                                            scrolling={true}
                                            closeOnChange={true}
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Select
                                            // options={props.array}
                                            required={true}
                                            label="is To User friend?"
                                            search={false}
                                            placeholder="Select Option"
                                            fluid
                                            clearable={true}
                                            options={favoriteVanueOptions}
                                            scrolling={true}
                                            closeOnChange={true}
                                        />
                                    </Col>
                                </Row>
                               
                                <Row className="my-1">
                                    <Col>
                                        <Form.Input
                                            id='form-from-score'
                                            required
                                            fluid
                                            label='From Score'
                                            placeholder='From Score'
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Input
                                            id='form-to-score'
                                            required
                                            fluid
                                            label='To Score'
                                            placeholder='To Score'
                                        />
                                    </Col>
                                </Row>
                                

                                <Row className="my-1">
                                    <Col>
                                        <Form.TextArea
                                            placeholder="Private Note"
                                            label="Private Notes"
                                            name="private note"
                                            required={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col>
                                        <Form.TextArea
                                            placeholder="Public Comment"
                                            label="Public Comment"
                                            name="Public Comment"
                                            required={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <p>Game Date and Time</p>
                                        <TextField
                                            id="date1"
                                            type="date"
                                            defaultValue="04-08-2021"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                          <SymButton color="blue">Create Vanue</SymButton>  
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    )
}
export default CreateVanueModal;