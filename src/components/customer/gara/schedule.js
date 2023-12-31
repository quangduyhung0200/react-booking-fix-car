import React, { Component } from 'react';

import './schedule.scss'


import 'moment/locale/vi';
import moment from 'moment';
import { readAllScheduleByDate, getAllDay } from '../../../services/guestService';

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import ModelBooking from './modelBooking';

class GaraSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvailbleTime: [],
            isOpentTogger: false,
            dataModelSchedule: {},
            dataGara: {},


        }
    }
    async componentDidMount() {



        let allday2 = await getAllDay(this.props.garaId)
        let allday3 = allday2.DT
        let allday = this.getArrDay()
        const results2 = allday.filter(({ value: id1 }) => allday3.some(({ date: id2, }) => +id2 === (id1 / 1000)));

        let res = await readAllScheduleByDate(this.props.garaId, allday[0].value / 1000)
        if (res.EC === 0) {
            this.setState({
                allAvailbleTime: res.DT ? res.DT : [],
                garaId: this.props.garaId,
                allDay: results2
            })
        }
        if (this.props.garaId !== '') {
            let allday = this.getArrDay()
            let res = await readAllScheduleByDate(this.props.garaId, allday[0].value / 1000)
            if (res.EC === 0) {
                this.setState({
                    allAvailbleTime: res.DT ? res.DT : [],
                    garaId: this.props.garaId
                })
            }

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

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.garaId !== this.props.garaId) {

            let allday2 = await getAllDay(this.props.garaId)
            let allday3 = allday2.DT
            let allday = this.getArrDay()
            const results2 = allday.filter(({ value: id1 }) => allday3.some(({ date: id2, }) => +id2 === (id1 / 1000)));

            let res = await readAllScheduleByDate(this.props.garaId, allday[0].value / 1000)
            if (res.EC === 0) {
                this.setState({
                    allAvailbleTime: res.DT ? res.DT : [],
                    garaId: this.props.garaId,
                    allDay: results2
                })
            }
        }


    }
    handlOnchanSelect = async (event) => {

        let garaId = this.props.garaId

        let date = event.target.value / 1000

        let res = await readAllScheduleByDate(garaId, date)

        if (res && res.EC === 0) {

            this.setState({
                allAvailbleTime: res.DT ? res.DT : []
            })
        }
        else {
            toast.error('errou')
        }

    }
    handleClickScheduleTime = async (time) => {

        this.setState({
            isOpentTogger: !this.state.isOpentTogger,

            dataModelSchedule: time,
            dataGara: this.props.dataGara

        })


    }
    closeBookingModel = () => {
        this.setState({
            isOpentTogger: false
        })
    }
    render() {

        let { allDay } = this.state

        let { allAvailbleTime } = this.state
        return (
            <>
                <div className='docter-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handlOnchanSelect(event)}>

                            {allDay && allDay.length > 0 &&
                                allDay.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>{item.label}</option>
                                    )
                                })}



                        </select>
                    </div>
                    <div className='all-vailble-time'>
                        <div className='text-calender'>
                            <span><i className="fas fa-calendar-times"></i>lich kham</span>
                        </div>
                        <div className='time-content'>
                            {allAvailbleTime && allAvailbleTime.length > 0 ?
                                <>
                                    <div className='time-content-availble'>
                                        {allAvailbleTime.map((item, index) => {

                                            return (
                                                <button key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)} >{item.timeDataSchedule.timValue}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </>
                                :

                                <div>khong co lich cho thoi gian nay vui long chon thoi gian khac</div>




                            }
                        </div>

                    </div>
                </div>
                <ModelBooking
                    isOpentTogger={this.state.isOpentTogger}
                    closeBookingModel={this.closeBookingModel}
                    dataModelSchedule={this.state.dataModelSchedule}
                    datagara={this.state.dataGara}
                />


            </>
        );
    }
}



export default withRouter(GaraSchedule);
