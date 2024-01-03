import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class ModelconfimdeledeHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCar: '',
            listCarCompany: [],
            carCompanyId: '',
            avata: '',
            descriptions: '',
            id: '',
            previewimg: '',
        }
    }
    async componentDidMount() {




    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {

        return (
            <div>

                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you aresure to delete user:</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.props.comfirmDeleteUser}>
                            Comfirm
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div >
        );
    }
}


export default ModelconfimdeledeHandbook;