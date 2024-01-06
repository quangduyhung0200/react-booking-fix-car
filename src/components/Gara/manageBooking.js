import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';
import { UserContext } from '../../context/userContext';
import moment from 'moment';
import { getDataGara } from '../../services/garaService';
import { getAllBookingByDay } from '../../services/garaService';
import ModelComfimBooking from './AllModel/modelComfimBooking';
class ManageBookingGara extends Component {
    constructor(props) {
        super(props);
        this.state = {

            currenDate: new Date(),
            garaId: '',
            dataBooking: {},
            isOpentModel: false,
            dateModel: {}
        }
    }
    async componentDidMount() {
        let data = await getDataGara(this.context.user.account.id)
        if (data.EC === 0) {


            let currendate = moment(new Date(this.state.currenDate)).startOf('day').unix()
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
    closeBookingModel = () => {
        this.setState({
            isOpentModel: false,
            dataModel: {},



        })
    }
    render() {

        let dataBooking = this.state.dataBooking
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quan ly benh nhan kham benh
                    </div>
                    <div className='m-p-body row'>
                        <div className='col-4 form-group'>
                            <label>Chon ngay kham</label>
                            <ReactDatePicker
                                onChange={this.handleChangedatePick}
                                className='form-control'
                                value={this.state.currenDate}
                                selected={this.state.currenDate}
                                minDate={new Date((new Date()).valueOf())}


                            />
                        </div>
                        <div className='col-12'>
                            <table style={{ width: '100%' }} className='table-patient table table-hover table-bordered my-3 table-primary'>
                                <tbody>
                                    <tr>
                                        <th >STT</th>
                                        <th>thoi  gian</th>
                                        <th>HO VA TEN</th>
                                        <th>email</th>
                                        <th>DIA CHI</th>
                                        <th>ACTION</th>
                                    </tr>
                                    {dataBooking && dataBooking.length > 0 &&
                                        dataBooking.map((item, index) => {
                                            return (

                                                <tr key={`child-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeDataBooking.timValue}</td>
                                                    <td>{item.bookingData.userName}</td>
                                                    <td>{item.bookingData.email}</td>
                                                    <td>{item.bookingData.address}</td>
                                                    <td><button className='config' onClick={() => this.hanldOnclickConfid(item)}>xac nhan</button>
                                                        <button className='send-tex'>gui hoa don</button></td>
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
            </>
        );
    }
}
ManageBookingGara.contextType = UserContext


export default ManageBookingGara;
