import React, { Component } from 'react';

import './allGara.scss'
import Carousel from 'react-bootstrap/Carousel';
import { withRouter } from 'react-router';
import { getAllGara } from '../../../services/guestService';
import ProfileGara from '../../customer/gara/garaProfile';
import Select from 'react-select';
import HomeFooter from '../homeFooter/homeFooter';
import { getAllProvind, feactAllCarCompany, feactAllCar, getAllGarabyProvind, getDataPickCar } from '../../../services/guestService';
import _ from 'lodash';
class AllGara extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listProvind: [],
            selectProvind: '',
            listCarCompany: [],
            selectCarCompany: '',
            listCar: [],
            selectCar: '',
            dataModel: {}
        }
    }

    async componentDidMount() {
        let dataprovind = await getAllProvind()
        let dataprovind1 = dataprovind.DT
        let dataprovind2 = [{
            label: 'ALL',
            value: '0'
        }]
        dataprovind1.map((item, index) =>
            dataprovind2[index + 1] = {
                label: item.name,
                value: item.id
            })

        let dataCarCompany = await feactAllCarCompany()
        let dataCarCompany2 = dataCarCompany.DT
        let dataCarCompany3 = [{
            label: 'ALL',
            value: '0'
        }]
        dataCarCompany2.map((item, index) =>
            dataCarCompany3[index + 1] = {
                label: item.name,
                value: item.id
            })


        let dataCar = await feactAllCar('ALL')
        let dataCar2 = dataCar.DT
        let dataCar3 = [{
            label: 'ALL',
            value: '0'
        }]
        dataCar2.map((item, index) =>
            dataCar3[index + 1] = {
                label: item.nameCar,
                value: item.id
            })


        if (dataprovind.EC === 0, dataCarCompany.EC === 0 && dataCar.EC === 0) {
            this.setState({
                listProvind: dataprovind2,
                listCarCompany: dataCarCompany3,
                listCar: dataCar3
            })
        }
    }
    buildDataSelectCarCompany = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.Cars.carCompanyData.name;
                obj.value = item.Cars.carCompanyData.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectCarCompanyAll = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.name;
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectCarAll = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.nameCar;
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectCar = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.Cars.nameCar;
                obj.value = item.Cars.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    handleChangeProvind = async (selectedOption) => {
        if (selectedOption.label === 'ALL') {

            let dataCarCompany = await feactAllCarCompany()
            let dataCarCompany2 = dataCarCompany.DT
            let dataCarCompany3 = [{
                label: 'ALL',
                value: '0'
            }]
            dataCarCompany2.map((item, index) =>
                dataCarCompany3[index + 1] = {
                    label: item.name,
                    value: item.id
                })

            let data = await feactAllCar('ALL')
            let res = await getAllGarabyProvind('ALL')
            let dataCar = this.buildDataSelectCar(res.DT)
            let dataCarAll = this.buildDataSelectCarAll(data.DT)
            const results2 = dataCarAll.filter(({ value: id1 }) => dataCar.some(({ value: id2, }) => +id2 === +id1));
            results2.unshift({
                label: 'ALL',
                value: 0
            })


            if (dataCarCompany.EC === 0) {
                this.setState({

                    listCarCompany: dataCarCompany3,
                    selectCarCompany: dataCarCompany3[0],
                    listCar: results2,
                    selectCar: results2[0],

                })
            }



        }
        else {
            let res = await getAllGarabyProvind(selectedOption.value)

            if (res.EC === 0) {
                let dataCarCompany = this.buildDataSelectCarCompany(res.DT)
                let dataCar = this.buildDataSelectCar(res.DT)
                let rescarcompany = await feactAllCarCompany()
                let rescar = await feactAllCar('ALL')

                if (rescarcompany.EC === 0 && typeof dataCarCompany !== 'undefined' && dataCarCompany.length > 0 && typeof dataCar !== 'undefined' && dataCar.length > 0) {
                    let dataCarCompanyAll = this.buildDataSelectCarCompanyAll(rescarcompany.DT)
                    const results = dataCarCompanyAll.filter(({ value: id1 }) => dataCarCompany.some(({ value: id2, }) => +id2 === +id1));
                    let dataCarAll = this.buildDataSelectCarAll(rescar.DT)
                    const results2 = dataCarAll.filter(({ value: id1 }) => dataCar.some(({ value: id2, }) => +id2 === +id1));
                    results.unshift({
                        label: 'ALL',
                        value: 0
                    })
                    results2.unshift({
                        label: 'ALL',
                        value: 0
                    })


                    this.setState({
                        listCarCompany: results,
                        selectCarCompany: results[0],
                        listCar: results2,
                        selectCar: results2[0]

                    })


                }
                else {
                    this.setState({
                        listCarCompany: [],
                        selectCarCompany: '',
                        listCar: [],
                        selectCar: '',

                    })
                }
            }
        }

        let coppyState = { ...this.state }
        coppyState.selectProvind = selectedOption
        this.setState({
            ...coppyState
        })


    }
    buildDataSelectCarbyCarCompany = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.nameCar;
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    handleChangeCarCompany = async (selectedOption) => {
        if (selectedOption.label === 'ALL') {
            if (+this.state.selectProvind.value === 0) {
                let data = await feactAllCar('ALL')
                let res = await getAllGarabyProvind('ALL')
                let dataCar = this.buildDataSelectCar(res.DT)
                let dataCarAll = this.buildDataSelectCarAll(data.DT)
                const results2 = dataCarAll.filter(({ value: id1 }) => dataCar.some(({ value: id2, }) => +id2 === +id1));
                results2.unshift({
                    label: 'ALL',
                    value: 0
                })


                if (data.EC === 0) {
                    this.setState({


                        listCar: results2,
                        selectCar: results2[0],

                    })
                }
            }
            else {

                let data = await feactAllCar('ALL')
                let res = await getAllGarabyProvind('ALL')
                let dataCar = this.buildDataSelectCar(res.DT)
                let dataCarAll = this.buildDataSelectCarAll(data.DT)
                const results2 = dataCarAll.filter(({ value: id1 }) => dataCar.some(({ value: id2, }) => +id2 === +id1));
                results2.unshift({
                    label: 'ALL',
                    value: 0
                })


                if (data.EC === 0) {
                    this.setState({


                        listCar: results2,
                        selectCar: results2[0],

                    })
                }

            }

        } else {
            if (+this.state.selectProvind.value === 0) {

                let res = await getAllGarabyProvind('ALL')
                let data = await getDataPickCar(selectedOption.value)
                let dataCar = this.buildDataSelectCar(res.DT)
                let dataCarAll = this.buildDataSelectCarAll(data.DT)

                const results2 = dataCarAll.filter(({ value: id1 }) => dataCar.some(({ value: id2, }) => +id2 === +id1));
                results2.unshift({
                    label: 'ALL',
                    value: 0
                })


                if (data.EC === 0) {
                    this.setState({


                        listCar: results2,
                        selectCar: results2[0],

                    })
                }


            } else {
                let res = await getAllGarabyProvind(this.state.selectProvind.value)

                if (res.EC === 0) {
                    let AllCar = this.buildDataSelectCar(res.DT)
                    let listCar = await getDataPickCar(selectedOption.value)
                    let car = this.buildDataSelectCarbyCarCompany(listCar.DT)

                    let AllCar2 = AllCar.reduce((res, itm) => {
                        // Test if the item is already in the new array
                        let result = res.find(item => JSON.stringify(item) == JSON.stringify(itm))
                        // If not lets add it
                        if (!result) return res.concat(itm)
                        // If it is just return what we already have
                        return res
                    }, [])

                    if (listCar.EC === 0 && typeof car !== 'undefined' && car.length > 0) {



                        const results2 = AllCar2.filter(({ label: id1 }) => car.some(({ label: id2, }) => id2 === id1));

                        results2.unshift({
                            label: 'ALL',
                            value: 0
                        })


                        this.setState({

                            listCar: results2,
                            selectCar: results2[0]

                        })


                    }
                }

            }
        }


        let coppyState = { ...this.state }
        coppyState.selectCarCompany = selectedOption
        this.setState({
            ...coppyState
        })


    }
    handleChangeCar = async (selectedOption) => {
        let coppyState = { ...this.state }
        coppyState.selectCar = selectedOption
        this.setState({
            ...coppyState
        })


    }
    handlSearch = () => {

        let data = {
            selectCar: this.state.selectCar === '' ? { label: 'ALL', value: 0 } : this.state.selectCar,
            selectCarCompany: this.state.selectCarCompany === '' ? { label: 'ALL', value: 0 } : this.state.selectCarCompany,
            selectProvind: this.state.selectProvind === '' ? { label: 'ALL', value: 0 } : this.state.selectProvind
        }
        this.setState({
            dataModel: data
        })
    }
    render() {



        return (


            <>
                <div className='home-header-banner-allgara img-fluid'>
                    <div className=' container'>
                        <div className='content-up row'>

                            <div className='search col-4'>

                                <Select

                                    placeholder={'CHON tinh thanh'}
                                    value={this.state.selectProvind}
                                    onChange={this.handleChangeProvind}
                                    options={this.state.listProvind}

                                />
                            </div>
                            <div className='search col-4'>

                                <Select

                                    placeholder={'CHON HANG XE'}
                                    value={this.state.selectCarCompany}
                                    onChange={this.handleChangeCarCompany}
                                    options={this.state.listCarCompany}

                                />
                            </div>
                            <div className='search col-4'>

                                <Select

                                    placeholder={'CHON XE'}
                                    value={this.state.selectCar}
                                    onChange={this.handleChangeCar}
                                    options={this.state.listCar}

                                />
                            </div>
                            <div className='search col-12 text-centrel'>

                                <button onClick={() => this.handlSearch()} className='btn btn-primary'>tim kiem</button>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='container'>
                    <div className='content-down'>  <ProfileGara dataModel={this.state.dataModel} /></div>

                </div>
                <HomeFooter /></>



        )
    }

}



export default withRouter(AllGara);