import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './manageCar.scss'
import { Buffer } from 'buffer';

import CreateCar from './CreateCarModel';
import Modelconfimdelede from './modelConfimDelete';
import _ from 'lodash';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { feactAllCar } from '../../../services/guestService';
import { deleteCar } from '../../../services/adminService';
import Select from 'react-select';
import { feactAllCarCompany } from '../../../services/guestService';
import { searchCar } from '../../../services/staffService';
class ManageCar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            search: '',
            listCarCompany: [],
            selectCarCompany: {},
            listCar: [],
            currenpage: 1,
            currenlimit: 5,
            totalpage: 0,
            showModel: false,
            showModelUser: false,
            dataModel: {},
            action: 'CREATE'
        }
    }
    handlDeleteuser = async (user) => {

        this.setState({
            showModel: true,
            dataModel: user
        })





    }
    buildDataSelectCarCompany = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.name
                obj.value = item.id
                resuf.push(obj);

            })


        }

        return resuf
    }
    onHideModelUser = async () => {
        this.setState({
            showModelUser: false,
            dataModel: {},
            action: 'CREATE'


        })
        let respons = await feactAllCar(this.state.currenpage, this.state.currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listCar = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }

    }
    handlePageClick = async (event) => {

        let coppystate = { ...this.state }

        coppystate.currenpage = +event.selected + 1
        this.setState({
            ...coppystate
        })


    };
    async componentDidMount() {
        let { currenpage, currenlimit } = this.state
        let respons = await feactAllCar(currenpage, currenlimit)
        let carCompany = await feactAllCarCompany()
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listCar = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            coppystate.listCarCompany = this.buildDataSelectCarCompany(carCompany.DT)

            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await feactAllCar(currenpage, currenlimit)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listCar = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }
    SetShowmodelUser = () => {

        this.setState({
            showModelUser: true,
            action: 'CREATE',

        })


    }
    handlUpdatUser = (car) => {

        this.setState({
            dataModel: car,
            action: 'UPDATE',
            showModelUser: true

        })

    }
    handleClose = () => {
        this.setState({
            showModel: false,
            dataModel: {}
        })



    }
    comfirmDeleteUser = async () => {
        let res = await deleteCar(this.state.dataModel)

        if (res && res.EC === 0) {
            toast.success('delete succes')

            this.setState({
                showModel: false,

            })
        }
        let respons = await feactAllCar(this.state.currenpage, this.state.currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listCar = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
    }
    handleChangeCarCompany = async (selectedOption) => {
        this.setState({
            selectCarCompany: selectedOption
        })
    }
    handOnchaneCarName = async (event) => {
        this.setState({
            search: event.target.value
        })
    }
    Search = async () => {
        let datainput = {
            car: this.state.search,
            carcompany: this.state.selectCarCompany.value ? this.state.selectCarCompany.value : 0
        }
        let data = await searchCar(datainput)
        if (data.EC === 0) {
            this.setState({
                listCar: data.DT,
                show: false
            })
        }
    }
    handlRefesh = () => {
        window.location.reload()
    }
    render() {

        let { listCar } = this.state

        return (
            <>
                <div className='container'><div className='manage-car-container'>
                    <div className='car-header'>
                        <div className='tiltle'><h3>Quản lý xe</h3>
                        </div>
                        <hr></hr>

                        <div className='actionform col-12 row'>
                            <div className='col-4'>
                                <label class="fw-bold">Nhập tên xe</label>
                                <input onChange={(event) => this.handOnchaneCarName(event)} type="text" class="form-control" />
                            </div>
                            <div className='col-4'>
                                <label className='fw-bold'>Chọn công ty xe</label>
                                <Select


                                    value={this.state.selectCarCompany}
                                    onChange={this.handleChangeCarCompany}
                                    options={this.state.listCarCompany}

                                />
                            </div>
                            <div className='col-4'>
                                <button onClick={() => this.Search()} className='btn btn-primary button btn btn-primary mt-4 '>Tìm kiếm</button>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='action my-3'>
                            <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3'>Làm mới trang <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
                            <button onClick={() => { this.SetShowmodelUser() }} className='btn btn-success'>Thêm xe mới <span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                        </div>
                    </div>

                    <div className='car-body'>
                        <table className="table table-bordered my-3 table-primary">
                            <thead>
                                <tr>
                                    <th scope="col">ID xe</th>
                                    <th scope="col">Tên xe</th>
                                    <th scope="col">Hãng xe</th>
                                    <th scope="col">Thông tin chi tiết</th>
                                    <th scope="col">Ảnh nền</th>
                                    <th scope="col">action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {listCar && listCar.length > 0 ?
                                    <>
                                        {
                                            listCar.map((item, index) => {
                                                let imageBase64 = ''
                                                if (item.avata) {

                                                    imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                                }
                                                return (
                                                    <tr key={`row-${index}`}>

                                                        <td>{item.id}</td>
                                                        <td>{item.nameCar}</td>
                                                        <td>{item.carCompanyData.name}</td>
                                                        <td>{item.descriptions}</td>
                                                        <td style={{
                                                            backgroundImage: `url(${imageBase64})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'

                                                        }}></td>
                                                        <td><button onClick={() => this.handlUpdatUser(item)} className='btn btn-primary mx-2'>Cập nhật thông tin</button>
                                                            <button onClick={() => this.handlDeleteuser(item)} className='btn btn-danger'>Xóa xe</button></td>
                                                    </tr>
                                                )




                                            })
                                        }
                                    </> : <>
                                        <tr><td>not fout user</td></tr>
                                    </>

                                }
                            </tbody>
                        </table>
                    </div>

                    <div className='user-footer'>
                        {this.state.show === true && <ReactPaginate
                            nextLabel="next >"
                            onPageChange={this.handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={this.state.totalpage}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                        }



                    </div>

                </div>
                </div>

                <CreateCar titile={'crete new user'}
                    onHide={this.onHideModelUser}
                    show={this.state.showModelUser}
                    action={this.state.action}
                    dataModel={this.state.dataModel} />

                <Modelconfimdelede
                    show={this.state.showModel}
                    handleClose={this.handleClose}
                    comfirmDeleteUser={this.comfirmDeleteUser}
                    dataModel={this.state.dataModel}
                />

            </>
        )
    }

}



export default ManageCar;
