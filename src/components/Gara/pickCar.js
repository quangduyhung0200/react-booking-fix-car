import React, { Component } from 'react';

import { UserContext } from "../../context/userContext"
import { getDataGara } from '../../services/garaService';
import { Buffer } from 'buffer';
import Select from 'react-select';
import { deletePickCar } from '../../services/garaService';
import { registerCartoGara } from '../../services/garaService';
import { getAllPrice, getAllPayment, getAllService } from '../../services/guestService';
import { getDataCarById } from '../../services/guestService';
import { getDataPickCar, } from '../../services/guestService';
import { feactAllCarCompany } from '../../services/guestService';
import DetailCar from '../customer/car/carDetail'
import _ from 'lodash';



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
            garaId: ''
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
            coppyState.descriptionHTML = data.DT.descriptionHTML
            coppyState.userId = data.DT.id
            coppyState.garaId = data.DT.id


            this.setState({
                ...coppyState
            })
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

    }
    handlOnclickDeletePickCar = async () => {
        let garaId = this.state.garaId;
        let carId = this.state.selectCar
        let serviceId = this.state.selectService === '' ? 1 : this.state.selectService;

        let res = await deletePickCar(garaId, carId, serviceId)
    }
    render() {

        let { listCarCompany, listCar, listPrice, listPayment, listService } = this.state

        return (
            <>
                <div className='Docter-Detail-Container container'>
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
                            </div>
                        </div>
                        <div className='schedule-docter col-12 row '>
                            <div className='col-4'>
                                <p>chon hang xe</p>
                                <select onChange={(event) => this.handlOnchaneSelect(event, 'selectCarCompany')} >
                                    {listCarCompany && listCarCompany.length > 0 &&
                                        listCarCompany.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.name} </option>
                                            )
                                        })}


                                </select>
                            </div>
                            <div className='col-4'>
                                <p>chon xe</p>
                                <select onChange={(event) => this.handlOnchaneSelect(event, 'selectCar')} >
                                    {listCar && listCar.length > 0 &&
                                        listCar.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.name} </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-4'>
                                <p>chon so tien toi thieu</p>
                                <select onChange={(event) => this.handlOnchaneSelect(event, 'selectPrice')} >
                                    {listPrice && listPrice.length > 0 &&
                                        listPrice.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.value} </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-6'>
                                <p>chon phuong thuc thanh toan</p>
                                <select onChange={(event) => this.handlOnchaneSelect(event, 'selectPayment')} >
                                    {listPayment && listPayment.length > 0 &&
                                        listPayment.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.value} </option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-6'>
                                <p>chon dich vu muon chon</p>
                                <select onChange={(event) => this.handlOnchaneSelect(event, 'selectService')} >
                                    {listService && listService.length > 0 &&
                                        listService.map((item, index) => {
                                            return (
                                                <option key={`chile-${index}`} value={item.id}> {item.name} </option>
                                            )
                                        })}
                                </select>
                            </div>


                        </div>
                        <div className='detail-info-docter col-12'>
                            <DetailCar carId={this.state.selectCar} />
                        </div>
                        <div><button onClick={() => this.handlOnclickSavePickCar()} className='btn btn-primary'>save</button>
                            <button onClick={() => this.handlOnclickDeletePickCar()} className='btn btn-primary'>khong chon xe nay nua</button></div>
                    </div>

                </div >
            </>
        )
    }

}

PickCar.contextType = UserContext

export default PickCar;
