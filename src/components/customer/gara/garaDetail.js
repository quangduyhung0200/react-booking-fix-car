import React, { Component } from 'react';
import { getGaraInfo } from '../../../services/userService';
import { Buffer } from "buffer";
import './garaDetail.scss'
import { accepGara } from '../../../services/userService';
import { UserContext } from "../../../context/userContext"
import { userLogout } from '../../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
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
            console.log('check data: ', data)
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
            coppyState.descriptionHTML = data.DT.descriptionHTML
            coppyState.userId = data.DT.userGara.id


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
            this.props.history.push(`/gara`);


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

                                conten lefgt schedule
                            </div>
                            <div className='conten-right col-6'>
                                gara extral info
                            </div>
                        </div>
                        <div className='detail-info-docter col-12'>
                            {this.state.descriptionHTML &&
                                < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                        </div>
                        {this.context.user.account.role[0].id === 4 && <div className='active col-12'>
                            <button onClick={() => this.handlAcepGara()} className='mx-3 btn btn-primary'>accep</button>
                            <button className='mx-3 btn btn-danger'>denice</button>
                        </div>}

                    </div>

                </div >
            </>
        );
    }
}
DetailGara.contextType = UserContext

export default withRouter(DetailGara);
