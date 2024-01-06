import React, { Component } from 'react';

import { getGaraInfo } from '../../../services/guestService';


import 'moment/locale/vi';
import moment from 'moment';


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
        console.log('check props', this.state)
        let { dataGara } = this.state
        return (
            <>
                {dataGara &&
                    <>
                        <div className=''>
                            <div><span className='fw-light'>Địa chỉ:</span> <span className='fw-bold'>{dataGara.address}, tỉnh {dataGara.provindGaraData.name}</span></div>
                            <div><span className='fw-light'>Số điện thoại:</span><span className='fw-bold'>{dataGara.phone} </span> </div>

                        </div>

                    </>
                }




            </>
        );
    }
}



export default withRouter(ExtralDataGara);
