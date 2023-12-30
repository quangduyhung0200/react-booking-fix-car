import React, { Component } from 'react';

import Select from 'react-select';
import './manageSchedule.scss'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import ReactDatePicker from 'react-datepicker';

import { getAllTime, createBulkScheduleGara } from '../../services/garaService';
import { getDataGara } from '../../services/garaService';
import { UserContext } from "../../context/userContext"
import { readAllScheduleByDate } from '../../services/guestService';
class ManageSchedule extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currenGara: '',
            allDay: [],
            numberCarPerTime: '',
            currenDate: new Date(),
            timeArr: [],
            allAvailbleTime: [],

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
                timeArr: timeData.DT
            })
        }
        let dataGara = await getDataGara(this.context.user.account.id)

        this.setState({
            currenGara: dataGara.DT.id
        })
        if (dataGara && dataGara.EC === 0) {
            let allday = this.getArrDay()
            if (allday && allday.length > 0) {

                this.setState({
                    allDay: allday,

                })
            }

            let timedatabyday = await readAllScheduleByDate(dataGara.DT.id, allday[0].value / 1000)
            this.setState({
                allAvailbleTime: timedatabyday.DT ? timedatabyday.DT : []
            })
            if (timedatabyday && timedatabyday.EC === 0) {
                let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)
                this.setState({
                    timeArr: time
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

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    handleChangedatePick = async (date) => {
        this.setState({
            currenDate: date
        })
        let datenew = moment(new Date(date)).startOf('day').unix()
        let dataGara = await getDataGara(this.context.user.account.id)
        if (dataGara && dataGara.EC === 0) {

            let timedatabyday = await readAllScheduleByDate(dataGara.DT.id, datenew)
            this.setState({
                allAvailbleTime: timedatabyday.DT ? timedatabyday.DT : []
            })
            if (timedatabyday && timedatabyday.EC === 0) {
                let time = this.buidDatatimepick(timedatabyday.DT, this.state.timeArr)
                this.setState({
                    timeArr: time
                })

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
        let timeArr = this.state.timeArr

        let currenDate = this.state.currenDate
        let selectTime = ''
        let resuf = []
        if (!currenDate) {
            toast.error('invalit date')
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
                    obj.maxOrder = this.state.numberCarPerTime
                    resuf.push(obj)

                })
            }

            else {
                toast.error('invalit time')
                return
            }
            let res = await createBulkScheduleGara({
                arrSchedule: resuf,
                garaId: this.state.currenGara,
                fomatDate: fomatDate
            })

        }




    }
    handlOnchane = (event) => {
        this.setState({
            numberCarPerTime: event.target.value
        })

    }
    render() {

        return (
            <>

                <div className='Manage-schedule-container'>
                    <div className='m-s-title'>
                        Quản lý lịch khám
                    </div>
                    <div className='container'>
                        <div className='row'>

                            <div className='col-12 form-group text-center'>
                                <label className=''>chon ngay</label>
                                <ReactDatePicker
                                    onChange={this.handleChangedatePick}
                                    className='form-control'
                                    value={this.state.currenDate}
                                    selected={this.state.currenDate}
                                    minDate={new Date((new Date()).valueOf())}



                                />
                            </div>

                            <div className='pick-hour-container col-12'>

                                {this.state.timeArr &&
                                    this.state.timeArr.map((item, index) => {
                                        return <button
                                            className={item.isSelected === true ? 'btn btn-pick-time active' : 'btn btn-pick-time'} key={index}
                                            onClick={() => this.handlOnclickTime(item)}
                                        >{item.timValue}</button>



                                    })}


                                <div className='col-2'>
                                    <label>Chon so luong xe toi da trong 1 khung gio</label>
                                    <input
                                        onChange={(event) => this.handlOnchane(event)}
                                        type='number' className='form-control'
                                        placeholder='chon so '
                                        required>

                                    </input>

                                </div>

                                <div className='col-12'>
                                    <button
                                        className='btn-save-info btn btn-primary'
                                        onClick={() => this.handlSaveSchedule()}>luu thogn tin</button></div>
                            </div>

                        </div>
                    </div>
                </div >
            </>
        );
    }
}
ManageSchedule.contextType = UserContext

export default ManageSchedule;
