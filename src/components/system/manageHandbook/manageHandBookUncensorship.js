import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import ReactPaginate from 'react-paginate';
import { readHanndBook } from '../../../services/staffService';
import { Buffer } from "buffer";
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { getAllStaff, searchHandbookUncensor } from '../../../services/adminService';
import './manageHanndbookuncerser.scss'
import { getHandBookById, accepHandBook } from '../../../services/adminService';
import { toast } from 'react-toastify';
class ManageGaraHandBookHasNotPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            listStaff: [],
            selectStaff: {},
            search: '',
            listHandBook: [],
            currenpage: 1,
            currenlimit: 10,
            totalpage: 0,


        }
    }

    handlePageClick = async (event) => {

        let coppystate = { ...this.state }

        coppystate.currenpage = +event.selected + 1
        this.setState({
            ...coppystate
        })


    };
    buildDataSelectStaff = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.userName
                obj.value = item.id
                resuf.push(obj);

            })


        }

        return resuf
    }
    async componentDidMount() {
        let { currenpage, currenlimit } = this.state
        let respons = await readHanndBook(currenpage, currenlimit, 'ALL')
        let staff = await getAllStaff()
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listHandBook = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            coppystate.listStaff = this.buildDataSelectStaff(staff.DT)

            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await readHanndBook(currenpage, currenlimit, 'ALL')

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listHandBook = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }
    handlViewDetailHandBook = (item) => {

        this.props.history.push(`/checkdetailHandBook/${item.id}`)

    }
    handleChangeStaff = (selectedOption) => {
        this.setState({
            selectStaff: selectedOption
        })
    }
    handOnchaneTitle = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    Search = async () => {
        let datainput = {
            title: this.state.search,
            staff: this.state.selectStaff.value ? this.state.selectStaff.value : 0
        }
        let data = await searchHandbookUncensor(datainput)
        if (data.EC === 0) {
            this.setState({
                listHandBook: data.DT,
                show: false
            })
        }


    }
    handlAcepHandBook = async (handbook) => {

        let respons = await accepHandBook(handbook.id)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            let { currenpage, currenlimit } = this.state
            let respons = await readHanndBook(currenpage, currenlimit, 'ALL')

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listHandBook = respons.DT.user
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
    render() {

        let { listHandBook } = this.state

        return (
            <>
                <>
                    <div className='manage-handbookuncenser-container container'>
                        <div className='action'>
                            <div className='actionform row'>
                                <div className='title'><h3>Quản lý phê duyệt cẩm nang</h3>
                                    <hr></hr></div>

                                <div className='col-4'>
                                    <label class="fw-bold">Nhập tên bài viết</label>
                                    <input onChange={(event) => this.handOnchaneTitle(event)} type="text" class="form-control" />
                                </div>
                                <div className='col-4'>
                                    <label className='fw-bold'>Chọn nhân viên</label>
                                    <Select


                                        value={this.state.selectStaff}
                                        onChange={this.handleChangeStaff}
                                        options={this.state.listStaff}

                                    />

                                </div>

                                <div className='col-4'>
                                    <button onClick={() => this.Search()} className='btn btn-primary button btn btn-primary mt-4'>Tìm kiếm</button>
                                </div>

                                <hr className='m-2'></hr>




                            </div>
                            <div className='action'>
                                <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3'>Làm mới trang <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>

                            </div>
                        </div>
                        <div className='m-p-body row'>

                            <div className='col-12'>
                                <table className="table-patient table table-hover table-bordered my-3 table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Tiêu đề</th>

                                            <th scope="col">Nhân viên viết</th>

                                            <th scope="col">Ngày viếtt</th>

                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listHandBook && listHandBook.length > 0 ?
                                            <>
                                                {
                                                    listHandBook.map((item, index) => {


                                                        let str = item.createdAt;
                                                        let endDate = Date.parse(str);

                                                        let s = new Date(endDate).toLocaleDateString("vi")


                                                        return (
                                                            <tr key={`row-${index}`}>

                                                                <td>{item.id}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.StaffHandbookData.userName}</td>
                                                                <td>{s}</td>





                                                                <td><button onClick={() => this.handlViewDetailHandBook(item)} className='button btn btn-primary mx-2'>Xem chi tiết</button>
                                                                    <button onClick={() => this.handlAcepHandBook(item)} className='button btn btn-primary mx-2'>Phê duyệt</button>
                                                                    <button className='button btn btn-danger'>Từ chối</button></td>
                                                            </tr>
                                                        )




                                                    })
                                                }
                                            </> : <>
                                                <tr>Không có data</tr>
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
                            />}



                        </div>

                    </div>

                </>


            </>
        )
    }

}



export default withRouter(ManageGaraHandBookHasNotPass);
