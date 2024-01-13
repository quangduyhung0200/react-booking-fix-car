import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ReactPaginate from 'react-paginate';
import './manageCarcompany.scss'
import { withRouter } from 'react-router-dom';
import { getAllProvind } from '../../../services/guestService';
import { getCarCompanyByPage, deleteCarCompany } from '../../../services/adminService';
import ModelCarCompany from './modelCarCompany';
import ModelconfimdeledeCarCompany from './modelDelete';
import { toast } from 'react-toastify';
import { searchCarCompany } from '../../../services/staffService';
import { UserContext } from '../../../context/userContext';
import { getUserById } from '../../../services/userService';
import HomeFooter from '../../home/homeFooter/homeFooter';
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
            action: 'CREATE',
            group: ''


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
        let res = await getUserById(this.context.user.account.id)
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listCarCompany = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            coppystate.listProvind = this.buildDataSelectProvind(provind.DT)
            coppystate.group = res.DT.groupId


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

        let { listCarCompany, group } = this.state

        return (
            <>
                <>
                    <div className='manage-carcompany-container container'>
                        <div className='m-p-title'>
                            <div className='tiltle col-12'><h3>Quản lý công ty xe</h3>
                            </div>
                            <hr></hr>
                            <div className='actionform col-12 row'>
                                <div className='col-6'>
                                    <label class="fw-bold">Nhập tên công ty</label>
                                    <input onChange={(event) => this.handOnchaneCarcompanyName(event)} type="text" class="form-control" />
                                </div>

                                <div className='col-6'>
                                    <button onClick={() => this.Search()} className='btn btn-primary button btn btn-primary mt-4 '>Tìm kiếm</button>
                                </div>






                            </div>
                            <hr></hr>
                            <div className='action'>
                                <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3 '>Làm mới trang <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
                                <button onClick={() => this.showModelAddNew()} className='btn btn-success'>Thềm công ty mới<span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                            </div>
                        </div>

                        <div className='m-p-body row'>

                            <div className='col-12'>
                                <table className="table-patient table table-hover table-bordered my-3 table-primary">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Tên công ty</th>
                                            <th scope="col">Thông tin chi tiết</th>

                                            <th scope="col">Action</th>
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



                                                                <td><button onClick={() => this.handlViewuUdate(item)} className='button btn btn-primary mx-2'>Cập nhật thông tin</button>
                                                                    {group && group === 4 && <button onClick={() => this.handlViewDelete(item)} className='button btn btn-warning'>Xóa công ty</button>}

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
                <HomeFooter />
            </>
        )
    }

}
ManageCarCompany.contextType = UserContext


export default withRouter(ManageCarCompany);
