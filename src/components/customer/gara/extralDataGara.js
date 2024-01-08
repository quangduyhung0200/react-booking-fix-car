import React, { Component } from 'react';

import { getGaraInfo } from '../../../services/guestService';


import 'moment/locale/vi';
import moment from 'moment';

import './extraldataGara.scss'
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { readAllCarByGara } from '../../../services/guestService';
class ExtralDataGara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataGara: ''
        }
    }
    async componentDidMount() {

        let data = await getGaraInfo(this.props.garaId)




        this.setState({
            dataGara: data.DT
        })


    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.garaId !== this.props.garaId) {
            let data = await getGaraInfo(this.props.garaId)




            this.setState({
                dataGara: data.DT
            })

        }

    }



    render() {

        let { dataGara } = this.state
        return (
            <>
                {dataGara &&
                    <>
                        <div className='extraldata'>
                            <div className='address'><i class="fa fa-map-marker" aria-hidden="true"></i> <span className='fw-light '>Địa chỉ: </span> <span className='fw-bold'>{dataGara.address}, tỉnh {dataGara.provindGaraData.name}</span></div>
                            <div> <i class="fa fa-phone-square" aria-hidden="true"></i> <span className='fw-light'>Số điện thoại: </span><span className='fw-bold'>{dataGara.phone} </span> </div>

                        </div>

                    </>
                }




            </>
        );
    }
}



export default withRouter(ExtralDataGara);
