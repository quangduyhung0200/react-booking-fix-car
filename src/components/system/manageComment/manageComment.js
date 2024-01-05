import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './manageComment.scss'
import ReactPaginate from 'react-paginate';
import { readHanndBook } from '../../../services/staffService';
import { Buffer } from "buffer";
import { withRouter } from 'react-router-dom';
// import ModelconfimdeledeHandbook from './modelDeleteHandBook';
import { deleteHandbook } from '../../../services/adminService';
import { toast } from 'react-toastify';
import { getAllHandbook } from '../../../services/adminService';
import { getAllStaff, searchHandbook } from '../../../services/adminService';
import Select from 'react-select';
import { getAllCommentbypage } from '../../../services/staffService';
import ManageCommeModelconfimdeledeComment from './modelDeleteComment';
import { deleteComment } from '../../../services/adminService';
import { getAllGara } from '../../../services/guestService';
import { feactAllUser } from '../../../services/staffService';
import { searchComment } from '../../../services/staffService';
class ManageComment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            listComment: [],

            listGara: [],
            selectGara: {},
            listUser: [],
            selectUser: {},
            listRate: [],
            selectRate: {},



            currenpage: 1,
            currenlimit: 5,
            totalpage: 0,
            isShowModel: false,
            dataModel: {}


        }
    }
    showModelAddNew = () => {

        this.props.history.push(`/addNewHandBook`)

    }
    handlePageClick = async (event) => {

        let coppystate = { ...this.state }

        coppystate.currenpage = +event.selected + 1
        this.setState({
            ...coppystate
        })


    };
    buildDataSelectGara = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.nameGara
                obj.value = item.id
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectUser = (inputData) => {

        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};


                obj.label = item.username
                obj.value = item.id
                resuf.push(obj);

            })


        }

        return resuf
    }
    buildDataSelectRate = () => {

        let resuf = [{ label: 1, value: 1 },
        { label: 2, value: 2 },
        { label: 3, value: 3 },
        { label: 4, value: 4 },
        { label: 5, value: 5 },]


        return resuf
    }

    async componentDidMount() {
        let { currenpage, currenlimit } = this.state
        let respons = await getAllCommentbypage(currenpage, currenlimit)
        let gara = await getAllGara()
        let user = await feactAllUser('ALL')
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listComment = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            coppystate.listGara = this.buildDataSelectGara(gara.DT)
            coppystate.listUser = this.buildDataSelectUser(user.DT)
            coppystate.listRate = this.buildDataSelectRate()
            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await getAllCommentbypage(currenpage, currenlimit)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listComment = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }
    handlViewDetailComment = (item) => {
        console.log(item)

        this.props.history.push(`/detailGara/${item.GaraComment.id}`)

    }

    handOnclickDelete = (item) => {
        this.setState({
            isShowModel: true,
            dataModel: item
        })
    }
    handleClose = () => {
        this.setState({
            isShowModel: false,
            dataModel: {}
        })
    }
    comfirmDeleteUser = async () => {

        console.log(this.state.dataModel)
        let datainput = {
            id: this.state.dataModel.id,
            garaId: this.state.dataModel.GaraComment.id
        }
        let res = await deleteComment(datainput)

        if (res && res.EC === 0) {
            toast.success('delete succes')

            this.setState({
                showModel: false,

            })
        }
        let { currenpage, currenlimit } = this.state
        let respons = await getAllCommentbypage(currenpage, currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listComment = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
    }
    handleChangeGara = (selectedOption) => {
        this.setState({
            selectGara: selectedOption
        })
    }
    handleChangeUser = (selectedOption) => {
        this.setState({
            selectUser: selectedOption
        })
    }
    handleChangeRate = (selectedOption) => {
        this.setState({
            selectRate: selectedOption
        })
    }
    handOnchaneTitle = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    Search = async () => {
        console.log(this.state)

        let datainput = {

            gara: this.state.selectGara.value ? this.state.selectGara.value : 0,
            user: this.state.selectUser.value ? this.state.selectUser.value : 0,
            rate: this.state.selectRate.value ? this.state.selectRate.value : 0,
        }
        console.log(datainput)
        let data = await searchComment(datainput)
        if (data.EC === 0) {
            this.setState({
                listComment: data.DT,
                show: false
            })
        }


    }
    handlRefesh = () => {
        window.location.reload()
    }
    render() {

        let { listComment } = this.state
        console.log(this.state)
        return (
            <>
                <>
                    <div className='manage-comment-container container'>
                        <div className='comment-header'>
                            <div className='tiltle'><h3>Quản lý đánh giá người dùng</h3>
                            </div>
                            <hr></hr>
                            <div className='search col-12 row'>

                                <div className='col-3'>
                                    <label className='fw-bold'>Chọn gara</label>
                                    <Select
                                        value={this.state.selectGara}
                                        onChange={this.handleChangeGara}
                                        options={this.state.listGara}

                                    />

                                </div>
                                <div className='col-3'>
                                    <label className='fw-bold'>Chọn người dùng</label>
                                    <Select


                                        value={this.state.selectUser}
                                        onChange={this.handleChangeUser}
                                        options={this.state.listUser}

                                    />

                                </div>
                                <div className='col-3'>
                                    <label className='fw-bold'>Chọn số sao</label>
                                    <Select

                                        placeholder={'CHON gara'}
                                        value={this.state.selectRate}
                                        onChange={this.handleChangeRate}
                                        options={this.state.listRate}

                                    />

                                </div >
                                <div className='col-3'>
                                    <button onClick={() => this.Search()} className='btn btn-primary button btn btn-primary mt-4'>tim kiem</button>
                                </div>
                                <hr></hr>

                                <div className='action'>
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
                                            <th scope="col">Người đánh giá</th>

                                            <th scope="col">Tên gara</th>

                                            <th scope="col">Nội dung</th>
                                            <th scope="col">Số sao đánh giá</th>

                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listComment && listComment.length > 0 ?
                                            <>
                                                {
                                                    listComment.map((item, index) => {




                                                        return (
                                                            <tr key={`row-${index}`}>

                                                                <td>{item.id}</td>
                                                                <td>{item.UserComment.userName}</td>
                                                                <td>{item.GaraComment.nameGara}</td>
                                                                <td>{item.comment}</td>
                                                                <td className='text-center'>{item.rate} sao</td>






                                                                <td><button onClick={() => this.handlViewDetailComment(item)} className='button btn btn-primary mx-2'>Xem chi tiết</button>

                                                                    <button onClick={() => this.handOnclickDelete(item)} className='button btn btn-danger'>Xóa bài viết</button></td>
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


                    <ManageCommeModelconfimdeledeComment
                        show={this.state.isShowModel}
                        handleClose={this.handleClose}
                        comfirmDeleteUser={this.comfirmDeleteUser}
                        dataModel={this.state.dataModel}
                    />

                </>


            </>
        )
    }

}



export default withRouter(ManageComment);
