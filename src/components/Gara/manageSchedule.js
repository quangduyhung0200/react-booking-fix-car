import React, { Component } from 'react';

import Select from 'react-select';
import './manageSchedule.scss'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import ReactDatePicker from 'react-datepicker';
import { getAllTime, getDataGara, createBulkScheduleGara } from '../../services/userService';
import { UserContext } from "../../context/userContext"
class ManageSchedule extends Component {


    constructor(props) {
        super(props);

        this.state = {
            currenGara: '',


            currenDate: new Date(),
            timeArr: [],

        }
    }
    async componentDidMount() {
        let timeData = await getAllTime()
        if (timeData && timeData.EC === 0) {
            this.setState({
                timeArr: timeData.DT
            })
        }
        let dataGara = await getDataGara(this.context.user.account.email)

        this.setState({
            currenGara: dataGara.DT.userGara.id
        })
    }
    buidDataInputSeclect = (inputData) => {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleChange = async (selectedDocter) => {

    };
    handleChangedatePick = (date) => {
        this.setState({
            currenDate: date
        })
        console.log(date)


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
            console.log(res)
        }




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