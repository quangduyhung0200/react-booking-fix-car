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
import { toast } from 'react-toastify';
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
        let resuf1count = 0
        let resuf2count = 0
        let resuf3count = 0
        let resuf4count = 0
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {

                if (item.status === 'S0') {
                    resuf1 = +resuf1 + (+item.PriceBookingData.value)
                    resuf1count = +resuf1count + 1
                }
                if (item.status === 'S2') {
                    resuf2 = +resuf2 + (+item.PriceBookingData.value)
                    resuf2count = +resuf2count + 1
                }
                if (item.status === 'S3') {
                    resuf3 = +resuf3 + (+item.PriceBookingData.value)
                    resuf3count = +resuf3count + 1
                }
                if (item.status === 'S4' || item.status === 'S5') {
                    resuf4 = +resuf4 + (+item.PriceBookingData.value)
                    resuf4count = +resuf4count + 1
                }





            })


        }
        let out = [{ value: resuf1, status: 'S0', count: resuf1count },
        { value: resuf2, status: 'S2', count: resuf2count },
        { value: resuf3, status: 'S3', count: resuf3count },
        { value: resuf4, status: 'S4+S5', count: resuf4count },
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
            if (this.state.selectGara.value) {
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
            else {
                toast.error('Bạn chưa chọn gara')
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
            if (this.state.selectGara.value) {
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
            else {
                toast.error('Bạn chưa chọn gara')
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

                            <hr></hr>
                            <div>Tổng cộng có: <span className='fw-bold'> {profit1.count}</span> đơn đang thất bại, <span className='fw-bold'>
                                {profit2.count} </span>đơn đang chờ xác thực và <span className='fw-bold'> {+profit3.count + profit4.count} </span> đơn đã hoàn thành trong đó có
                                <span className='fw-bold'> {profit4.count}  </span>đơn đặt dã được đánh giá</div>
                            <div>Tổng số tiền gara kiếm được là: <span className='fw-bold'> {+profit4.value + profit3.value} VND </span></div>
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
                                        <th>Thời gian đặt</th>
                                        <th>Họ tên khách hàng</th>
                                        <th>Email</th>
                                        <th>Địa chỉ khách hàng</th>
                                        <th>Số điện thoại</th>
                                        <th>Xe</th>
                                        <th>Dịch vụ</th>
                                        <th>Số tiền đơn đặt</th>
                                        <th>Trạng thái đơn hàng</th>


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
                                                    <td>{item.bookingData.phone}</td>
                                                    <td>{item.carBookingData.nameCar}</td>
                                                    <td>{item.serviceBookingData.description}</td>
                                                    <td>{item.PriceBookingData.value} VND</td>
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
