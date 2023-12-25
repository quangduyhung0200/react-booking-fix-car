import React, { Component } from 'react';

import './schedule.scss'


import 'moment/locale/vi';
import moment from 'moment';
import { readAllScheduleByDate } from '../../../services/userService';

import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
class GaraSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            allAvailbleTime: [],
            isOpentTogger: false,
            dataModelSchedule: {}
        }
    }
    async componentDidMount() {
        let allday = this.getArrDay()



        if (allday && allday.length > 0) {

            this.setState({
                allDay: allday,

            })
        }

        let res = await readAllScheduleByDate(this.props.match.params.id, allday[0].value / 1000)

        this.setState({
            allAvailbleTime: res.DT ? res.DT : []
        })



    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


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

    }
    handlOnchanSelect = async (event) => {

        let garaId = this.props.match.params.id

        let date = event.target.value / 1000
        console.log(garaId, date)
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

        // this.setState({
        //     isOpentTogger: !this.state.isOpentTogger,
        //     dataModelSchedule: time

        // })
        console.log('check dadasdasd: ', time)

    }
    closeBookingModel = () => {

    }
    render() {

        let { allDay } = this.state
        console.log(this.state)
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

            </>
        );
    }
}



export default withRouter(GaraSchedule);
