import React, { Component } from 'react';

import Select from 'react-select';
import './manageSchedule.scss'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import ReactDatePicker from 'react-datepicker';
import { getAllGara } from '../../services/guestService';
import { getAllTime, createBulkScheduleGara } from '../../services/garaService';
import { getDataGara } from '../../services/garaService';
import { UserContext } from "../../context/userContext"
import { readAllScheduleByDate } from '../../services/guestService';
import HomeFooter from '../home/homeFooter/homeFooter';
class ManageSchedule extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currenGara: '',
            allDay: [],

            currenDate: new Date(),
            timeArr: [],
            allAvailbleTime: [],
            listGara: [],
            selectGara: '',
            groupId: '',
            maxOrder: ''

        }
    }
    getArrDay = () => {
        let allDay = []
        for (let i = 0; i < 7; i++) {
            let obj = {};

            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM')
                let today = `Hôm nay - ${ddMM}`
                obj.label = today
            } else {
                obj.label = moment(new Date()).add(i, 'days').format('dddd-DD/MM')


            }



            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDay.push(obj)
        }
        return allDay
    }
    async componentDidMount() {
        let timeData = await getAllTime()
        if (timeData && timeData.EC === 0) {
            this.setState({
                timeArr: timeData.DT,
                groupId: this.context.user.account.role[0].id
            })
        }

        if (this.context.user.account.role[0].id !== 4 && this.context.user.account.role[0].id !== 3) {

            let dataGara = await getDataGara(this.context.user.account.id)

            this.setState({
                currenGara: dataGara.DT.id
            })
            if (dataGara && dataGara.EC === 0) {
                let fomatDate = moment(new Date(this.state.currenDate)).startOf('day').unix()



                let timedatabyday = await readAllScheduleByDate(dataGara.DT.id, fomatDate)
                this.setState({
                    allAvailbleTime: timedatabyday.DT ? timedatabyday.DT : [],
                    maxOrder: timedatabyday.EC !== 1 ? timedatabyday.DT[0].maxOrder : ''
                })
                if (timedatabyday && timedatabyday.EC === 0) {
                    let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)
                    this.setState({
                        timeArr: time

                    })

                }
                else {
                    let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)

                    this.setState({
                        timeArr: time

                    })
                }



            }
        }
        else {
            let allGara = await getAllGara()
            if (allGara.EC === 0) {
                let listGara = this.buidDataInputSeclect(allGara.DT)
                this.setState({
                    listGara: listGara
                })
            }
        }



    }
    buidDatatimepick = (timePick, allTime) => {
        let resuf = []
        if (allTime.length > 0) {
            allTime.map(time => {
                let obj = {};
                obj.id = time.id;
                obj.timValue = time.timValue
                if (timePick && timePick.length > 0) {
                    obj.isSelected = timePick.some(item => +item.timeType === obj.id)
                }
                resuf.push(obj)
            })
        }
        return resuf
    }
    buidDataInputSeclect = (inputData) => {
        let resuf = []
        if (inputData.length > 0) {
            inputData.map(item => {
                let obj = {};
                obj.label = item.nameGara;
                obj.value = item.id

                resuf.push(obj)
            })
        }
        return resuf
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    handleChangedatePick = async (date) => {
        this.setState({
            currenDate: date
        })
        let datenew = moment(new Date(date)).startOf('day').unix()
        if (this.state.groupId === 4 || this.state.groupId === 3) {

            if (this.state.selectGara.value) {
                let timedatabyday = await readAllScheduleByDate(this.state.selectGara.value, datenew)

                this.setState({
                    allAvailbleTime: timedatabyday.DT ? timedatabyday.DT : [],
                    maxOrder: timedatabyday.EC !== 1 ? timedatabyday.DT[0].maxOrder : ''
                })
                if (timedatabyday && timedatabyday.EC === 0) {
                    let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)

                    this.setState({
                        timeArr: time

                    })

                } else {
                    let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)

                    this.setState({
                        timeArr: time

                    })
                }



            } else {
                toast.error('Bạn chưa chọn gara')
            }
        }

        else {
            let dataGara = await getDataGara(this.context.user.account.id)
            if (dataGara && dataGara.EC === 0) {

                let timedatabyday = await readAllScheduleByDate(dataGara.DT.id, datenew)
                this.setState({
                    allAvailbleTime: timedatabyday.DT ? timedatabyday.DT : [],
                    maxOrder: timedatabyday.EC !== 1 ? timedatabyday.DT[0].maxOrder : ''
                })
                if (timedatabyday && timedatabyday.EC === 0) {
                    let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)
                    this.setState({
                        timeArr: time

                    })
                }
                else {
                    let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)

                    this.setState({
                        timeArr: time

                    })
                }



            }
        }




    }
    handlOnclickTime = (time) => {
        let timeArr = this.state.timeArr

        if (timeArr && timeArr.length > 0) {
            timeArr = timeArr.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
            this.setState({
                timeArr: timeArr
            })
        }


    }
    handlSaveSchedule = async () => {
        let groupId = this.state.groupId
        let timeArr = this.state.timeArr

        let currenDate = this.state.currenDate
        let selectTime = ''
        let resuf = []
        if (!this.state.selectGara.value && groupId === 3 || !this.state.selectGara.value && groupId === 4) {
            toast.error('Chưa chọn gara')
            return
        }
        if (!currenDate) {
            toast.error('invalit date')
            return
        }
        if (!this.state.maxOrder) {
            toast.error('Chưa chọn số lượng tối đa cho một khung giờ')
            return
        }

        let fomatDate = moment(new Date(currenDate)).startOf('day').unix()

        if (timeArr && timeArr.length > 0) {
            selectTime = timeArr.filter(item => item.isSelected === true)
            if (selectTime && selectTime.length > 0) {
                selectTime.map((schedule, index) => {
                    let obj = {}

                    obj.date = fomatDate;
                    obj.timeType = schedule.id
                    obj.maxOrder = this.state.maxOrder
                    resuf.push(obj)

                })
            }


            if (this.state.groupId === 4 || this.state.groupId === 3) {
                let res = await createBulkScheduleGara({
                    arrSchedule: resuf,
                    garaId: this.state.selectGara.value,
                    fomatDate: fomatDate
                })
                if (res.EC === 0) {
                    toast.success('Đăng ký lịch thành công')
                }
                else {
                    toast.error('Có lỗi xảy ra')
                }

            }
            else {
                let res = await createBulkScheduleGara({
                    arrSchedule: resuf,
                    garaId: this.state.currenGara,
                    fomatDate: fomatDate
                })
                if (res.EC === 0) {
                    toast.success('Đăng ký lịch thành công')
                }
                else {
                    toast.error('Có lỗi xảy ra')
                }
            }


        }




    }
    handlOnchane = (event) => {
        this.setState({
            maxOrder: event.target.value
        })

    }
    handleChangeGara = async (selectedOption) => {



        let fomatDate = moment(new Date(this.state.currenDate)).startOf('day').unix()
        let timedatabyday = await readAllScheduleByDate(selectedOption.value, fomatDate)

        this.setState({
            allAvailbleTime: timedatabyday.DT ? timedatabyday.DT : [],
            maxOrder: timedatabyday.EC !== 1 ? timedatabyday.DT[0].maxOrder : ''
        })
        if (timedatabyday && timedatabyday.EC === 0) {
            let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)
            this.setState({
                timeArr: time

            })

        }
        else {
            let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)

            this.setState({
                timeArr: time

            })
        }







        this.setState({
            selectGara: selectedOption,
        })



    }
    render() {
        console.log(this.state)
        let { groupId } = this.state
        console.log(this.state.timeArr)
        return (
            <>

                <div className='Manage-schedule-container container'>
                    <div className='m-s-title'>
                        Quản lý lịch sửa xe
                    </div>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-12 form-group text-center fw-bold row'>
                                {+groupId === 3 && <div className='col-6'>   <label className=''>Chọn gara</label>
                                    <Select
                                        placeholder={'chọn gara...'}
                                        value={this.state.selectGara}
                                        onChange={this.handleChangeGara}
                                        options={this.state.listGara}

                                    /></div>}
                                {+groupId === 4 && <div className='col-6'>   <label className=''>Chọn gara</label>
                                    <Select
                                        placeholder={'chọn gara...'}
                                        value={this.state.selectGara}
                                        onChange={this.handleChangeGara}
                                        options={this.state.listGara}

                                    /></div>}

                                <div className={(+groupId === 4 || +groupId === 3) ? 'col-6' : 'col-12'}>
                                    <label className=''>Chọn ngày </label>
                                    <ReactDatePicker
                                        onChange={this.handleChangedatePick}
                                        className='form-control'
                                        value={this.state.currenDate}
                                        selected={this.state.currenDate}
                                        minDate={new Date((new Date()).valueOf())}



                                    /></div>

                            </div>
                            <hr className='my-2'></hr>

                            <div className='pick-hour-container col-12'>

                                {this.state.timeArr &&
                                    this.state.timeArr.map((item, index) => {
                                        return <button
                                            className={item.isSelected === true ? 'btn btn-pick-time active' : 'btn btn-pick-time'} key={index}
                                            onClick={() => this.handlOnclickTime(item)}
                                        >{item.timValue}</button>



                                    })}



                            </div>
                            <hr></hr>
                            <div className='col-4'>
                                <label>Chọn số lượng xe có thể nhận tối đa cho một khung giờ</label>
                                <input
                                    onChange={(event) => this.handlOnchane(event)}
                                    type='number' className='form-control'

                                    value={this.state.maxOrder}
                                    required>

                                </input>

                            </div>

                            <div className='my-2 schedule'>
                                <button
                                    className='btn-save-info btn btn-primary'
                                    onClick={() => this.handlSaveSchedule()}>Lưu thông tin</button>
                            </div>
                        </div>
                    </div>
                </div >
                <HomeFooter />
            </>
        );
    }
}
ManageSchedule.contextType = UserContext

export default ManageSchedule;
