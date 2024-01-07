import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';
import { UserContext } from '../../context/userContext';
import moment from 'moment';
import { getDataGara } from '../../services/garaService';
import { getAllBookingByDay } from '../../services/garaService';
import ModelComfimBooking from './AllModel/modelComfimBooking';
import './manageBooking.scss'
import ModelComfimCanserBooking from './AllModel/modelconfomCasnerBooking.js';
class ManageBookingGara extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currenDate: new Date(),
            garaId: '',
            dataBooking: {},
            isOpentModel: false,
            dateModel: {},
            isOpentModelCanser: false
        }
    }
    async componentDidMount() {
        let data = await getDataGara(this.context.user.account.id)
        if (data.EC === 0) {


            // let currendate = moment(new Date(this.state.currenDate)).startOf('day').unix()
            let currendate = 'ALL'
            let res = await getAllBookingByDay(data.DT.id, currendate)
            this.setState({
                dataBooking: res.DT,
                garaId: data.DT.id
            })
        }



    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    getDataPatient = async (gara, fomatedDate) => {

        let res = await getAllBookingByDay(gara, fomatedDate)
        if (res && res.EC === 0) {
            this.setState({
                dataBooking: res.DT
            })
        }

    }
    handleChangedatePick = async (date) => {

        this.setState({
            currenDate: date
        }, () => {
            let gara = this.state.garaId
            let currenDate = this.state.currenDate
            let fomatedDate = moment(new Date(currenDate)).startOf('day').unix()

            this.getDataPatient(gara, fomatedDate)

        })



    }
    hanldOnclickConfid = (item) => {
        let data = {
            userId: item.userId,
            garaid: item.garaid,
            carId: item.carId,
            timetype: item.timeType,
            serviceId: item.serviceId,
            date: item.date,
            email: item.bookingData.email,
            time: item.timeDataBooking.timValue,


        }

        this.setState({
            isOpentModel: true,
            dateModel: data
        })


    }
    closeBookingModelCanser = () => {
        this.setState({

            isOpentModelCanser: false,
            dataModel: {},



        })
    }
    hanldOnclickDenice = (item) => {
        let data = {
            userId: item.userId,
            garaid: item.garaid,
            carId: item.carId,
            timetype: item.timeType,
            serviceId: item.serviceId,
            date: item.date,
            email: item.bookingData.email,
            time: item.timeDataBooking.timValue,


        }

        this.setState({
            isOpentModelCanser: true,
            dateModel: data
        })


    }
    closeBookingModel = () => {
        this.setState({
            isOpentModel: false,
            dataModel: {},



        })
    }
    handlRefesh = () => {
        window.location.reload()
    }
    render() {

        let dataBooking = this.state.dataBooking
        return (
            <>
                <div className='manage-booking-container container'>
                    <div className='m-p-title'>
                        <h3>   Quản lý đơn hàng đặt lịch</h3>
                        <hr></hr>
                        <div className='col-4 form-group'>
                            <label className='fw-bold'>Chọn ngày tìm kiếm </label>
                            <ReactDatePicker
                                onChange={this.handleChangedatePick}
                                className='form-control'
                                value={this.state.currenDate}
                                selected={this.state.currenDate}
                                minDate={new Date((new Date()).valueOf())}


                            />
                        </div>
                        <hr></hr>
                        <div className='action my-3'>
                            <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3'>Làm mới trang <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>

                        </div>
                        <hr></hr>
                    </div>
                    <div className='m-p-body row'>

                        <div className='col-12'>
                            <table style={{ width: '100%' }} className='table-patient table table-hover table-bordered my-3 table-primary'>
                                <tbody>
                                    <tr>
                                        <th >STT</th>
                                        <th>Thời gian khám</th>
                                        <th>Tên khách hàng</th>
                                        <th>Email khách hàng</th>
                                        <th>Số điện thoại khách hàng</th>
                                        <th>Địa chỉ của khách hàng</th>
                                        <th>Tình trạng xe</th>
                                        <th>ACTION</th>
                                    </tr>
                                    {dataBooking && dataBooking.length > 0 &&
                                        dataBooking.map((item, index) => {


                                            let s = new Date(item.date * 1000).toLocaleDateString("vi")
                                            return (

                                                <tr key={`child-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeDataBooking.timValue} ngày {s}</td>
                                                    <td>{item.bookingData.userName}</td>
                                                    <td>{item.bookingData.email}</td>
                                                    <td>{item.bookingData.phone}</td>
                                                    <td>{item.bookingData.address}</td>
                                                    <td>{item.reson}</td>
                                                    <td><button className='btn btn-primary' onClick={() => this.hanldOnclickConfid(item)}>Xác nhận</button>
                                                        <button className='btn btn-warning' onClick={() => this.hanldOnclickDenice(item)}>Từ chối </button></td>
                                                </tr>
                                            )
                                        })}





                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                <ModelComfimBooking
                    show={this.state.isOpentModel}
                    dataModel={this.state.dateModel}
                    onHide={this.closeBookingModel} />
                <ModelComfimCanserBooking

                    show={this.state.isOpentModelCanser}
                    dataModel={this.state.dateModel}
                    onHide={this.closeBookingModelCanser} />

            </>
        );
    }
}
ManageBookingGara.contextType = UserContext


export default ManageBookingGara;
