import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { feactAllCarCompany } from '../../../services/userService';
import CommonUtils from '../../../utils/CommonUtils';

import { toast } from 'react-toastify';

import _ from 'lodash';
import Lightbox from 'react-image-lightbox';

class CreateCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameCar: '',
            listCarCompany: [],
            selectedCarCompany: '',
            avata: '',
            descriptions: '',
            isOpen: false,
            previewimg: '',
        }
    }
    async componentDidMount() {
        let data = await feactAllCarCompany()

        if (data && data.EC === 0) {
            this.setState({
                listCarCompany: data.DT.DT
            })
        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleClose = () => {
        this.props.onHide()

    }
    handlOnchaneInput = (value, name) => {
        let _userDate = { ...this.state };
        _userDate[name] = value
        this.setState({
            ..._userDate
        })



    }

    handleOnchandImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let ObjectURL = URL.createObjectURL(file);
            this.setState({
                previewimg: ObjectURL,
                avata: base64
            })

        }


    }
    render() {
        let { listCarCompany } = this.state
        console.log(this.state)
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
                            <span>{this.props.action === 'CREATE' ? 'Create new user' : 'Edit new user'}</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col-12 col-sm-6 from-group'>
                                <label>car name</label>
                                <input disabled={this.props.action === 'CREATE' ? false : true}
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'nameCar')}
                                    type='text' className='form-control'
                                    placeholder='Email address '
                                    value={this.state.nameCar} required></input>
                            </div>
                            <div className='col-12 col-sm-6 from-group'>
                                <label>list company</label>
                                <select onChange={(event) => this.handlOnchaneInput(event.target.value, 'selectedCarCompany')} className='form-select'
                                    value={this.state.selectedCarCompany} >
                                    {listCarCompany && listCarCompany.length > 0 &&
                                        listCarCompany.map((item, index) => {
                                            return (
                                                < option key={`group-${index}`} value={item.id}> {item.name}</option>
                                            )


                                        })}


                                </select>
                            </div>
                            <div className='col-12  from-group'>
                                <label>description</label>
                                <input disabled={this.props.action === 'CREATE' ? false : true}
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'descriptions')}
                                    type='text' className='form-control'
                                    placeholder='descriptions '
                                    value={this.state.descriptions} required></input>
                            </div>

                            <div className='col-12 form-group'>
                                <label >
                                    image
                                </label>
                                <div className='preView-image-container '>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchandImage(event)}></input>
                                    <label className='lable-upload' htmlFor='previewImg'>Tải ảnh </label>
                                    <div className='preView-Image' style={{ backgroundImage: `url(${this.state.previewimg})`, height: '500px', backgroundSize: 'cover' }}></div>
                                </div>


                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div >
        );
    }
}


export default CreateCar;