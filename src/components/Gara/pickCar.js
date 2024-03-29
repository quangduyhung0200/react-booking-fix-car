import React, { Component } from 'react';

import { UserContext } from "../../context/userContext"
import { getDataGara } from '../../services/garaService';
import { Buffer } from 'buffer';

import { deletePickCar } from '../../services/garaService';
import { registerCartoGara } from '../../services/garaService';
import { getAllPrice, getAllPayment, getAllService } from '../../services/guestService';

import { getDataPickCar, } from '../../services/guestService';
import { feactAllCarCompany } from '../../services/guestService';
import DetailCar from '../customer/car/carDetail'
import { getAllGara } from '../../services/guestService';
import _ from 'lodash';
import './PickCar.scss'
import { toast } from 'react-toastify';
import HomeFooter from '../home/homeFooter/homeFooter';

class PickCar extends Component {

    constructor(props) {
        super(props);
        this.state = {

            address: '',
            description: '',
            nameGara: '',
            phone: '',
            provind: '',
            avata: '',
            descriptionHTML: '',
            userId: '',
            listCarCompany: [],
            selectCarCompany: '',
            listCar: [],
            selectCar: '',
            listPrice: [],
            selectPrice: '',
            listPayment: [],
            selectPayment: '',
            listService: [],
            selectService: '',
            garaId: '',
            listGara: [],
            selectGara: ''
        }
    }
    async componentDidMount() {
        let dataPrice = await getAllPrice()
        if (dataPrice && dataPrice.EC === 0) {
            this.setState({
                listPrice: dataPrice.DT
            })
        }
        let dataService = await getAllService()
        if (dataService && dataService.EC === 0) {
            this.setState({
                listService: dataService.DT
            })
        }
        let dataPayment = await getAllPayment()
        if (dataPayment && dataPayment.EC === 0) {
            this.setState({
                listPayment: dataPayment.DT
            })
        }
        let dataprovind = await feactAllCarCompany()
        if (dataprovind && dataprovind.EC === 0) {
            let listCarCompany = dataprovind.DT

            listCarCompany.unshift({
                id: 'ALL',
                name: "ALL",
            })
            this.setState({
                listCarCompany: listCarCompany
            })


        }



        let data3 = await getDataPickCar('ALL')
        if (data3 && data3.EC === 0) {

            let data4 = data3.DT
            let listCar = []
            if (data4 && !_.isEmpty(data3.DT)) {

                if (data4 && data4.length > 0) {
                    data4.map(item => {
                        listCar.push({
                            id: item.id,
                            name: item.nameCar
                        })
                    })
                }

            }

            this.setState({

                listCar: listCar,
                selectCar: listCar[0].id



            })
        }
        // let data1 = await getDataCarById(2)

        if (this.context.user.account.role[0].id === 4 || this.context.user.account.role[0].id === 3) {

            let data = await getAllGara()
            if (data && data.EC === 0) {
                let imageBase64 = ''
                if (data.DT[0].avata) {

                    imageBase64 = new Buffer(data.DT[0].avata.data, 'base64').toString('binary')
                }
                let coppyState = { ...this.state }
                coppyState.address = data.DT[0].address
                coppyState.description = data.DT[0].description
                coppyState.nameGara = data.DT[0].nameGara
                coppyState.phone = data.DT[0].phone
                coppyState.provind = data.DT[0].provindGaraData.name

                coppyState.avata = imageBase64
                coppyState.descriptionHTML = data.DT[0].contenHTML
                coppyState.userId = data.DT[0].id
                coppyState.garaId = data.DT[0].id
                coppyState.listGara = data.DT

                this.setState({
                    ...coppyState
                })
            }
        }
        else {
            let data = await getDataGara(this.context.user.account.id)

            if (data && data.EC === 0) {
                let imageBase64 = ''
                if (data.DT.avata) {

                    imageBase64 = new Buffer(data.DT.avata, 'base64').toString('binary')
                }
                let coppyState = { ...this.state }
                coppyState.address = data.DT.address
                coppyState.description = data.DT.description
                coppyState.nameGara = data.DT.nameGara
                coppyState.phone = data.DT.phone
                coppyState.provind = data.DT.provindGaraData.name
                coppyState.avata = imageBase64
                coppyState.descriptionHTML = data.DT.contenHTML
                coppyState.userId = data.DT.userId
                coppyState.garaId = data.DT.id


                this.setState({
                    ...coppyState
                })
            }
        }


    }
    handlOnchaneSelect = async (event, name) => {
        let coppyState = { ...this.state }
        coppyState[name] = event.target.value
        this.setState({
            ...coppyState
        })

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevState.selectCarCompany !== this.state.selectCarCompany) {

            let res = await getDataPickCar(this.state.selectCarCompany)

            if (res && res.EC === 0) {

                let data = res.DT
                let listCar = []
                if (data && !_.isEmpty(res.DT)) {

                    if (data && data.length > 0) {
                        data.map(item => {
                            listCar.push({
                                id: item.id,
                                name: item.nameCar
                            })
                        })
                    }

                }


                this.setState({

                    listCar: listCar,
                    selectCar: listCar[0].id


                })
            }




        }

    }
    handlOnchaneSelectCar = (event) => {


        this.setState({
            selectCar: event.target.value
        })
    }
    buidDataSave = (data) => {


        let obj = {};
        obj.garaId = data.garaId;
        obj.carId = data.selectCar;
        obj.serviceId = data.selectService === '' ? 1 : data.selectService;
        obj.priceId = data.selectPrice === '' ? 1 : data.selectPrice;
        obj.paymentId = data.selectPayment === '' ? 1 : data.selectPayment;




        return obj
    }
    handlOnclickSavePickCar = async () => {

        let dataSave = this.buidDataSave(this.state)

        let res = await registerCartoGara(dataSave)
        if (res.EC === 0) {
            toast.success('Thêm thành công dữ liệu')
        }
        else {
            toast.error(res.EM)
        }

    }
    handlOnclickDeletePickCar = async () => {
        let garaId = this.state.garaId;
        let carId = this.state.selectCar
        let serviceId = this.state.selectService === '' ? 1 : this.state.selectService;

        let res = await deletePickCar(garaId, carId, serviceId)
        if (res.EC === 0) {
            toast.success('Xóa thành công dữ liệu')
        }
        else {
            toast.error(res.EM)
        }
    }
    handlOnchaneSelectGara = async (event) => {
        let data = await getDataGara(event.target.value)

        if (data && data.EC === 0) {
            let imageBase64 = ''
            if (data.DT.avata) {

                imageBase64 = new Buffer(data.DT.avata, 'base64').toString('binary')
            }
            let coppyState = { ...this.state }
            coppyState.address = data.DT.address
            coppyState.description = data.DT.description
            coppyState.nameGara = data.DT.nameGara
            coppyState.phone = data.DT.phone
            coppyState.provind = data.DT.provindGaraData.name
            coppyState.avata = imageBase64
            coppyState.descriptionHTML = data.DT.contenHTML
            coppyState.userId = data.DT.userId
            coppyState.garaId = data.DT.id


            this.setState({
                ...coppyState
            })
        }
        this.setState({
            selectGara: event.target.value
        })
    }
    render() {

        let { listCarCompany, listCar, listPrice, listPayment, listService, listGara, provind } = this.state
        console.log(this.state)
        return (
            <>
                <div className='PickCar-Container container'>
                    <div className='row'>
                        <div className='introduction col-12 row'>
                            <div className='content-left col-2' style={{ backgroundImage: `url(${this.state.avata ? this.state.avata : ''})` }}>

                            </div>
                            <div className='content-right col-10'>
                                <div className='up col-12'>
                                    {this.state.nameGara}
                                </div>

                                <div className='down col-12'>
                                    {this.state.description}

                                </div>
                                <div className='down col-12'>

                                    <i class="fa fa-map-marker" aria-hidden="true"></i>{provind}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='pick-Gara'>
                            {this.context.user.account.role[0].id === 4 && <div className='col-4'>
                                <p className='fw-bold'>Chọn gara</p>
                                <select className='form-control' onChange={(event) => this.handlOnchaneSelectGara(event)} >
                                    {listGara && listGara.length > 0 &&
                                        listGara.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.userId}> {item.nameGara} </option>
                                            )
                                        })}


                                </select>
                            </div>}
                            {this.context.user.account.role[0].id === 3 && <div className='col-4'>
                                <p className='fw-bold'>Chọn gara</p>
                                <select className='form-control' onChange={(event) => this.handlOnchaneSelectGara(event)} >
                                    {listGara && listGara.length > 0 &&
                                        listGara.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.userId}> {item.nameGara} </option>
                                            )
                                        })}


                                </select>
                            </div>}
                        </div>

                        <hr className='my-2'></hr>
                        <div className='schedule-docter col-12 row '>
                            <div className='col-4'>
                                <p className='fw-bold'>Chọn hãng xe</p>
                                <select className='form-control' onChange={(event) => this.handlOnchaneSelect(event, 'selectCarCompany')} >
                                    {listCarCompany && listCarCompany.length > 0 &&
                                        listCarCompany.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.name} </option>
                                            )
                                        })}


                                </select>
                            </div>
                            <div className='col-4'>
                                <p className='fw-bold'>Chọn xe</p>
                                <select className='form-control' onChange={(event) => this.handlOnchaneSelect(event, 'selectCar')} >
                                    {listCar && listCar.length > 0 &&
                                        listCar.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.name} </option>
                                            )
                                        })}
                                </select>
                            </div>

                            <div className='col-4'>
                                <p className='fw-bold'>Chọn phương thức thành toán</p>
                                <select className='form-control' onChange={(event) => this.handlOnchaneSelect(event, 'selectPayment')} >
                                    {listPayment && listPayment.length > 0 &&
                                        listPayment.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.value} </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-6'>
                                <p className='fw-bold'>Chọn số dịch vụ</p>
                                <select className='form-control' onChange={(event) => this.handlOnchaneSelect(event, 'selectService')} >
                                    {listService && listService.length > 0 &&
                                        listService.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.name} </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-6'>
                                <p className='fw-bold'>Chọn số tiền cho dịch vụ này</p>
                                <select className='form-control' onChange={(event) => this.handlOnchaneSelect(event, 'selectPrice')} >
                                    {listPrice && listPrice.length > 0 &&
                                        listPrice.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.value} </option>
                                            )
                                        })}
                                </select>
                            </div>


                        </div>

                        <div className='detail-Car col-12 mt-2'>
                            <hr></hr>
                            <DetailCar carId={this.state.selectCar} />
                        </div>

                        <div className='action'>
                            <hr></hr>
                            <button onClick={() => this.handlOnclickSavePickCar()} className='btn btn-primary mx-3'>Lưu thông tin</button>
                            <button onClick={() => this.handlOnclickDeletePickCar()} className='btn btn-warning my-3'>Xóa thông tin đang chọn</button></div>
                    </div>

                </div >
                <HomeFooter />
            </>
        )
    }

}

PickCar.contextType = UserContext

export default PickCar;
