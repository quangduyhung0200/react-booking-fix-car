import React, { Component } from 'react';

import './schedule.scss'


import 'moment/locale/vi';
import moment from 'moment';



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

    }
    handleClickScheduleTime = async (time) => {


    }
    closeBookingModel = () => {

    }
    render() {

        let { allDay } = this.state
        console.log(allDay)
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

                        </div>

                    </div>
                </div>

            </>
        );
    }
}



export default GaraSchedule;
