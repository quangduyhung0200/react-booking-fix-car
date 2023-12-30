import React, { Component } from 'react';


import { getAllGara } from '../../../services/guestService';
import './garaProfile.scss'
import { Buffer } from 'buffer';
import _ from 'lodash';
import moment from 'moment';
import { Link } from "react-router-dom";
import GaraSchedule from './schedule';
import { getGarabyProvindCarCompanyCar } from '../../../services/guestService';
class ProfileGara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: []

        }
    }
    async componentDidMount() {

        let data = await getAllGara()
        this.setState({
            dataProfile: data.DT
        })

    }




    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModel !== this.props.dataModel) {
            let data = await getGarabyProvindCarCompanyCar(this.props.dataModel.selectProvind.value, this.props.dataModel.selectCarCompany.value, this.props.dataModel.selectCar.value)
            let selectId = data.DT
            let allGara = await getAllGara()
            let allgara2 = allGara.DT

            const results = allgara2.filter(({ id: id1 }) => selectId.some(({ id: id2 }) => +id2 === +id1));
            this.setState({
                dataProfile: results
            })

        }
    }
    render() {

        let { dataProfile } = this.state
        return (
            <>
                <div className='profile-gara container '>

                    {dataProfile && dataProfile.length > 0 &&
                        dataProfile.map((item, index) => {
                            let imageBase64
                            if (item.avata.data) {

                                imageBase64 = new Buffer(item.avata.data, 'base64').toString('binary')
                            }
                            return (
                                <>
                                    <div className='gara-childe row' key={`chile-${index}`}>
                                        <div className='avata col-2' style={{ backgroundImage: `url(${imageBase64 ? imageBase64 : ''})` }}>

                                        </div>
                                        <div className='content-right col-4'>
                                            <h4 className='up'>
                                                {item.nameGara}
                                            </h4>

                                            <div className='down'>
                                                {item.description}

                                            </div>

                                        </div>
                                        <div className='content-mid col-1' >

                                            <button className='btn btn-warning'>Xem thêm</button>

                                        </div>
                                        <div className='content-left col-5' >

                                            <GaraSchedule
                                                dataGara={item.provindGaraData}
                                                garaId={item.id} />

                                        </div>
                                    </div>

                                </>)

                        })}












                </div >

            </>
        );
    }
}



export default ProfileGara;
