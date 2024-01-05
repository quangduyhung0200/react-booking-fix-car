import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import ReactPaginate from 'react-paginate';
import { readHanndBook } from '../../../services/staffService';
import { Buffer } from "buffer";
import { withRouter } from 'react-router-dom';
import ModelconfimdeledeHandbook from './modelDeleteHandBook';
import { deleteHandbook } from '../../../services/adminService';
import { toast } from 'react-toastify';
import { getAllHandbook } from '../../../services/adminService';
import { getAllStaff, searchHandbook } from '../../../services/adminService';
import Select from 'react-select';
class ManageHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            listStaff: [],
            selectStaff: {},
            search: '',
            listHandBook: [],
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
        let respons = await getAllHandbook(currenpage, currenlimit)
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
            let respons = await getAllHandbook(currenpage, currenlimit)

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

        this.props.history.push(`/detailHandbook/${item.id}`)

    }
    handClickUpdate = (item) => {
        this.props.history.push(`/updateHandbook/${item.id}`)
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
        let res = await deleteHandbook(this.state.dataModel)

        if (res && res.EC === 0) {
            toast.success('delete succes')

            this.setState({
                showModel: false,

            })
        }
        let { currenpage, currenlimit } = this.state
        let respons = await getAllHandbook(currenpage, currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listHandBook = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
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
        console.log(datainput)
        let data = await searchHandbook(datainput)
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
                <>
                    <div className='manage-patient-container container'>
                        <div className='user-header'>
                            <div className='tiltle'><h3>Tabble handbook</h3>
                            </div>
                            <div className='action'>
                                <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3'>refesh <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
                                <button onClick={() => this.showModelAddNew()} className='btn btn-success'>Add New handbook <span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                            </div>
                        </div>
                        <div className='actionform col-12 row'>
                            <div className='col-12'>
                                <label class="form-label">nhao ten nhan vien</label>
                                <input onChange={(event) => this.handOnchaneTitle(event)} type="text" class="form-control" />
                            </div>
                            <div className='col-4'>
                                <label>chon cong ty</label>
                                <Select

                                    placeholder={'CHON gara'}
                                    value={this.state.selectStaff}
                                    onChange={this.handleChangeStaff}
                                    options={this.state.listStaff}

                                />
                            </div>
                            <div>    <button onClick={() => this.Search()} className='btn btn-primary position-relative top-50 start-50 translate-middle my-3'>tim kiem</button>
                            </div>






                        </div>
                        <div className='m-p-body row'>

                            <div className='col-12'>
                                <table className="table-patient table table-hover table-bordered my-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">handbook tile </th>

                                            <th scope="col">staffId</th>

                                            <th scope="col">ngay viet</th>

                                            <th scope="col">action</th>
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





                                                                <td><button onClick={() => this.handlViewDetailHandBook(item)} className='button btn btn-primary'>view</button>
                                                                    <button onClick={() => this.handClickUpdate(item)} className='button btn btn-primary'>update</button>
                                                                    <button onClick={() => this.handOnclickDelete(item)} className='button btn btn-danger'>delete</button></td>
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
                    <ModelconfimdeledeHandbook
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



export default withRouter(ManageHandbook);
