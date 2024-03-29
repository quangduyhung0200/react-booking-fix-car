import React, { Component } from 'react';

import { UserContext } from "../../context/userContext"
import { getDataGara } from '../../services/garaService';
import { Buffer } from 'buffer';
import './manageGara.scss'
import GaraSchedule from '../customer/gara/schedule';
import { readAllCarByGara } from '../../services/guestService';
import ReactPaginate from 'react-paginate';
import Comment from '../customer/gara/comment';
import HomeFooter from '../home/homeFooter/homeFooter';
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
            userId: '',
            garaId: '',
            listCar: [],
            rate: '',
            status: '',



        }
    }
    async componentDidMount() {



        let data = await getDataGara(this.context.user.account.id)

        if (data && data.EC === 0) {

            let data1 = await readAllCarByGara(data.DT.id)

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
            coppyState.listCar = data1.DT
            coppyState.rate = data.DT.rateId
            coppyState.status = data.DT.status
            coppyState.phone = data.DT.phone

            this.setState({
                ...coppyState
            })
        }






    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {

            let respons = await readAllCarByGara(this.context.user.account.id)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listCar = respons.DT.user

                this.setState({
                    ...coppystate
                })

            }
        }
    }
    handlViewCar = async (item) => {

        this.props.history.push(`/detailCar/${item.Cars.id}`)
    }
    handOnclickUpdate = () => {
        this.props.history.push(`/UpadateGara`)
    }
    render() {

        let { listCar } = this.state
        console.log('car: ', listCar)
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
                                <div>                     <i class="fa fa-map-marker" aria-hidden="true"></i> {this.state.provind}</div>
                                <div className='down col-12'>
                                    Số điện thoại  {this.state.phone}
                                </div>
                            </div>
                            <hr className='my-2'></hr>
                            <div className='down col-12'>
                                <button onClick={() => this.handOnclickUpdate()} className='btn btn-warning'>Cập nhật</button>
                            </div>
                            <hr className='my-2'></hr>
                            <div>Trạng thái:
                                {this.state.status === 'S2' ? <span> Gara đã đưuọc thông qua và hiển thị trên trang chủ</span> :
                                    this.state.status === 'S3' ?
                                        <span> Gara chưa không được phê duyệt, vui lòng cập nhật các thông itn để được xem xet lại</span>
                                        : <span> Gara chưa được thông qua</span>}
                            </div>
                        </div>
                        <div className='schedule-docter col-12 row '>
                            <table className="table table-hover table-bordered my-3">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Tên xe</th>
                                        <th scope="col">Hãng xe</th>
                                        <th scope="col">Mô tả</th>
                                        <th scope="col">avata</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {listCar && listCar.length > 0 ?
                                        <>
                                            {
                                                listCar.map((item, index) => {
                                                    let imageBase64 = ''
                                                    if (item.Cars.avata) {

                                                        imageBase64 = new Buffer(item.Cars.avata, 'base64').toString('binary')
                                                    }
                                                    return (

                                                        <tr key={`row-${index}`}>

                                                            <td>{item.Cars.id}</td>
                                                            <td>{item.Cars.nameCar}</td>
                                                            <td>{item.Cars.carCompanyData.name}</td>
                                                            <td>{item.Cars.descriptions}</td>
                                                            <td style={{
                                                                backgroundImage: `url(${imageBase64})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'

                                                            }}></td>
                                                            <td>{item.Cars.id !== null && <button onClick={() => this.handlViewCar(item)} className='btn btn-primary'>view</button>}
                                                            </td>
                                                        </tr>
                                                    )




                                                })
                                            }
                                        </> : <>
                                            <tr><td>not fout user</td></tr>
                                        </>

                                    }
                                </tbody>
                            </table>

                        </div>





                        <div className='detail-info-docter col-12'>
                            {this.state.descriptionHTML &&
                                < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                        </div>

                    </div>

                </div >
                <Comment
                    currenGaraId={this.state.garaId}
                    rate={this.state.rate} />
                <HomeFooter />
            </>
        )
    }

}

ManageGara.contextType = UserContext

export default ManageGara;
