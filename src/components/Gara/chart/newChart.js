import React, { Component } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { UserContext } from '../../../context/userContext';
import './newchart.scss'
import { getprofit } from '../../../services/garaService';
import { Button } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { getUserById } from '../../../services/userService';
import Select from 'react-select';
import { getAllGara } from '../../../services/guestService';
import CommonUtils from '../../../utils/CommonUtils';
ChartJS.register(ArcElement, Tooltip, Legend);



class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listGara: [],
            selectGara: {},
            garaId: '',
            currenDate: new Date(),
            groupId: '',
            profit1: '',
            profit2: '',
            profit3: '',
            profit4: '',
            listbooking: [],



        }
    }
    buildDataSelectGara = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.nameGara;
                obj.value = item.id
                resuf.push(obj);

            })


        }

        return resuf
    }

    buidataprofit = (inputData) => {


        let resuf1 = 0
        let resuf2 = 0
        let resuf3 = 0
        let resuf4 = 0
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {

                if (item.status === 'S0') {
                    resuf1 = +resuf1 + (+item.PriceBookingData.value)
                }
                if (item.status === 'S2') {
                    resuf2 = +resuf2 + (+item.PriceBookingData.value)
                }
                if (item.status === 'S3') {
                    resuf3 = +resuf3 + (+item.PriceBookingData.value)
                }
                if (item.status === 'S4' || item.status === 'S5') {
                    resuf4 = +resuf4 + (+item.PriceBookingData.value)
                }





            })


        }
        let out = [{ value: resuf1, status: 'S0' },
        { value: resuf2, status: 'S2' },
        { value: resuf3, status: 'S3' },
        { value: resuf4, status: 'S4+S5' },
        ]
        return out




    }

    handleChangedatePick = async (date) => {

        this.setState({
            currenDate: date
        })



    }
    async componentDidMount() {
        let res = await getUserById(this.context.user.account.id)
        let res2 = await getAllGara()
        if (res.EC === 0) {
            this.setState({
                garaId: res.DT.userGara ? res.DT.userGara.id : '',
                groupId: this.context.user.account.role[0].id,
                listGara: this.buildDataSelectGara(res2.DT)
            })

        }




    }

    buildData = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};

                let s = new Date(item.date * 1000).toLocaleDateString("vi")
                obj.id = item.id;
                obj.customerName = item.bookingData.userName
                obj.customerAddress = item.bookingData.address
                obj.customerEmail = item.bookingData.email
                obj.garaName = item.bookingDataGara.nameGara
                obj.nameCar = item.carBookingData.nameCar
                obj.nameService = item.serviceBookingData.name
                obj.status = item.statusBooking.description
                obj.time = item.timeDataBooking.timValue
                obj.day = s
                obj.profit = item.PriceBookingData.value
                resuf.push(obj);

            })


        }

        return resuf
    }
    click3 = async () => {




        let data = this.buildData(this.state.listbooking)
        await CommonUtils.exportExcel(data, 'Bảng thống kê doanh thu', 'ListBooking')
    }

    click2 = async () => {

        if (this.state.garaId !== '') {
            let res2 = await getprofit(this.state.garaId, 'ALL')
            if (res2.EC === 0) {
                let data = this.buidataprofit(res2.DT)
                this.setState({
                    profit1: data[0],
                    profit2: data[1],
                    profit3: data[2],
                    profit4: data[3],
                    listbooking: res2.DT
                })
            }
        } else {
            let res2 = await getprofit(this.state.selectGara.value, 'ALL')
            if (res2.EC === 0) {
                let data = this.buidataprofit(res2.DT)
                this.setState({
                    profit1: data[0],
                    profit2: data[1],
                    profit3: data[2],
                    profit4: data[3],
                    listbooking: res2.DT
                })
            }
        }

    }

    click = async () => {
        let fomatedDate = moment(new Date(this.state.currenDate)).startOf('day').unix()
        if (this.state.garaId !== '') {
            let res2 = await getprofit(this.state.garaId, fomatedDate)
            if (res2.EC === 0) {
                let data = this.buidataprofit(res2.DT)
                this.setState({
                    profit1: data[0],
                    profit2: data[1],
                    profit3: data[2],
                    profit4: data[3],
                    listbooking: res2.DT
                })
            }
        }
        else {
            let res2 = await getprofit(this.state.selectGara.value, fomatedDate)
            if (res2.EC === 0) {
                let data = this.buidataprofit(res2.DT)
                this.setState({
                    profit1: data[0],
                    profit2: data[1],
                    profit3: data[2],
                    profit4: data[3],
                    listbooking: res2.DT
                })
            }
        }


    }
    handleChange = async (selectedOption) => {


        this.setState({
            selectGara: selectedOption,




        })


    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.garaId !== this.state.garaId) {
            let fomatedDate = moment(new Date(this.state.currenDate)).startOf('day').unix()
            let res2 = await getprofit(this.state.garaId, 'ALL')
            if (res2.EC === 0) {
                let data = this.buidataprofit(res2.DT)
                this.setState({
                    profit1: data[0],
                    profit2: data[1],
                    profit3: data[2],
                    profit4: data[3],
                    listbooking: res2.DT
                })
            }


        }
    }

    render() {

        let { profit1, profit2, profit3, profit4, groupId, listbooking } = this.state
        console.log(this.state)
        return (
            <>
                <div className='profit-container container'>
                    <div className='Title'>
                        <h3>Quản lý doanh thu</h3>
                        <hr></hr>
                        {(groupId === 3 || groupId === 4) && <><div className='pick-Gara'><h5>Chọn gara</h5></div>
                            <Select

                                placeholder={'Chọn xe'}
                                value={this.state.selectGara}
                                onChange={this.handleChange}
                                options={this.state.listGara}

                            /></>}

                        <hr></hr>
                        <div className='pickdate'>
                            <p>Chọn ngày</p>
                            <ReactDatePicker
                                onChange={this.handleChangedatePick}
                                className='form-control'
                                value={this.state.currenDate}
                                selected={this.state.currenDate}



                            /></div>
                        <div className='action '>
                            <hr></hr>
                            <button className='btn btn-primary mx-4 ' onClick={() => this.click()}>Tìm kiếm theo ngày đã chọn</button>
                            <button className='btn btn-primary mx-4 ' onClick={() => this.click2()}>Tìm kiếm tất cả các ngày</button>
                            <button className='btn btn-primary mx-4 ' onClick={() => this.click3()}>Xuất file Excel</button>
                        </div>
                    </div>
                    <div className='box'>
                        <div>Biểu đồ doanh thu gara</div>
                        <div className='chart'>

                            <Doughnut data={{
                                labels: [
                                    'Đơn hàng thất bại',
                                    "Đơn hàng đang chờ xét duyệt",
                                    "Đơn hàng đang thực hiện",
                                    "Đơn hàng thành công",

                                ],
                                datasets: [
                                    {
                                        label: "VND",
                                        backgroundColor: [
                                            "#3e95cd",
                                            "#8e5ea2",
                                            "#3cba9f",
                                            "#e8c3b9",
                                            "#c45850"
                                        ],
                                        data: [profit1.value, profit2.value, profit3.value, profit4.value]
                                    }
                                ]
                            }}
                                option={{
                                    title: {
                                        display: true,
                                        text: "Predicted world population (millions) in 2050"
                                    }
                                }} />
                        </div>
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

                                    </tr>
                                    {listbooking && listbooking.length > 0 &&
                                        listbooking.map((item, index) => {
                                            let s = new Date(item.date * 1000).toLocaleDateString("vi")
                                            return (

                                                <tr key={`child-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.timeDataBooking.timValue} ngày {s}</td>
                                                    <td>{item.bookingData.userName}</td>
                                                    <td>{item.bookingData.email}</td>
                                                    <td>{item.bookingData.address}</td>
                                                    <td>{item.statusBooking.description}</td>

                                                </tr>
                                            )
                                        })}





                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>



            </>
        );
    }
}
Chart.contextType = UserContext


export default Chart;
