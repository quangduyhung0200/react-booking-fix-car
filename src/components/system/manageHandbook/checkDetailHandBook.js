import React, { Component } from 'react';

import { Buffer } from "buffer";
import { getHandBookById, accepHandBook } from '../../../services/adminService';
import './checkDetailHandBook.scss'
import { UserContext } from "../../../context/userContext"
import { accepGara } from '../../../services/staffService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
class CheckDetailHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currenHandBookId: '',


            title: '',


            avata: '',
            descriptionHTML: '',
            handbookId: '',
            createdAt: '',
            staffName: ''

        }
    }
    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {

            let id = this.props.match.params.id;
            this.setState({
                currenHandBookId: id
            })

            let data = await getHandBookById(id)


            let coppyState = { ...this.state }

            coppyState.createdAt = data.DT.createdAt
            coppyState.title = data.DT.title

            coppyState.avata = data.DT.avata
            coppyState.descriptionHTML = data.DT.contentHTML
            coppyState.handbookId = data.DT.id
            coppyState.staffName = data.DT.StaffHandbookData.userName

            this.setState({
                ...coppyState
            })

        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handlAcepHandBook = async () => {
        let respons = await accepHandBook(this.state.currenHandBookId)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            this.props.history.push(`/manage-handBook`);


        }

    }
    render() {


        console.log(this.state)
        let str = this.state.createdAt;
        let endDate = Date.parse(str);
        let s = new Date(endDate).toLocaleDateString("vi")
        let imageBase64 = ''
        if (this.state.avata.data) {

            imageBase64 = new Buffer(this.state.avata.data, 'base64').toString('binary')
        }

        return (
            <>

                <div className='HandBook-Detail-Container container'>
                    <div className='row'>
                        <div className='introduction col-12 row'>
                            <div className='avata col-md-6 col-12' style={{ backgroundImage: `url(${imageBase64 ? imageBase64 : ''})`, height: '50vh' }}>

                            </div>
                            <div className='title col-md-6 col-12'>
                                <h3 className=' text-uppercase  up col-12 px-2'>
                                    {this.state.title}
                                </h3>
                                <div className='up col-12'>
                                    <p className='fw-light'>Nguoi viet: {this.state.staffName}</p>

                                </div>

                                <div className='down col-12'>
                                    <p className='font-italic'>Ngay viet: {s}</p>
                                </div>
                            </div>
                        </div>
                        <div className='body col-12 my-3 '>
                            {this.state.descriptionHTML &&
                                < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                        </div>

                        {this.context.user.account.role[0].id === 4 && <div className='active col-12'>
                            <button onClick={() => this.handlAcepHandBook()} className='mx-3 btn btn-primary'>Thông qua</button>
                            <button className='mx-3 btn btn-danger'>Từ chối</button>
                        </div>}

                    </div>

                </div >
            </>
        );
    }
}
CheckDetailHandBook.contextType = UserContext

export default withRouter(CheckDetailHandBook);
