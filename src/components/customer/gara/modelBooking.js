import React, { Component } from 'react';



import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { mapKeys } from 'lodash';
import _ from 'lodash';

import Select from 'react-select';
import ReactDatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import moment from 'moment';
import './modelBoking.scss'
import { Buffer } from 'buffer';
import { readAllCarByGara, readAllServiceCarGara, getAllService } from '../../../services/userService';

class ModelBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            customerEmail: '',
            customerAddress: '',
            customerReson: "",
            garaId: "",
            garaName: '',
            garaAddress: '',
            garaDescription: '',
            garaProvind: '',
            garaAvata: '',
            userId: '',
            listCar: [],
            selectCarId: '',
            listService: [],
            selectService: '',
            price: '',
            payment: '',
            garaProvindname: {},
            timeid: '',
            time: '',
            date: '',
            serviceCheck: []


        }
    }
    async componentDidMount() {
        let data = await getAllService()
        if (data.EC === 0) {
            this.setState({
                serviceCheck: data.DT
            })
        }
    }
    buidDataInputSeclectGender = (inputData) => {
        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.Cars.nameCar
                obj.value = item.Cars.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModelSchedule !== this.props.dataModelSchedule) {
            let coppyState = { ...this.state }
            coppyState.garaName = this.props.dataModelSchedule.GaraScheduleData.nameGara;
            coppyState.garaAddress = this.props.dataModelSchedule.GaraScheduleData.address;
            coppyState.garaDescription = this.props.dataModelSchedule.GaraScheduleData.description;
            coppyState.garaAvata = this.props.dataModelSchedule.GaraScheduleData.avata;
            coppyState.date = this.props.dataModelSchedule.date;
            coppyState.time = this.props.dataModelSchedule.timeDataSchedule.timValue;
            coppyState.timeid = this.props.dataModelSchedule.timeType;
            coppyState.garaId = this.props.dataModelSchedule.garaId;

            this.setState({
                ...coppyState
            })

        }
        if (prevProps.datagara !== this.props.datagara) {
            let coppyState = { ...this.state }


            coppyState.garaProvindname = this.props.dataGara;


        }
        if (prevState.garaId !== this.state.garaId) {
            let data = await readAllCarByGara(this.state.garaId)
            this.setState({
                listCar: this.buidDataInputSeclectGender(data.DT)
            })
        }

    }
    handlOnchaneInput = (value, id) => {

        let coppyState = { ...this.state }
        coppyState[id] = value
        this.setState({
            ...coppyState
        })
    }
    handleChangedatePick = (date) => {


    }

    buildTimeBooking = (data) => {

    }
    buildDocterName = (data) => {

    }
    handlConfierButton = async () => {


    }
    buidDataInputSeclectservice = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.id = item.serviceId
                obj.priceid = item.priceData.id;
                obj.pricevalue = item.priceData.value;
                obj.paymentid = item.paymentData.id;
                obj.paymentvalue = item.paymentData.value;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buidDataInputSeclectservice2 = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.name
                obj.value = item.id;

                resuf.push(obj);

            })


        }

        return resuf
    }
    handleChange = async (selectedOption) => {

        let res = await readAllServiceCarGara(this.state.garaId, selectedOption.value)
        if (res.EC === 0) {
            let carService = this.buidDataInputSeclectservice(res.DT)
            let allService = this.state.serviceCheck



            const results = allService.filter(({ id: id1 }) => carService.some(({ id: id2 }) => +id2 === +id1));

            let resule2 = this.buidDataInputSeclectservice2(results)

            console.log(resule2)




            this.setState({
                selectCarId: selectedOption,
                listService: resule2
            })
        }

    }
    handleChangeService = (selectedOption) => {
        this.setState({
            selectService: selectedOption,

        })
    }
    render() {
        let imageBase64 = ''
        console.log('check state booking: ', this.state)

        let { garaName, garaAddress, garaDescription, garaProvind, garaAvata } = this.state

        if (garaAvata.data) {

            imageBase64 = new Buffer(garaAvata.data, 'base64').toString('binary')
        }
        return (
            <>

                <Modal
                    {...this.props}
                    size="xl"
                    show={this.props.isOpentTogger}
                    aria-labelledby="contained-modal-title-vcenter"

                    className='model-user'
                    onHide={() => this.props.closeBookingModel()}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <span>dat lich</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className='row'>
                            <div className='introduction  row'>
                                <div className='content-left col-2'
                                    style={{
                                        backgroundImage: `url(${imageBase64 ?
                                            imageBase64 : ''})`,

                                    }}
                                >

                                </div>
                                <div className='content-right col-10 row'>
                                    <div className='up col-12 '>

                                        {garaName}
                                    </div>

                                    <div className='down col-12'>
                                        {garaDescription}
                                    </div>
                                </div>
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label>ho ten</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerName')}
                                    type='text' className='form-control'
                                    placeholder='descriptions '
                                    value={this.state.customerName} required></input>
                            </div>

                            <div className='col-12   col-sm-6 from-group'>
                                <label>email</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerEmail')}
                                    type='email' className='form-control'
                                    placeholder='descriptions '
                                    value={this.state.customerEmail} required></input>
                            </div>

                            <div className='col-12   col-sm-6 from-group'>
                                <label>dia chi</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerAddress')}
                                    type='text' className='form-control'
                                    placeholder='descriptions '
                                    value={this.state.customerAddress} required></input>
                            </div>

                            <div className='col-12   col-sm-6 from-group'>
                                <label>mieu ta tinh tinh hinh xe</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerReson')}
                                    type='text' className='form-control'
                                    placeholder='descriptions '
                                    value={this.state.customerReson} required></input>
                            </div>

                            <div className='col-12 col-sm-6 from-group'>
                                <label>list car</label>
                                <Select
                                    placeholder={'CHON XE'}
                                    value={this.state.selectCarId}
                                    onChange={this.handleChange}
                                    options={this.state.listCar}

                                />
                            </div>
                            <div className='col-12 col-sm-6 from-group'>
                                <label>list service</label>
                                <Select
                                    placeholder={'CHON dich vu'}
                                    value={this.state.selectService}
                                    onChange={this.handleChangeService}
                                    options={this.state.listService}

                                />
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label>gia tien</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'descriptions')}
                                    type='text' className='form-control'
                                    placeholder='descriptions '
                                    value={this.state.descriptions} required></input>
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label>hin thuc thanh toan</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'descriptions')}
                                    type='text' className='form-control'
                                    placeholder='descriptions '
                                    value={this.state.descriptions} required></input>
                            </div>




                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.props.closeBookingModel()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handlCreateCar()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal >

            </>
        );
    }
}


export default ModelBooking;
