import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import _ from 'lodash';
import { createComment } from '../../../services/userService';
import { Rating } from 'react-simple-star-rating'
import { withRouter } from 'react-router';
class CreateComent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 5,
            comment: '',
            garaId: '',
            userId: '',

            carId: '',
            timeType: '',
            serviceId: '',
            date: '',
            email: '',
            time: '',

        }
    }
    handleRating = (rate) => {
        this.setState({
            rating: rate
        })


    }

    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModel !== this.props.dataModel) {
            this.setState({
                garaId: this.props.dataModel.garaId,
                userId: this.props.dataModel.userId,
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

    handlOnchaneInput = (event) => {
        this.setState({
            comment: event.target.value
        })
    }
    handlSubmid = async () => {

        let data = {
            comment: this.state.comment,
            garaId: this.state.garaId,
            userId: this.state.userId,
            rate: this.state.rating,
            timeType: this.state.timeType,
            carId: this.state.carId,
            serviceId: this.state.serviceId,
            date: this.state.date,
            time: this.state.time

        }
        let res = await createComment(data)
        if (res.EC === 0) {
            this.props.history.push(`/detailGara/${this.state.garaId}`)
        }
    }
    render() {

        return (
            <div>

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
                            <span>Đánh giá dịch vụ</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-12 from-group'>
                                <label className='fst-italic'>Hãy nêu cảm nhận của bạn về dịch vụ của gara nhé!</label>

                                <input
                                    onChange={(event) => this.handlOnchaneInput(event)}
                                    type='text' className='form-control'
                                    placeholder='Đánh giá..... '
                                    value={this.state.comment} required></input>
                            </div>


                            <div className='d-flex justify-content-center'>
                                <hr></hr>
                                <label className='fst-italic mt-2'>Đánh giá gara: </label>
                                <Rating
                                    onClick={this.handleRating}
                                    initialValue={this.state.rating}

                                /* Available Props */
                                />
                            </div>


                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={() => this.handlSubmid()}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div >
        );
    }
}


export default withRouter(CreateComent);