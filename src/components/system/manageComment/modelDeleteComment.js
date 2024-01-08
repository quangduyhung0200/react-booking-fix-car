import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


class ManageCommeModelconfimdeledeComment extends Component {
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
        console.log(this.props)
        return (
            <div>

                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Xác nhận xóa đánh giá</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Bạn có chắc muốn xóa bình luận của :<span className='fw-bold'>{this.props.dataModel.UserComment ? this.props.dataModel.UserComment.userName : ''} </span>Không ?</Modal.Body>
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


export default ManageCommeModelconfimdeledeComment;