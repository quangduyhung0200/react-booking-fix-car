import React, { Component } from 'react';

import { Buffer } from "buffer";
import { getHandBookById, accepHandBook } from '../../../services/adminService';

import { UserContext } from "../../../context/userContext"
import { accepGara } from '../../../services/staffService';
import { toast } from 'react-toastify';
import Carousel from 'react-multi-carousel';
import { withRouter } from 'react-router-dom';
import { getTopHandBook, getTopHandBookRelateto } from '../../../services/guestService';

import { getUserById } from '../../../services/userService';
import { add } from 'lodash';
import ModelUser from '../../system/manageUser/modelUser';
class DetailAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: false,
            userName: '',
            address: '',
            avata: '',

            email: '',
            gender: '',
            action: 'CREATE',
            phone: '',
            garaId: '',
            datamodel: {},
            showModelUser: false

        }
    }
    async componentDidMount() {
        let id = this.context.user.account.id
        let user = await getUserById(id)

        if (user.EC === 0) {
            let data = user.DT
            this.setState({
                datamodel: user.DT,
                userName: data.userName,
                address: data.address,
                avata: data.avata ? data.avata : '',
                email: data.email,
                gender: { label: data.genderDataUser.name, value: data.genderDataUser.id },
                phone: data.phone,
                garaId: data.userGara ? data.userGara.id : 0
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handlAcepHandBook = async () => {
        let respons = await accepHandBook(this.state.currenHandBookId)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            this.props.history.push(`/gara`);


        }

    }
    onHideModelUser = async () => {
        this.setState({
            showModelUser: false,

            dataModel: {},
            action: 'CREATE',
            account: false


        })
        let id = this.context.user.account.id
        let user = await getUserById(id)

        if (user.EC === 0) {
            let data = user.DT
            this.setState({
                datamodel: user.DT,
                userName: data.userName,
                address: data.address,
                avata: data.avata ? data.avata : '',
                email: data.email,
                gender: { label: data.genderDataUser.name, value: data.genderDataUser.id },
                phone: data.phone,
                garaId: data.userGara ? data.userGara.id : 0
            })
        }


    }
    OnclickUpdate = () => {
        this.setState({
            dataModel: this.state.datamodel,
            action: 'UPDATE',
            showModelUser: true,
            account: true

        })
    }
    render() {


        let { userName, address, avata, email, gender, phone, garaId } = this.state

        console.log(this.state)
        let imageBase64 = ''
        if (avata) {

            imageBase64 = new Buffer(avata, 'base64').toString('binary')
        }
        return (
            <>

                <div className='HandBook-Detail-Container container'>
                    <div className='row'>
                        <div className='introduction col-12 row my-2'>
                            <div className='avata col-md-6 col-12'
                                style={{ backgroundImage: `url(${this.state.avata ? imageBase64 : ''})`, height: '50vh' }}
                            >

                            </div>
                            <div className='title col-md-6 col-12'>
                                <h3 className=' text-uppercase  up col-12 px-2'>
                                    Thong tin ca nhan
                                </h3>
                                <div className='down col-12'>
                                    <span className='fst-italic'>ho ten: </span><span className='fw-bold'>{userName}</span>

                                </div>

                                <div className='down col-12'>
                                    <span className='fst-italic'>email: </span><span className='fw-bold'>{email}</span>
                                </div>
                                <div className='down col-12'>
                                    <span className='fst-italic'>sodien thoai: </span><span className='fw-bold'>{phone}</span>
                                </div>
                                <div className='down col-12'>
                                    <span className='fst-italic'>gioi tinh: </span><span className='fw-bold'>{gender.label}</span>
                                </div>
                                <div className='down col-12'>
                                    <span className='fst-italic'>dia chi: </span><span className='fw-bold'>{address}</span>
                                </div>
                                <div className='down col-12'>
                                    <span className='fst-italic'>lien ket voi gara: </span><span className='fw-bold'>
                                        {garaId === 0 ? '' : <a href={`/detailGara/${garaId}`}>gara cua toi</a>}</span>

                                </div>
                                <div className='down col-12'>
                                    <button onClick={() => this.OnclickUpdate()} className='btn btn-primary'>cap nhat thogn tin</button>
                                </div>


                            </div>
                        </div>
                        <hr></hr>





                        <div className='session-content'>

                        </div>


                    </div>

                </div >
                <ModelUser
                    onHide={this.onHideModelUser}
                    show={this.state.showModelUser}
                    action={this.state.action}
                    dataModel={this.state.datamodel}
                    account={this.state.account}
                />
            </>
        );
    }
}
DetailAccount.contextType = UserContext

export default withRouter(DetailAccount);
