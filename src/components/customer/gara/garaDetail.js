import React, { Component } from 'react';
import { getGaraInfo, } from '../../../services/guestService';
import { Buffer } from "buffer";
import './garaDetail.scss'
import { accepGara } from '../../../services/staffService';
import { UserContext } from "../../../context/userContext"
import { userLogout } from '../../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import GaraSchedule from './schedule';
import ExtralDataGara from './extralDataGara';
import Comment from './comment';

class DetailGara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currenGaraId: '',
            address: '',
            description: '',
            nameGara: '',
            phone: '',
            provind: '',
            avata: '',
            descriptionHTML: '',
            userId: '',
            garaId: '',
            propvindGara: {},
            rate: ''

        }
    }
    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {

            let id = this.props.match.params.id;
            this.setState({
                currenGaraId: id
            })

            let data = await getGaraInfo(id)


            let imageBase64 = ''
            if (data.DT.avata.data) {

                imageBase64 = new Buffer(data.DT.avata.data, 'base64').toString('binary')
            }
            let coppyState = { ...this.state }
            coppyState.address = data.DT.address
            coppyState.description = data.DT.description
            coppyState.nameGara = data.DT.nameGara
            coppyState.phone = data.DT.phone
            coppyState.provind = data.DT.provindGaraData.name
            coppyState.avata = imageBase64
            coppyState.descriptionHTML = data.DT.contenHTML
            coppyState.userId = data.DT.userId
            coppyState.garaId = data.DT.id
            coppyState.propvindGara = data.DT.provindGaraData
            coppyState.rate = data.DT.rateId




            this.setState({
                ...coppyState
            })

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {




        return (
            <>

                <div className='Gara-Detail-Container container'>
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
                                <div>                     <i class="fa fa-map-marker" aria-hidden="true"></i> {this.state.provind}</div>

                            </div>
                        </div>
                        <div className='schedule-gara col-12 row '>
                            <div className='conten-left col-6'>

                                <GaraSchedule
                                    dataGara={this.state.propvindGara}
                                    garaId={this.state.currenGaraId}


                                />
                            </div>
                            <div className='conten-right col-6'>
                                <ExtralDataGara
                                    garaId={this.state.currenGaraId} />
                            </div>
                        </div>
                        <div className='detail-info-docter col-12'>
                            {this.state.descriptionHTML &&
                                < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                        </div>
                        <div>
                            <Comment
                                currenGaraId={this.state.currenGaraId}
                                rate={this.state.rate} />
                        </div>

                    </div>

                </div >
            </>
        );
    }
}
DetailGara.contextType = UserContext

export default withRouter(DetailGara);
