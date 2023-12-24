import React, { Component } from 'react';

import { UserContext } from "../../context/userContext"
import { getDataGara } from '../../services/userService';
import { Buffer } from 'buffer';
import './manageGara.scss'
import GaraSchedule from '../customer/gara/schedule';
class ManageGara extends Component {

    constructor(props) {
        super(props);
        this.state = {

            address: '',
            description: '',
            nameGara: '',
            phone: '',
            provind: '',
            avata: '',
            descriptionHTML: '',
            userId: ''
        }
    }
    async componentDidMount() {



        let data = await getDataGara(this.context.user.account.email)
        console.log('check data: ', data)
        if (data && data.EC === 0) {
            let imageBase64 = ''
            if (data.DT.userGara.avata.data) {

                imageBase64 = new Buffer(data.DT.userGara.avata.data, 'base64').toString('binary')
            }
            let coppyState = { ...this.state }
            coppyState.address = data.DT.userGara.address
            coppyState.description = data.DT.userGara.description
            coppyState.nameGara = data.DT.userGara.nameGara
            coppyState.phone = data.DT.userGara.phone
            coppyState.provind = data.DT.userGara.provindGaraData.name
            coppyState.avata = imageBase64
            coppyState.descriptionHTML = data.DT.userGara.descriptionHTML
            coppyState.userId = data.DT.userGara.id

            console.log('check state: ', this.state)
            this.setState({
                ...coppyState
            })
        }



    }

    render() {



        return (
            <>
                <div className='Docter-Detail-Container container'>
                    <div className='row'>
                        <div className='introduction col-12 row'>
                            <div className='content-left col-2' style={{ backgroundImage: `url(${this.state.avata ? this.state.avata : ''})` }}>

                            </div>
                            <div className='content-right col-10'>
                                <div className='up col-12'>
                                    {this.state.nameGara}
                                </div>

                                <div className='down col-12'>
                                    {this.state.description}
                                </div>
                            </div>
                        </div>
                        <div className='schedule-docter col-12 row '>
                            <div className='conten-left col-6'>

                                <GaraSchedule />
                            </div>
                            <div className='conten-right col-6'>
                                gara extral info
                            </div>
                        </div>
                        <div className='detail-info-docter col-12'>
                            {this.state.descriptionHTML &&
                                < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                        </div>

                    </div>

                </div >
            </>
        )
    }

}

ManageGara.contextType = UserContext

export default ManageGara;
