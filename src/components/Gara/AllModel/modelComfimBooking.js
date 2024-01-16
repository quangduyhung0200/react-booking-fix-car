import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import moment from 'moment';
import { comfimBooking } from '../../../services/garaService';

import { withRouter } from 'react-router-dom/cjs/react-router-dom';
class ModelComfimBooking extends Component {
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
            time: '',
            garaName: ''

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
                garaName: this.props.dataModel.garaName,
            })
        }

    }

    handleClose = () => {
        this.props.onHide()

    }
    handlecomfime = async () => {

        let res = await comfimBooking(this.state)
        if (res.EC === 0) {
            toast.success('Xác nhận đã tiếp nhận đơn hàng')
            this.props.history.push('/manageOrder')
        }
        else if (res.EC === 2) {
            toast.error('Gara đã hết sức chứa')
            this.props.onHide()
        }
        else {
            toast.error('Có lỗi xảy ra vui lòng thử lại sau')
            this.props.onHide()
        }
    }
    render() {

        let dataModel = this.props.dataModel


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
                            <span>Xác nhận nhận đơn đặt lịch</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>Bạn có xác nhận nhận đơn đặt lịch của người dùng có email: {this.props.dataModel.email}</div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={() => this.handlecomfime()}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>


            </>
        );
    }
}


export default withRouter(ModelComfimBooking);
