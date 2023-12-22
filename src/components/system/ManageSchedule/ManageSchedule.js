import React, { Component } from 'react';

import Select from 'react-select';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';

class ManageSchedule extends Component {


    constructor(props) {
        super(props);

        this.state = {
            listDocterARR: [],
            selectDocter: '',

            currenDate: new Date(),
            timeArr: [],

        }
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {


        return (
            <>

                <div className='Manage-schedule-container'>
                    <div className='m-s-title'>
                        Quản lý lịch sua xe gara
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label className=''>chon gara</label>
                                <Select

                                    value={this.state.selectDocter}
                                    onChange={this.handleChange}

                                    options={this.state.listDocterARR}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label className=''>chon ngay</label>
                                <DatePicker
                                    onChange={this.handleChangedatePick}
                                    className='form-control'
                                    value={this.state.currenDate}
                                    selected={this.state.currenDate}
                                    minDate={new Date((new Date()).valueOf() - (1000 * 3600 * 24))}



                                />
                            </div>

                            <div className='pick-hour-container col-12'>

                                {this.state.timeArr &&
                                    this.state.timeArr.map((item, index) => {
                                        return <button
                                            className={item.isSelected === true ? 'btn btn-pick-time active' : 'btn btn-pick-time'} key={index}
                                            onClick={() => this.handlOnclickTime(item)}
                                        >aaaaaa</button>



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


export default ManageSchedule;
