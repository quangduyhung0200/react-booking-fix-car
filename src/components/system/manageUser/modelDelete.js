import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { feactAllCarCompany } from '../../../services/guestService';
import CommonUtils from '../../../utils/CommonUtils';
import { createCar, updateCar } from '../../../services/staffService';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';

class ModelconfimdeledeUser extends Component {
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
    handleClose = () => {
        this.props.handleClose()

    }

    render() {
        console.log(this.props)
        return (
            <div>

                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa người dùng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc muốn xóa người dùng: <span className='fw-bold'>{this.props.dataModel.userName ? this.props.dataModel.userName : ''}</span></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={this.props.comfirmDeleteUser}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div >
        );
    }
}


export default ModelconfimdeledeUser;