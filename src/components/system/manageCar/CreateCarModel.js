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

class CreateCar extends Component {
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
        let data = await feactAllCarCompany()

        if (data && data.EC === 0) {
            this.setState({
                listCarCompany: data.DT
            })
        }


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModel !== this.props.dataModel) {
            if (this.props.action === 'CREATE') {
                this.setState({
                    nameCar: '',
                    id: '',
                    carCompanyId: '',
                    avata: '',
                    descriptions: '',

                    previewimg: '',
                })
            }
            if (this.props.action === 'UPDATE') {


                let coppyState = { ...this.state }
                coppyState.nameCar = this.props.dataModel.nameCar
                coppyState.carCompanyId = this.props.dataModel.carCompanyData.id
                coppyState.avata = new Buffer(this.props.dataModel.avata, 'base64').toString('binary')
                coppyState.descriptions = this.props.dataModel.descriptions
                coppyState.id = this.props.dataModel.id

                this.setState({
                    ...coppyState
                })
            }
        }
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
    handlCreateCar = async () => {
        let { id, nameCar, avata, descriptions, carCompanyId } = this.state

        if (this.props.action === 'CREATE') {
            if (avata === '') {
                avata = `data:image/png;base64,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`
            }
            if (carCompanyId === '') {
                carCompanyId = 1
            }
            let res = await createCar(nameCar, avata, descriptions, carCompanyId)

            if (res && res.EC === 0) {
                toast.success('create user success')

                this.props.onHide()
            }


        }
        if (this.props.action === 'UPDATE') {
            if (carCompanyId === '') {
                carCompanyId = 1
            }
            let res = await updateCar(id, nameCar, avata, descriptions, carCompanyId)
            // if (res && res.EC === 0) {
            //     toast.success('update car success')

            //     this.props.onHide()
            // }

        }
    }
    render() {
        let { listCarCompany } = this.state


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
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'nameCar')}
                                    type='text' className='form-control'
                                    placeholder='Email address '
                                    value={this.state.nameCar} required></input>
                            </div>
                            <div className='col-12 col-sm-6 from-group'>
                                <label>list company</label>
                                <select onChange={(event) => this.handlOnchaneInput(event.target.value, 'carCompanyId')} className='form-select'
                                    value={this.state.carCompanyId} >
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
                                <input
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
                                    <div className='preView-Image'
                                        style={this.props.action === 'CREATE' ? { backgroundImage: `url(${this.state.previewimg})`, height: '500px', backgroundSize: 'cover' } :
                                            { backgroundImage: `url(${this.state.avata})`, height: '500px', backgroundSize: 'cover' }}
                                    // style={{ backgroundImage: `url(${this.state.previewimg})`, height: '500px', backgroundSize: 'cover' }}
                                    >

                                    </div>
                                </div>


                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handlCreateCar()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div >
        );
    }
}


export default CreateCar;