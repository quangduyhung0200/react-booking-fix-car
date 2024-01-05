import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';
import { UserContext } from '../../../context/userContext';
import moment from 'moment';
import { getAllOrderUser } from '../../../services/userService';
import { template } from 'lodash';
import CreateComent from './modelAddComent';
import Select from 'react-select';
import { getAllGara } from '../../../services/guestService';
import { getAllStatus } from '../../../services/staffService';
import { searchOrder } from '../../../services/userService';
class MyOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listGara: [],
            selectGara: {},
            listStatus: [],
            selectStatus: {},
            currenDate: new Date(),
            garaId: '',
            dataBooking: {},
            isOpentModel: false,

            dateModel: {}
        }
    }
    buidDataInputSeclectGara = (inputData) => {
        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.nameGara
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    buidDataInputSeclectStatus = (inputData) => {
        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.description
                obj.value = item.status;
                resuf.push(obj);

            })


        }

        return resuf
    }
    async componentDidMount() {




        let gara = await getAllGara()
        let status = await getAllStatus()
        let res = await getAllOrderUser(this.context.user.account.id)
        this.setState({
            dataBooking: res.DT,
            listGara: this.buidDataInputSeclectGara(gara.DT),
            listStatus: this.buidDataInputSeclectStatus(status.DT)

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

    handleChangeGara = (selectedOption) => {
        this.setState({
            selectGara: selectedOption
        })
    }
    handleChangeStatus = (selectedOption) => {
        this.setState({
            selectStatus: selectedOption
        })
    }
    Search = async () => {
        let datainput = {
            gara: this.state.selectGara.value ? this.state.selectGara.value : 0,
            status: this.state.selectStatus.value ? this.state.selectStatus.value : 0
        }
        let res = await searchOrder(datainput)
        if (res.EC === 0) {
            this.setState({
                dataBooking: res.DT
            })
        }
    }
    render() {

        let dataBooking = this.state.dataBooking
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quan ly don hang cua toi
                    </div>
                    <div className='actionform col-12 row'>

                        <div className='col-4'>
                            <label>chon cong ty</label>
                            <Select

                                placeholder={'CHON gara'}
                                value={this.state.selectGara}
                                onChange={this.handleChangeGara}
                                options={this.state.listGara}

                            />
                        </div>
                        <div className='col-4'>
                            <label>chon cong ty</label>
                            <Select

                                placeholder={'CHON gara'}
                                value={this.state.selectStatus}
                                onChange={this.handleChangeStatus}
                                options={this.state.listStatus}

                            />
                        </div>

                        <div>    <button onClick={() => this.Search()} className='btn btn-primary position-relative top-50 start-50 translate-middle my-3'>tim kiem</button>
                        </div>






                    </div>
                    <div className='m-p-body row'>

                        <div className='col-12'>
                            <table style={{ width: '100%' }} className='table-patient'>
                                <tbody>
                                    <tr>
                                        <th >ID</th>
                                        <th>thoi  gian</th>
                                        <th>gara</th>
                                        <th>dia chi</th>

                                        <th>so dien thoai gara</th>

                                        <th>trang thai don hang</th>
                                        <th>ACTION</th>
                                    </tr>
                                    {dataBooking && dataBooking.length > 0 &&
                                        dataBooking.map((item, index) => {

                                            let s = new Date(item.date * 1000).toLocaleDateString("vi")
                                            return (

                                                <tr key={`child-${index}`}>
                                                    <td>{item.id}</td>
                                                    <td>{item.timeDataBooking.timValue} ngay {s}</td>
                                                    <td>{item.bookingDataGara.nameGara}</td>
                                                    <td>{item.bookingDataGara.address}, Tỉnh {item.bookingDataGara.provindGaraData.name}</td>
                                                    <td>{item.bookingDataGara.phone}</td>

                                                    <td>{item.statusBooking.description}</td>
                                                    <td>
                                                        {item.status === 'S4' && <button className='btn btn-primary mx-3'
                                                            onClick={() => this.hanldOnclickConfid(item)}>xacs nhan hoan thanh don hang</button>}
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
