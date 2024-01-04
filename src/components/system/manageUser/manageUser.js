import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './manageUser.scss'
import ModelUser from './modelUser';
import ModelconfimdeledeUser from './modelDelete';
import Select from 'react-select';
import { deleteUser } from '../../../services/adminService';
import _ from 'lodash';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { feactAllUser, searchUser } from '../../../services/staffService';
import { getAllGroup } from '../../../services/adminService';
class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            search: '',
            listGroup: [],
            selectGroup: {},
            listUser: [],
            currenpage: 1,
            currenlimit: 5,
            totalpage: 0,
            showModel: false,
            showModelUser: false,
            dataModel: {},
            action: 'CREATE'
        }
    }

    handlePageClick = async (event) => {

        let coppystate = { ...this.state }

        coppystate.currenpage = +event.selected + 1
        this.setState({
            ...coppystate
        })


    };
    buildDataSelectGroup = (inputData) => {

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
    async componentDidMount() {
        let { currenpage, currenlimit } = this.state
        let respons = await feactAllUser(currenpage, currenlimit)
        let group = await getAllGroup()
        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listUser = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            coppystate.listGroup = this.buildDataSelectGroup(group.DT)
            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await feactAllUser(currenpage, currenlimit)

            if (respons && respons.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listUser = respons.DT.user
                coppystate.totalpage = respons.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }
    handlUpdatUser = (user) => {

        this.setState({
            dataModel: user,
            action: 'UPDATE',
            showModelUser: true

        })

    }
    onHideModelUser = async () => {
        this.setState({
            showModelUser: false,

            dataModel: {},
            action: 'CREATE'


        })
        let respons = await feactAllUser(this.state.currenpage, this.state.currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listUser = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }

    }
    showModelAddNew = () => {

        this.setState({
            showModelUser: true,
            action: 'CREATE',

        })


    }
    handleClose = () => {
        this.setState({
            showModel: false,
            dataModel: {}
        })



    }
    handlRefesh = () => {
        window.location.reload()
    }
    handlDeletetUser = (data) => {
        this.setState({
            showModel: true,
            dataModel: data
        })
    }
    comfirmDeleteUser = async () => {
        console.log(this.state.dataModel)
        let res = await deleteUser(this.state.dataModel)

        if (res && res.EC === 0) {
            toast.success('delete succes')

            this.setState({
                showModel: false,

            })
        }
        let respons = await feactAllUser(this.state.currenpage, this.state.currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listUser = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
    }
    handOnchaneNameUser = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    Search = async () => {
        let datainput = {
            user: this.state.search,
            group: this.state.selectGroup.value ? this.state.selectGroup.value : 0
        }
        let data = await searchUser(datainput)
        if (data.EC === 0) {
            this.setState({
                listUser: data.DT,
                show: false
            })
        }
    }
    handleChangeGroup = (selectedOption) => {
        this.setState({
            selectGroup: selectedOption
        })
    }
    render() {

        let { listUser } = this.state
        return (
            <>
                <div className='container'>
                    <div className='manage-user-container'>
                        <div className='user-header row'>
                            <div className='tiltle col-12'><h3>Tabble user</h3>
                            </div>
                            <div className='actionform col-12 row'>
                                <div className='col-12'>
                                    <label class="form-label">nhao ten nguoi dung</label>
                                    <input onChange={(event) => this.handOnchaneNameUser(event)} type="text" class="form-control" />
                                </div>
                                <div className='col-4'>
                                    <label>chon group</label>
                                    <Select

                                        placeholder={'CHON gara'}
                                        value={this.state.selectGroup}
                                        onChange={this.handleChangeGroup}
                                        options={this.state.listGroup}

                                    />
                                </div>
                                <div>    <button onClick={() => this.Search()} className='btn btn-primary position-relative top-50 start-50 translate-middle my-3'>tim kiem</button>
                                </div>






                            </div>
                            <div className='action'>
                                <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3 '>refesh <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
                                <button onClick={() => this.showModelAddNew()} className='btn btn-success'>Add New user <span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                            </div>
                        </div>
                        <div className='user-body'>
                            <table className="table table-hover table-bordered my-3">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">USER NAME</th>
                                        <th scope="col">EMAIL</th>
                                        <th scope="col">GROUP</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUser && listUser.length > 0 ?
                                        <>
                                            {
                                                listUser.map((item, index) => {
                                                    return (
                                                        <tr key={`row-${index}`}>

                                                            <td>{item.id}</td>
                                                            <td>{item.userName}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.groupData ? item.groupData.name : ''}</td>
                                                            <td><button onClick={() => this.handlUpdatUser(item)} className='btn btn-primary'>update</button>
                                                                <button onClick={() => this.handlDeletetUser(item)} className='btn btn-danger'>delete</button></td>
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

                    </div >
                </div >
                <ModelUser
                    onHide={this.onHideModelUser}
                    show={this.state.showModelUser}
                    action={this.state.action}
                    dataModel={this.state.dataModel}
                />
                <ModelconfimdeledeUser
                    show={this.state.showModel}
                    handleClose={this.handleClose}
                    comfirmDeleteUser={this.comfirmDeleteUser}
                    dataModel={this.state.dataModel}
                />


            </>
        )
    }

}



export default ManageUser;
