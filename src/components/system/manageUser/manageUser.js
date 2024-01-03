import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './manageUser.scss'
import ModelUser from './modelUser';
import ModelconfimdeledeUser from './modelDelete';

import { deleteUser } from '../../../services/adminService';
import _ from 'lodash';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { feactAllUser } from '../../../services/staffService';
class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
    async componentDidMount() {
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
    render() {

        let { listUser } = this.state
        return (
            <>
                <div className='container'>
                    <div className='manage-user-container'>
                        <div className='user-header'>
                            <div className='tiltle'><h3>Tabble user</h3>
                            </div>
                            <div className='action'>
                                <button onClick={() => this.handlRefesh()} className='btn btn-primary mx-3'>refesh <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
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
                            <ReactPaginate
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



                        </div>

                    </div>
                </div>
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
