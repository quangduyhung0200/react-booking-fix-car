import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './manageGara.scss'
import ReactPaginate from 'react-paginate';
import { feactAllGara, searchGaranocenser } from '../../../services/staffService';
import { Buffer } from "buffer";
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { getAllProvind } from '../../../services/guestService';
import { accepGara } from '../../../services/staffService';
import { toast } from 'react-toastify';
import { deniceGara } from '../../../services/staffService';
class ManageGaraFromStaffNotYetPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            search: '',
            listProvind: [],
            selectProvind: {},
            listGara: [],
            currenpage: 1,
            currenlimit: 5,
            totalpage: 0,


        }
    }
    buildDataSelectProvind = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.name
                obj.value = item.id
                resuf.push(obj);

            })


        }

        return resuf
    }
    handlePageClick = async (event) => {

        let coppystate = { ...this.state }

        coppystate.currenpage = +event.selected + 1
        this.setState({
            ...coppystate
        })


    };
    async componentDidMount() {
        let { currenpage, currenlimit } = this.state
        let respons = await feactAllGara(currenpage, currenlimit)
        let provind = await getAllProvind()
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listGara = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            coppystate.listProvind = this.buildDataSelectProvind(provind.DT)
            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await feactAllGara(currenpage, currenlimit)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listGara = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }
    handlViewDetailGara = (item) => {

        this.props.history.push(`/checkdetailGara/${item.id}`)

    }
    handleChangeProvind = async (selectedOption) => {
        this.setState({
            selectProvind: selectedOption
        })
    }
    handOnchaneGaraName = async (event) => {
        this.setState({
            search: event.target.value
        })
    }
    Search = async () => {
        let datainput = {
            gara: this.state.search,
            provind: this.state.selectProvind.value ? this.state.selectProvind.value : 0
        }
        let data = await searchGaranocenser(datainput)
        if (data.EC === 0) {
            this.setState({
                listGara: data.DT,
                show: false
            })
        }
    }
    handlAcepGara = async (user) => {

        let respons = await accepGara(user.userGara.id)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            let { currenpage, currenlimit } = this.state
            let respons = await feactAllGara(currenpage, currenlimit)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listGara = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }


        }

    }
    handlRefesh = () => {
        window.location.reload()
    }
    handDenice = async (item) => {

        let respons = await deniceGara(item.userGara.id)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            let { currenpage, currenlimit } = this.state
            let respons = await feactAllGara(currenpage, currenlimit)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listGara = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }


        }

    }
    render() {

        let { listGara } = this.state

        return (
            <>
                <>
                    <div className='manage-garauncenser-container container'>

                        <div className='tiltle col-12'>
                            <h3>Quản lý xét duyệt gara</h3>
                            <hr></hr>
                            <div className='actionform col-12 row'>
                                <div className='col-4'>
                                    <label class="fw-bold">Nhập tên gara</label>
                                    <input onChange={(event) => this.handOnchaneGaraName(event)} type="text" class="form-control" />
                                </div>
                                <div className='col-4'>
                                    <label className='fw-bold'>Chọn tỉnh thành</label>
                                    <Select

                                        placeholder={'CHON gara'}
                                        value={this.state.selectProvind}
                                        onChange={this.handleChangeProvind}
                                        options={this.state.listProvind}

                                    />
                                </div >
                                <div className='col-4'>
                                    <button onClick={() => this.Search()} className='btn btn-primary button btn btn-primary mt-4 '>Tìm kiếm</button>
                                </div>

                                <div className='action my-2'>
                                    <hr></hr>
                                    <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3'>refesh <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>

                                </div>
                            </div>
                        </div>

                        <div className='m-p-body row'>

                            <div className='col-12'>
                                <table className="table-patient table table-hover table-bordered my-3 table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Tên gara</th>
                                            <th scope="col">Địa chỉ</th>
                                            <th scope="col">Tỉnh thành</th>

                                            <th scope="col">Số điện thoại</th>
                                            <th scope="col">Miêu tả</th>
                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listGara && listGara.length > 0 ?
                                            <>
                                                {
                                                    listGara.map((item, index) => {


                                                        return (
                                                            <tr key={`row-${index}`}>

                                                                <td>{item.id}</td>
                                                                <td>{item.nameGara}</td>
                                                                <td>{item.address}</td>
                                                                <td>{item.provindGaraData.name}</td>

                                                                <td>{item.phone}</td>
                                                                <td>{item.description}</td>


                                                                <td><button onClick={() => this.handlViewDetailGara(item)} className='button btn btn-primary mx-2'>Xem chi tiết</button>
                                                                    <button onClick={() => this.handlAcepGara(item)} className='button btn btn-primary mx-2'>Chấp thuận </button>
                                                                    <button onClick={() => this.handDenice(item)} className='button btn btn-danger'>Từ chối</button></td>
                                                            </tr>
                                                        )




                                                    })
                                                }
                                            </> : <>
                                                <tr>Không có dữ liệu</tr>
                                            </>

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className='user-footer'>
                            {this.state.show === true && <ReactPaginate
                                nextLabel="next >"
                                onPageChange={this.handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={this.state.totalpage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                            }



                        </div>

                    </div>

                </>


            </>
        )
    }

}



export default withRouter(ManageGaraFromStaffNotYetPass);
