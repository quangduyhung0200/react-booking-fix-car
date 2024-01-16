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


        if (this.props.match && this.props.match.params && this.props.match.params.id && this.props.match.path.split("/")[1] === 'detailGara') {

            let id = this.props.match.params.id;
            let allday2 = await getAllDay(id)
            if (allday2.EC === 0) {
                let allday3 = allday2.DT
                let allday = this.getArrDay()
                const results2 = allday.filter(({ value: id1 }) => allday3.some(({ date: id2, }) => +id2 === (id1 / 1000)));
                console.log('aaaaaaaaaa', results2)
                let res = await readAllScheduleByDate(id, results2[0].value / 1000)
                let date = results2[0].value / 1000
                let hours = new Date().getHours();
                let today = moment(new Date()).startOf('day').unix()


                let timecheck = []
                if (date === today && res && res.EC === 0) {

                    let data = res.DT
                    data.map((item, index) => {

                        if ((+item.timeType + 8) >= hours) {

                            timecheck.push(item)
                        }
                    })

                    timecheck.sort((a, b) => parseFloat(+a.timeType) - parseFloat(+b.timeType));

                    this.setState({
                        allAvailbleTime: timecheck ? timecheck : [],
                        allDay: results2
                    })
                }

                else if (date !== today && res && res.EC === 0 || res.EC === 1) {
                    console.log('bbbbbbbbbbbbbbb,', res)
                    this.setState({
                        allAvailbleTime: res.DT ? res.DT : [],

                        allDay: results2
                    })
                }
            }

        }
        else {

            let allday2 = await getAllDay(this.props.garaId)
            if (allday2.EC === 0) {
                let allday3 = allday2.DT
                let allday = this.getArrDay()
                const results2 = allday.filter(({ value: id1 }) => allday3.some(({ date: id2, }) => +id2 === (id1 / 1000)));

                let res = await readAllScheduleByDate(this.props.garaId, results2[0].value / 1000)

                let date = results2[0].value / 1000
                let hours = new Date().getHours();
                let today = moment(new Date()).startOf('day').unix()


                let timecheck = []
                if (date === today && res && res.EC === 0) {
                    let data = res.DT

                    data.map((item, index) => {

                        if ((+item.timeType + 8) >= hours) {

                            timecheck.push(item)
                        }
                    })
                    timecheck.sort((a, b) => parseFloat(+a.timeType) - parseFloat(+b.timeType));
                    this.setState({
                        allAvailbleTime: timecheck ? timecheck : [],
                        allDay: results2
                    })
                }
                else if (date !== today && res && res.EC === 0) {
                    this.setState({
                        allAvailbleTime: res.DT ? res.DT : [],

                        allDay: results2
                    })
                }
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
            let res = await readAllScheduleByDate(this.props.garaId, results2[0].value / 1000)
            let date = results2[0].value / 1000
            let hours = new Date().getHours();
            let today = moment(new Date()).startOf('day').unix()


            let timecheck = []
            if (date === today && res && res.EC === 0) {
                let data = res.DT
                data.map((item, index) => {

                    if ((+item.timeType + 8) >= hours) {

                        timecheck.push(item)
                    }
                })
                timecheck.sort((a, b) => parseFloat(+a.timeType) - parseFloat(+b.timeType));
                this.setState({
                    allAvailbleTime: timecheck ? timecheck : [],
                    allDay: results2
                })
            }
            else if (date !== today && res && res.EC === 0) {
                this.setState({
                    allAvailbleTime: res.DT ? res.DT : [],

                    allDay: results2
                })
            }





        }



    }
    handlOnchanSelect = async (event) => {

        let garaId = this.props.garaId

        let date = event.target.value / 1000

        let res = await readAllScheduleByDate(garaId, date)
        let hours = new Date().getHours();
        let today = moment(new Date()).startOf('day').unix()






        let timecheck = []
        if (date === today && res && res.EC === 0) {
            let data = res.DT
            data.map((item, index) => {

                if ((+item.timeType + 8) >= hours) {

                    timecheck.push(item)
                }
            })
            timecheck.sort((a, b) => parseFloat(+a.timeType) - parseFloat(+b.timeType));
            this.setState({
                allAvailbleTime: timecheck ? timecheck : []
            })
        }
        else if (res && res.EC === 0 && date !== today) {

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
            isOpentTogger: false,
            dataModelSchedule: {}
        })
    }
    render() {

        let { allDay } = this.state

        let { allAvailbleTime } = this.state
        console.log('checj day:', allAvailbleTime)

        return (
            <>
                <div className='gara-schedule-container'>
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
                            <span><i className="fa fa-calendar" aria-hidden="true"></i>Lịch sửa xe</span>
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

                                <div>Không có lịch trong ngày hôm nay vui lòng thử lại sau</div>




                            }
                        </div>

                    </div>
                </div>
                <ModelBooking

                    garaId={this.props.garaId}
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
