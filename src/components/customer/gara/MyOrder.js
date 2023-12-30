import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';
import { UserContext } from '../../../context/userContext';
import moment from 'moment';
import { getAllOrderUser } from '../../../services/userService';
import { template } from 'lodash';
import CreateComent from './modelAddComent';
class MyOrder extends Component {
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





        let res = await getAllOrderUser(this.context.user.account.id)
        this.setState({
            dataBooking: res.DT,

        })




    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    hanldOnclickConfid = (item) => {
        let data = {
            userId: item.userId,
            garaId: item.garaid,
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

                        <div className='col-12'>
                            <table style={{ width: '100%' }} className='table-patient'>
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
                                            return (

                                                <tr key={`child-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeDataBooking.timValue}</td>
                                                    <td>{item.bookingData.userName}</td>
                                                    <td>{item.bookingData.email}</td>
                                                    <td>{item.bookingData.address}</td>
                                                    <td>{item.status === 'S2' ? 'don hang dang doi gara xac nhan' : item.status === 'S3' ? 'don hang dng tien hanh' : item.status === 'S4' ? 'don hang da hoan thnah' : item.status === 'S5' ? 'don hang da duoc danh gia' : 'don hang da that bai'}</td>
                                                    <td><button className={item.status === 'S4' ? 'btn btn-primary mx-3' : 'btn btn-primary mx-3 disabled'}
                                                        onClick={() => this.hanldOnclickConfid(item)}>xacs nhan hoan thanh don hang</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}





                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                <CreateComent show={this.state.isOpentModel}
                    dataModel={this.state.dateModel}
                    onHide={this.closeBookingModel} />

            </>
        );
    }
}
MyOrder.contextType = UserContext


export default MyOrder;
