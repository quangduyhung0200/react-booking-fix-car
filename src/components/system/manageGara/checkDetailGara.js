import React, { Component } from 'react';
import { getGaraInfo } from '../../../services/guestService';
import { Buffer } from "buffer";
import './checkDetailGara.scss'
import { accepGara } from '../../../services/staffService';
import { UserContext } from "../../../context/userContext"
import { userLogout } from '../../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { deniceGara } from '../../../services/staffService';
import ExtralDataGara from '../../customer/gara/extralDataGara';
import HomeFooter from '../../home/homeFooter/homeFooter';
class CheckDetailGara extends Component {
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
            userId: ''

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


            this.setState({
                ...coppyState
            })

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handlAcepGara = async () => {
        let respons = await accepGara(this.state.userId)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            this.props.history.push(`/ManageGara`);


        }

    }
    deniceGara = async () => {
        let respons = await deniceGara(this.state.userId)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            this.props.history.push(`/ManageGara`);


        }

    }
    render() {


        console.log(this.state)

        return (
            <>

                <div className='Garacheck-Detail-Container container'>
                    <div className='row'>
                        <div className='info'>
                            <div className='introductiongara col-12 row'>
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
                            <div className='extraldata-gara col-12 row '>

                                <ExtralDataGara
                                    garaId={this.state.currenGaraId} />
                            </div>
                        </div>

                        <div className='detail-info-gara col-12'>

                            {this.state.descriptionHTML &&
                                < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                        </div>
                        <div className='active d-flex justify-content-cente'>
                            <button onClick={() => this.handlAcepGara()} className='mx-3 btn btn-primary'>Thông qua</button>
                            <button onClick={() => this.deniceGara()} className='mx-3 btn btn-danger'>Từ chối</button>
                        </div>

                    </div>

                </div >
                <HomeFooter />
            </>
        );
    }
}
CheckDetailGara.contextType = UserContext

export default withRouter(CheckDetailGara);
