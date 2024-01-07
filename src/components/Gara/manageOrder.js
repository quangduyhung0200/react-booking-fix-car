import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';
import { UserContext } from '../../context/userContext';
import moment from 'moment';
import { getDataGara } from '../../services/garaService';
import { getAllOrderByDay } from '../../services/garaService';
import ModelComfimFinishOrder from './AllModel/modelComfimFinishOrder';
import ModelComfimCanserOrder from './AllModel/modelComfimCanserOder';
import './manageOrder.scss'
class ManageOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currenDate: new Date(),
            garaId: '',
            dataBooking: {},
            isOpentModel: false,
            isOpentModelCanser: false,
            dateModel: {}
        }
    }
    async componentDidMount() {
        let data = await getDataGara(this.context.user.account.id)
        if (data.EC === 0) {


            // let currendate = moment(new Date(this.state.currenDate)).startOf('day').unix()
            let currendate = 'ALL'
            let res = await getAllOrderByDay(data.DT.id, currendate)
            this.setState({
                dataBooking: res.DT,
                garaId: data.DT.id
            })
        }



    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    getDataPatient = async (gara, fomatedDate) => {

        let res = await getAllOrderByDay(gara, fomatedDate)
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
    closeBookingModel = () => {
        this.setState({
            isOpentModel: false,
            isOpentModelCanser: false,
            dataModel: {},



        })
    }
    closeBookingModelCanser = () => {
        this.setState({

            isOpentModelCanser: false,
            dataModel: {},



        })
    }
    hanldOnclickDontFinshTheOrder = (item) => {
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
    handlRefesh = () => {
        window.location.reload()
    }
    render() {

        let dataBooking = this.state.dataBooking
        return (
            <>
                <div className='manage-order-container container'>
                    <div className='m-p-title'>
                        <h3> Quản lý đơn đặt lịch</h3>
                        <hr></hr>
                        <div className='col-4 form-group'>
                            <label>Chon ngay kham</label>
                            <ReactDatePicker
                                onChange={this.handleChangedatePick}
                                className='form-control'
                                value={this.state.currenDate}
                                selected={this.state.currenDate}



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
                                        <th>thoi  gian</th>
                                        <th>HO VA TEN</th>
                                        <th>email</th>
                                        <th>DIA CHI</th>
                                        <th>trang thai don hang</th>
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
                                                    <td>{item.bookingData.address}</td>
                                                    <td>{item.statusBooking.description}</td>
                                                    <td>{item.status === 'S3' && <>
                                                        <button className='btn btn-primary mx-3'
                                                            onClick={() => this.hanldOnclickConfid(item)}>Hoàn thành đơn hàng</button>
                                                        <button className='btn btn-primary mx-3'
                                                            onClick={() => this.hanldOnclickDontFinshTheOrder(item)}>Hủy đơn hàng</button></>}
                                                    </td>
                                                </tr>
                                            )
                                        })}





                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                <ModelComfimFinishOrder
                    show={this.state.isOpentModel}
                    dataModel={this.state.dateModel}
                    onHide={this.closeBookingModel} />
                <ModelComfimCanserOrder

                    show={this.state.isOpentModelCanser}
                    dataModel={this.state.dateModel}
                    onHide={this.closeBookingModelCanser} />

            </>
        );
    }
}
ManageOrder.contextType = UserContext


export default ManageOrder;
