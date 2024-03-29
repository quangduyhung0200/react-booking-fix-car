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

import { getAllPrice, getAllPayment, getAllService, readAllCarByGara, readAllServiceCarGara, readAllServiceCarGaraPaymentPrice, postBooking } from '../../../services/guestService';

class ModelBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            customerEmail: '',
            customerAddress: '',
            customerReson: "",
            phone: '',
            garaId: "",
            garaName: '',
            garaAddress: '',
            garaDescription: '',
            garaProvind: '',
            garaAvata: '',
            userId: '',
            listCar: [],
            listPrice: [],
            listPayment: [],
            selectCarId: '',
            listService: [],
            selectService: '',
            price: '',
            payment: '',
            garaProvindname: {},
            timeid: '',
            time: '',
            date: '',


            serviceCheck: [],
            priceId: '',
            isValidEmail: true,
            isValidUserName: true,
            isValidphone: true,


            isValidCar: true,
            isValidAddress: true,
            isValidService: true,
            isValidReson: true



        }
    }
    isNumeric = (value) => {
        return /^-?\d+$/.test(value);
    }
    async componentDidMount() {
        let data = await getAllService()
        let data1 = await getAllPrice()
        let data2 = await getAllPayment()

        if (data.EC === 0 && data1.EC === 0 && data2.EC === 0) {
            this.setState({
                serviceCheck: data.DT,
                listPrice: data1.DT,
                listPayment: data2.DT,
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
            coppyState.garaName = this.props.dataModelSchedule.GaraScheduleData ? this.props.dataModelSchedule.GaraScheduleData.nameGara : '';
            coppyState.garaAddress = this.props.dataModelSchedule.GaraScheduleData ? this.props.dataModelSchedule.GaraScheduleData.address : '';
            coppyState.garaDescription = this.props.dataModelSchedule.GaraScheduleData ? this.props.dataModelSchedule.GaraScheduleData.description : '';
            coppyState.garaAvata = this.props.dataModelSchedule.GaraScheduleData ? this.props.dataModelSchedule.GaraScheduleData.avata : '';
            coppyState.date = this.props.dataModelSchedule ? this.props.dataModelSchedule.date : '';
            coppyState.time = this.props.dataModelSchedule.timeDataSchedule ? this.props.dataModelSchedule.timeDataSchedule.timValue : '';
            coppyState.timeid = this.props.dataModelSchedule ? this.props.dataModelSchedule.timeType : '';
            coppyState.garaId = this.props.dataModelSchedule ? this.props.dataModelSchedule.garaId : '';

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
    vetyfyData = () => {

        let { customerName, customerEmail, phone, customerAddress, customerReson, selectCarId, selectService, isValidReson, isValidCar } = this.state
        let re = /\S+@\S+\.\S+/;
        let coppyStatea = { ...this.state }
        coppyStatea.isValidEmail = true
        coppyStatea.isValidUserName = true
        coppyStatea.isValidCar = true
        coppyStatea.isValidService = true
        coppyStatea.isValidAddress = true
        coppyStatea.isValidphone = true



        this.setState({
            ...coppyStatea
        })


        if (!customerName) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidUserName = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (this.isNumeric(phone) === false) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidphone = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!phone) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidphone = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!customerEmail) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidEmail = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!re.test(customerEmail)) {

            toast.error('ples enter email address')
            let coppyState = { ...coppyStatea }
            coppyState.isValidEmail = false
            this.setState({
                ...coppyState
            })
            return false
        }


        if (!customerAddress) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidAddress = false
            this.setState({
                ...coppyState
            })
            return false
        }


        if (!customerReson) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidReson = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!selectCarId.value) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidCar = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!selectService.value) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidService = false
            this.setState({
                ...coppyState
            })
            return false
        }








        return true



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

            const results = allService.filter(({ id: id1 }) => carService.some(({ id: id2, }) => +id2 === +id1));
            let resule2 = this.buidDataInputSeclectservice2(results)


            console.log('list service: ', allService)

            this.setState({
                selectCarId: selectedOption,
                listService: resule2,



            })
        }

    }
    handleChangeService = async (selectedOption) => {

        let res = await readAllServiceCarGaraPaymentPrice(this.state.garaId, this.state.selectCarId.value, selectedOption.value)


        if (res.EC === 0) {
            this.setState({
                selectService: selectedOption,
                price: res.DT.priceData.value,
                payment: res.DT.paymentData.value,
                priceId: res.DT.priceId

            })
        }

    }
    handClose = () => {
        console.log(this.state.listCar[0])
        this.setState({
            customerName: '',
            customerEmail: '',
            customerAddress: '',
            customerReson: "",
            phone: '',
            selectCarId: this.state.listCar[0].value
        })
        this.props.closeBookingModel()
    }
    buidDataSave = (data) => {
        let resuf = {}
        resuf.email = data.customerEmail
        resuf.date = data.date
        resuf.userName = data.customerName
        resuf.time = data.time
        resuf.garaName = data.garaName

        resuf.address = data.customerAddress
        resuf.garaId = data.garaId
        resuf.timetype = data.timeid
        resuf.carId = data.selectCarId.value
        resuf.serviceId = data.selectService.value
        resuf.priceId = data.priceId
        resuf.phone = data.phone
        resuf.reson = data.customerReson
        return resuf



    }
    handlSaveBooking = async () => {
        let check = this.vetyfyData()
        if (check) {

            let data = this.buidDataSave(this.state)

            let res = await postBooking(data)
            if (res.EC === 0) {
                toast.success('Đặt lịch thành công, vui lòng kiểm tra email để xác nhận')
                this.props.closeBookingModel()
            }
            if (res.EC === 1) {
                toast.success('Thông tin bạn nhập cỏ vẻ không hợp lệ, vui lòng kiểm tra lại')
            }
            if (res.EC === 2) {
                toast.success('Thông itn đặt lịch đã đưuoc đặt trước đó, vui lòng kiểm tra lại')
            }

        }
        else {
            toast.error('Bạn đã ghi thiếu thông tin')
        }

    }
    render() {
        let imageBase64 = ''


        let { garaName, garaAddress, garaDescription, garaProvind, garaAvata } = this.state

        let { customerName, customerEmail, phone, customerAddress, customerReson, selectCarId, selectService, isValidEmail, isValidUserName, isValidphone, isValidCar, isValidAddress
            , isValidService, isValidReson, time, date } = this.state
        if (garaAvata.data) {

            imageBase64 = new Buffer(garaAvata.data, 'base64').toString('binary')
        }

        let date2 = new Date(date * 1000).toLocaleDateString("vi")
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
                            <span>Đặt lịch</span>
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
                                <hr></hr>
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label className='fw-bold'>Họ và tên</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerName')}
                                    type='text'
                                    className={isValidUserName === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Nhập họ và tên... '
                                    value={this.state.customerName} required></input>
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label className='fw-bold'>Số điện thoại</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'phone')}
                                    type='text'
                                    className={isValidphone === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Nhập số điện thoại '
                                    value={this.state.phone} required></input>
                            </div>

                            <div className='col-12   col-sm-6 from-group'>
                                <label className='fw-bold'>Email</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerEmail')}
                                    type='Nhập email'
                                    className={isValidEmail === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='descriptions '
                                    value={this.state.customerEmail} required></input>
                            </div>

                            <div className='col-12   col-sm-6 from-group'>
                                <label className='fw-bold'>Địa chỉ</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerAddress')}
                                    type='text'
                                    className={isValidAddress === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Nhập địa chỉ '
                                    value={this.state.customerAddress} required></input>
                            </div>

                            <div className='col-12   col-sm-6 from-group'>
                                <label className='fw-bold'>Miêu tả tình hình xe</label>
                                <input
                                    onChange={(event) => this.handlOnchaneInput(event.target.value, 'customerReson')}
                                    type='text'
                                    className={isValidReson === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Nhập miêu tả tình hình xe '
                                    value={this.state.customerReson} required></input>
                            </div>

                            <div className='col-12 col-sm-6 from-group'>
                                <label className={isValidCar === true ? 'fw-bold' : 'is-invalid fw-bold'}>Chọn xe</label>
                                <Select
                                    className={isValidCar === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder={'Chọn xe'}
                                    value={this.state.selectCarId}
                                    onChange={this.handleChange}
                                    options={this.state.listCar}

                                />
                            </div>
                            <div className='col-12 col-sm-6 from-group'>
                                <label className={isValidService === true ? 'fw-bold' : 'is-invalid fw-bold'}>Chọn dịch vụ</label>
                                <Select
                                    className={isValidService === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder={'Chọn dịch vụ'}
                                    value={this.state.selectService}
                                    onChange={this.handleChangeService}
                                    options={this.state.listService}

                                />
                            </div>
                            <div className='col-12 col-sm-6 from-group'>

                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label>Gía tiền</label>
                                <p className='fw-bold'>{this.state.price} VND</p>
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label>Hình thức thanh toán gara nhận là: </label>
                                <p className='fw-bold'>{this.state.payment}</p>
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label>Ngày</label>
                                <p className='fw-bold'>{date2} </p>
                            </div>
                            <div className='col-12   col-sm-6 from-group'>
                                <label>Giờ: </label>
                                <p className='fw-bold'>{this.state.time}</p>
                            </div>




                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handClose()}>
                            Hủy đặt lịch
                        </Button>
                        <Button variant="primary" onClick={() => this.handlSaveBooking()}>
                            Xác nhận đặt lịch
                        </Button>
                    </Modal.Footer>
                </Modal >

            </>
        );
    }
}


export default ModelBooking;
