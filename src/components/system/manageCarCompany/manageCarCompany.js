import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import ReactPaginate from 'react-paginate';

import { Buffer } from "buffer";
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { getAllProvind } from '../../../services/guestService';
import { getCarCompanyByPage } from '../../../services/adminService';
import ModelCarCompany from './modelCarCompany';
import ModelconfimdeledeCarCompany from './modelDelete';
import { deleteCarCompany } from '../../../services/adminService';
import { toast } from 'react-toastify';
import { searchCarCompany } from '../../../services/staffService';
class ManageCarCompany extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            search: '',

            listCarCompany: [],
            currenpage: 1,
            currenlimit: 5,
            totalpage: 0,
            showModel: false,
            showModelUser: false,
            dataModel: {},
            action: 'CREATE'


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
        let respons = await getCarCompanyByPage(currenpage, currenlimit)
        let provind = await getAllProvind()
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listCarCompany = respons.DT.user
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
            let respons = await getCarCompanyByPage(currenpage, currenlimit)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listCarCompany = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }

    handlViewuUdate = (item) => {

        this.setState({
            dataModel: item,
            action: 'UPDATE',
            showModelUser: true

        })

    }
    handlViewDelete = (item) => {
        this.setState({
            showModel: true,
            dataModel: item
        })
    }
    handleChangeProvind = async (selectedOption) => {
        this.setState({
            selectProvind: selectedOption
        })
    }
    handOnchaneCarcompanyName = async (event) => {
        this.setState({
            search: event.target.value
        })
    }
    Search = async () => {
        let datainput = {
            carcompany: this.state.search,

        }
        console.log(datainput)
        let data = await searchCarCompany(datainput)
        if (data.EC === 0) {
            this.setState({
                listCarCompany: data.DT,
                show: false
            })
        }
    }
    handlRefesh = () => {
        window.location.reload()
    }
    showModelAddNew = () => {

        this.setState({
            showModelUser: true,
            action: 'CREATE',

        })


    }
    onHideModelUser = async () => {
        this.setState({
            showModelUser: false,
            show: true,
            dataModel: {},
            action: 'CREATE'


        })
        let { currenpage, currenlimit } = this.state
        let respons = await getCarCompanyByPage(currenpage, currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listCarCompany = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }

    }
    handleClose = () => {
        this.setState({
            showModel: false,
            dataModel: {}
        })



    }
    comfirmDeleteUser = async () => {
        console.log(this.state.dataModel)

        let res = await deleteCarCompany(this.state.dataModel)

        if (res && res.EC === 0) {
            toast.success('delete succes')

            this.setState({
                showModel: false,

            })
        }
        let { currenpage, currenlimit } = this.state
        let respons = await getCarCompanyByPage(currenpage, currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listCarCompany = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
    }
    render() {

        let { listCarCompany } = this.state

        return (
            <>
                <>
                    <div className='manage-patient-container container'>
                        <div className='m-p-title'>
                            gara
                        </div>
                        <div className='tiltle col-12'><h3>Tabble user</h3>
                        </div>
                        <div className='actionform col-12 row'>
                            <div className='col-12'>
                                <label class="form-label">nhao ten cong ty</label>
                                <input onChange={(event) => this.handOnchaneCarcompanyName(event)} type="text" class="form-control" />
                            </div>

                            <div>    <button onClick={() => this.Search()} className='btn btn-primary position-relative top-50 start-50 translate-middle my-3'>tim kiem</button>
                            </div>






                        </div>
                        <div className='action'>
                            <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3 '>refesh <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
                            <button onClick={() => this.showModelAddNew()} className='btn btn-success'>Add New user <span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                        </div>
                        <div className='m-p-body row'>

                            <div className='col-12'>
                                <table className="table-patient table table-hover table-bordered my-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">carcompany NAME</th>
                                            <th scope="col">description</th>

                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listCarCompany && listCarCompany.length > 0 ?
                                            <>
                                                {
                                                    listCarCompany.map((item, index) => {


                                                        return (
                                                            <tr key={`row-${index}`}>

                                                                <td>{item.id}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.description}</td>



                                                                <td><button onClick={() => this.handlViewuUdate(item)} className='button btn btn-primary'>update</button>
                                                                    <button onClick={() => this.handlViewDelete(item)} className='button btn btn-warning'>delete</button>

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

                <ModelCarCompany
                    onHide={this.onHideModelUser}
                    show={this.state.showModelUser}
                    action={this.state.action}
                    dataModel={this.state.dataModel}
                />
                <ModelconfimdeledeCarCompany
                    show={this.state.showModel}
                    handleClose={this.handleClose}
                    comfirmDeleteUser={this.comfirmDeleteUser}
                    dataModel={this.state.dataModel}
                />
            </>
        )
    }

}



export default withRouter(ManageCarCompany);
