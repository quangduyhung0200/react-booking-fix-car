import React, { Component } from 'react';

import { toast } from 'react-toastify';

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from "../../context/userContext"
import ReactPaginate from 'react-paginate';
import { readHanndBook } from '../../services/staffService';
import { Buffer } from 'buffer';
import './manageHandbook.scss'
import Select from 'react-select';
import { searchHandbookStaff } from '../../services/staffService';
class ManageHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffId: '',
            show: true,
            listStatus: [],
            selectStatus: {},
            search: '',
            listHandBook: [],
            currenpage: 1,
            currenlimit: 5,
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
    async componentDidMount() {
        let data = await readHanndBook(this.state.currenpage, this.state.currenlimit, this.context.user.account.id)
        let status = [{ label: 'Chưa được duyệt', value: 'S1' },
        { label: 'Đã được duyệt', value: 'S2' },]
        if (data && data.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.staffId = this.context.user.account.id

            coppystate.listHandBook = data.DT.user
            coppystate.totalpage = data.DT.totalPage
            coppystate.listStatus = status
            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let data = await readHanndBook(this.state.currenpage, this.state.currenlimit, this.context.user.account.id)
            if (data && data.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listHandBook = data.DT.user
                coppystate.totalpage = data.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }
    handOnlcickUpdate = (item) => {
        this.props.history.push(`/updateHandbook/${item.id}`)

    }

    handOnclickAddnewHandBook = () => {

        this.props.history.push(`/addNewHandBook?id=${this.context.user.account.id}`)
    }
    handlViewHandbook = (item) => {
        this.props.history.push(`/detailHandbook/${item.id}`)
    }
    handlRefesh = () => {
        window.location.reload()
    }
    handOnchaneTitle = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    handleChangeStatus = (selectedOption) => {
        this.setState({
            selectStatus: selectedOption
        })
    }
    Search = async () => {

        let datainput = {
            title: this.state.search,
            staff: this.state.staffId,
            status: !this.state.selectStatus.value ? 0 : this.state.selectStatus.value

        }

        let data = await searchHandbookStaff(datainput)
        if (data.EC === 0) {
            this.setState({
                listHandBook: data.DT,
                show: false
            })
        }


    }
    render() {

        let { listHandBook } = this.state
        return (
            <>
                <div className='manage-handbook-staff-container container'>
                    <div className='m-p-title'>
                        <h3>Quản lý bài viết của tôi</h3>
                        <hr></hr>
                        <div className='actionform col-12 row'>
                            <div className='col-4'>
                                <label class="fw-bold">Nhập tiêu đề bài viết</label>
                                <input onChange={(event) => this.handOnchaneTitle(event)} type="text" class="form-control" />
                            </div>
                            <div className='col-4'>
                                <label class="fw-bold">Chọn trạng thái</label>
                                <Select


                                    value={this.state.selectStatus}
                                    onChange={this.handleChangeStatus}
                                    options={this.state.listStatus}

                                />
                            </div>
                            <div className='col-4'>
                                <button onClick={() => this.Search()} className='btn btn-primary button btn btn-primary mt-4'>Tìm kiếm</button>
                            </div>




                            <div className='action my-2'>
                                <hr></hr>
                                <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3'>Làm mới trang <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
                                <button onClick={() => this.handOnclickAddnewHandBook()} className=' btn btn-success'>Thêm bài viết mới <i className="fa fa-plus" aria-hidden="true"></i></button>

                            </div>

                        </div>
                    </div>
                    <div className='m-p-body row'>

                        <div className='col-12'>
                            <table className="table-patient table table-hover table-bordered my-3 table-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>

                                        <th scope="col">Tiêu đề</th>
                                        <th scope="col">Ngày viết</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listHandBook && listHandBook.length > 0 &&
                                        listHandBook.map((item, index) => {
                                            let imageBase64 = ''
                                            if (item.avata) {

                                                imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                            }
                                            let str = item.createdAt;
                                            let endDate = Date.parse(str);
                                            let s = new Date(endDate).toLocaleDateString("vi")


                                            return (
                                                <tr key={`child-${item.id}`}>

                                                    <td>{item.id}</td>

                                                    <td>{item.title}</td>



                                                    <td>{s}</td>
                                                    <td>{item.status === 'S1' ? 'Bài viết chưa đưuọc phê duyệt' : 'Bài viết đã được duyệt'}</td>


                                                    <td><button onClick={() => this.handlViewHandbook(item)} className='button btn btn-primary mx-2'>Xem chi tiết</button>
                                                        <button onClick={() => this.handOnlcickUpdate(item)} className='button btn btn-warning'>Cập nhật thông tin</button>
                                                    </td>
                                                </tr>

                                            )
                                        })}

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

        )
    }
}
ManageHandBook.contextType = UserContext


export default withRouter(ManageHandBook);
