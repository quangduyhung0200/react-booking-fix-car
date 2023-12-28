import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from 'moment';
import { canserOrder } from '../../../services/userService';


class ModelComfimCanserOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            garaId: '',
            carId: '',
            timeType: '',
            serviceId: '',
            date: '',
            email: '',
            time: ''

        }
    }
    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModel !== this.props.dataModel) {

            this.setState({
                userId: this.props.dataModel.userId,
                garaId: this.props.dataModel.garaid,
                carId: this.props.dataModel.carId,
                timeType: this.props.dataModel.timetype,
                serviceId: this.props.dataModel.serviceId,
                date: this.props.dataModel.date,
                email: this.props.dataModel.email,
                time: this.props.dataModel.time,
            })
        }

    }

    handleClose = () => {
        this.props.onHide()

    }
    handlecomfime = async () => {
        await canserOrder(this.state)

    }
    render() {

        let dataModel = this.props.dataModel
        console.log('check props', this.props)

        return (
            <>
                <Modal
                    {...this.props}
                    size="xl"
                    show={this.props.show}
                    aria-labelledby="contained-modal-title-vcenter"

                    className='model-user'
                    onHide={() => this.handleClose()}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <span>moi moi</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>huuhhu</div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handlecomfime()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </>
        );
    }
}


export default ModelComfimCanserOrder;
