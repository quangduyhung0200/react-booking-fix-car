import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import ReactPaginate from 'react-paginate';
import { readHanndBook } from '../../../services/staffService';
import { Buffer } from "buffer";
import { withRouter } from 'react-router-dom';
// import ModelconfimdeledeHandbook from './modelDeleteHandBook';
import { deleteHandbook } from '../../../services/adminService';
import { toast } from 'react-toastify';
import { getAllHandbook } from '../../../services/adminService';
import { getAllBookingbyPageStaff, getAllStatus, updateBooking } from '../../../services/staffService';
import { searchBooking } from '../../../services/staffService';
import Select from 'react-select';
import ReactDatePicker from 'react-datepicker';
import { feactAllUser } from '../../../services/staffService';
import { getAllGara, feactAllCar, getAllService, getAllPrice } from '../../../services/guestService';
import './manageBooking.scss'
import { UserContext } from "../../../context/userContext"
import { deleteBooking } from '../../../services/adminService';
import ModelconfimdeledeBooking from './modelDeleteBooking';
class ManageBookingStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            listBooking: [],
            selectStatus: {},
            listStatus: [],
            listUser: [],
            listGara: [],
            listCar: [],
            listService: [],
            listPrice: [],
            selectUser: {},
            selectGara: {},
            selectCar: {},
            selectService: {},
            selectPrice: {},
            currenpage: 1,
            currenlimit: 5,
            totalpage: 0,
            isShowModel: false,
            dataModel: {},
            currenDate: new Date(),
            fomatedDate: '',
            showModel: false


        }
    }

    handlePageClick = async (event) => {

        let coppystate = { ...this.state }

        coppystate.currenpage = +event.selected + 1
        this.setState({
            ...coppystate
        })


    };
    buildDataSelectStatus = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.description;
                obj.value = item.status;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectUser = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.username;
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectGara = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.nameGara;
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


                obj.label = item.nameCar;
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectService = (inputData) => {

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
    buildDataSelectPrice = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.value;
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    async componentDidMount() {

        let { currenpage, currenlimit } = this.state
        let respons = await getAllBookingbyPageStaff(currenpage, currenlimit)
        let status = await getAllStatus()
        let user = await feactAllUser('ALL')
        let gara = await getAllGara()
        let car = await feactAllCar('ALL')
        let service = await getAllService()
        let price = await getAllPrice()
        if (respons && respons.EC === 0 && status.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listBooking = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            coppystate.listStatus = this.buildDataSelectStatus(status.DT)
            coppystate.listUser = this.buildDataSelectUser(user.DT)
            coppystate.listGara = this.buildDataSelectGara(gara.DT)
            coppystate.listCar = this.buildDataSelectCar(car.DT)
            coppystate.listService = this.buildDataSelectService(service.DT)
            coppystate.listPrice = this.buildDataSelectPrice(price.DT)


            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await getAllBookingbyPageStaff(currenpage, currenlimit)
            let status = await getAllStatus()
            let user = await feactAllUser('ALL')
            let gara = await getAllGara()
            let car = await feactAllCar('ALL')
            let service = await getAllService()
            let price = await getAllPrice()
            if (respons && respons.EC === 0 && status.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listBooking = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                coppystate.listStatus = this.buildDataSelectStatus(status.DT)
                coppystate.listUser = this.buildDataSelectUser(user.DT)
                coppystate.listGara = this.buildDataSelectGara(gara.DT)
                coppystate.listCar = this.buildDataSelectCar(car.DT)
                coppystate.listService = this.buildDataSelectService(service.DT)
                coppystate.listPrice = this.buildDataSelectPrice(price.DT)


                this.setState({
                    ...coppystate
                })

            }
        }
    }


    handOnclickDelete = async (item) => {
        this.setState({
            showModel: true,
            dataModel: item
        })

    }
    handleClose = () => {
        this.setState({
            showModel: false,
            dataModel: {}
        })
    }
    comfirmDeleteUser = async () => {

        let data = await deleteBooking(this.state.dataModel)



        if (data && data.EC === 0) {
            toast.success('Xóa thành cồng')

            this.setState({
                showModel: false,

            })
        }
        else {
            toast.error('Xóa thất bại')
            this.setState({
                showModel: false,

            })
        }



        let { currenpage, currenlimit } = this.state
        let respons = await getAllBookingbyPageStaff(currenpage, currenlimit)
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listBooking = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
    }
    handlOnchanSelect = async (event, id) => {


        let data = {
            id: id,
            status: event.target.value
        }
        let res = await updateBooking(data)
        if (res.EC === 0) {
            let { currenpage, currenlimit } = this.state
            let respons = await getAllBookingbyPageStaff(currenpage, currenlimit)
            let status = await getAllStatus()
            if (respons && respons.EC === 0 && status.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listBooking = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                coppystate.listStatus = this.buildDataSelectStatus(status.DT)


                this.setState({
                    ...coppystate
                })

            }
        }


    }


    handleChangedatePick = async (date) => {

        this.setState({
            currenDate: date,
            fomatedDate: moment(new Date(date)).startOf('day').unix()

        })



    }
    handleChangeUser = async (selectedOption) => {
        this.setState({
            selectUser: selectedOption,
        })

    }
    handleChangeUser = async (selectedOption) => {
        this.setState({
            selectUser: selectedOption,
        })

    }
    handleChangeGara = async (selectedOption) => {
        this.setState({
            selectGara: selectedOption,
        })

    }
    handleChangeCar = async (selectedOption) => {
        this.setState({
            selectCar: selectedOption,
        })

    }
    handleChangeService = async (selectedOption) => {
        this.setState({
            selectService: selectedOption,
        })

    }
    handleChangePrice = async (selectedOption) => {
        this.setState({
            selectPrice: selectedOption,
        })

    }
    handleChangeStatus = async (selectedOption) => {
        this.setState({
            selectStatus: selectedOption,
        })

    }
    handlOnclickSearch = async () => {
        console.log(this.state.fomatedDate)
        let datainput = {
            user: this.state.selectUser.value ? this.state.selectUser.value : 0,
            gara: this.state.selectGara.value ? this.state.selectGara.value : 0,
            car: this.state.selectCar.value ? this.state.selectCar.value : 0,
            service: this.state.selectService.value ? this.state.selectService.value : 0,
            date: this.state.fomatedDate ? this.state.fomatedDate : 0,
            price: this.state.selectPrice.value ? this.state.selectPrice.value : 0,
            status: this.state.selectStatus.value ? this.state.selectStatus.value : 0,

        }
        let data = await searchBooking(datainput)
        if (data.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listBooking = data.DT
            coppystate.show = false



            this.setState({
                ...coppystate
            })
        }
    }
    render() {

        let { listBooking, listStatus } = this.state
        console.log(this.state)
        return (
            <>
                <>
                    <div className='manage-booking-container container'>
                        <div className='booking-header row'>
                            <div className='tiltle col-12'
                            ><h3>Quản lý đơn đặt lịch</h3>
                            </div>
                            <hr></hr>
                            <div className='search-form row'> <div className='col-4'>
                                <label className='fw-bold'>Chọn người dùng</label>
                                <Select

                                    placeholder={'CHON XE'}
                                    value={this.state.selectUser}
                                    onChange={this.handleChangeUser}
                                    options={this.state.listUser}

                                /></div>
                                <div className='col-4'>
                                    <label className='fw-bold'>Chọn gara</label>
                                    <Select

                                        placeholder={'CHON XE'}
                                        value={this.state.selectGara}
                                        onChange={this.handleChangeGara}
                                        options={this.state.listGara}

                                    /></div>

                                <div className='col-4'>
                                    <label className='fw-bold'>Chọn xe</label>
                                    <Select

                                        placeholder={'CHON XE'}
                                        value={this.state.selectCar}
                                        onChange={this.handleChangeCar}
                                        options={this.state.listCar}

                                    /></div>

                                <div className='col-4'>
                                    <label className='fw-bold'>Chọn dich vu</label>
                                    <Select

                                        placeholder={'CHON XE'}
                                        value={this.state.selectService}
                                        onChange={this.handleChangeService}
                                        options={this.state.listService}

                                    /></div>
                                <div className='col-4'>
                                    <label className='fw-bold'>Chọn giá</label>
                                    <Select

                                        placeholder={'CHON XE'}
                                        value={this.state.selectPrice}
                                        onChange={this.handleChangePrice}
                                        options={this.state.listPrice}

                                    /></div>        <div className='col-4'>
                                    <label className='fw-bold'>Chọn trạng thái</label>
                                    <Select

                                        placeholder={'CHON XE'}
                                        value={this.state.selectStatus}
                                        onChange={this.handleChangeStatus}
                                        options={this.state.listStatus}

                                    /></div>

                                <div className='col-4'>
                                    <label className='fw-bold'>Chọn ngày</label>
                                    <ReactDatePicker
                                        onChange={this.handleChangedatePick}
                                        className='form-control'
                                        value={this.state.currenDate}
                                        selected={this.state.currenDate}



                                    /></div></div>
                            <hr></hr>

                            <div><button onClick={() => this.handlOnclickSearch()} className='btn btn-primary'>Tìm kiếm</button></div>

                        </div>
                        <div className='m-p-body row'>

                            <div className='col-12'>
                                <table className="table-patient table table-hover table-bordered my-3 table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id đơn hàng</th>
                                            <th scope="col">Tên người đặt</th>

                                            <th scope="col">Tên gara</th>
                                            <th scope="col">Loại xe đã đặt sửa chữa</th>
                                            <th scope="col">Dịch vụ đã chọn</th>
                                            <th scope="col">Ngày đặt</th>
                                            <th scope="col">Gía dịch vụ (VND)</th>
                                            <th scope="col">Trạng thái</th>

                                            {this.context.user.account.role[0].id === 4 && <th scope="col">Action</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listBooking && listBooking.length > 0 ?
                                            <>
                                                {
                                                    listBooking.map((item, index) => {


                                                        let str = item.createdAt;
                                                        let endDate = Date.parse(str);
                                                        let s = new Date(endDate).toLocaleDateString("vi")


                                                        return (

                                                            <tr key={`row-${index}`}>

                                                                <td>{item.id}</td>
                                                                <td>{item.bookingData.userName}</td>
                                                                <td>{item.bookingDataGara.nameGara}</td>
                                                                <td>{item.carBookingData.nameCar}</td>
                                                                <td>{item.serviceBookingData.name}</td>
                                                                <td>{s}</td>
                                                                <td>{item.PriceBookingData.value}</td>
                                                                <td>

                                                                    <select className='form-select' onChange={(event) => this.handlOnchanSelect(event, item.id)} value={item.status}>

                                                                        {listStatus && listStatus.length > 0 &&
                                                                            listStatus.map((item2, index) => {
                                                                                return (
                                                                                    <option value={item2.value} key={item2.value}>{item2.label}</option>
                                                                                )
                                                                            })}



                                                                    </select>

                                                                </td>






                                                                {this.context.user.account.role[0].id === 4 && <td>

                                                                    <button onClick={() => this.handOnclickDelete(item)} className='button btn btn-danger'>Xóa đơn hàng</button></td>}
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
                        </div>

                        <div className='user-footer'>
                            {this.state.show && <ReactPaginate
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
                            />}




                        </div>

                    </div>
                    <ModelconfimdeledeBooking
                        show={this.state.showModel}
                        handleClose={this.handleClose}
                        comfirmDeleteUser={this.comfirmDeleteUser}
                        dataModel={this.state.dataModel}
                    />

                </>


            </>
        )
    }

}

ManageBookingStaff.contextType = UserContext


export default withRouter(ManageBookingStaff);
