import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './manageCar.scss'
import { Buffer } from 'buffer';

import CreateCar from './CreateCarModel';
import Modelconfimdelede from './modelConfimDelete';
import _ from 'lodash';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { feactAllCar, deleteCar } from '../../../services/userService';
class ManageCar extends Component {

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
    handlDeleteuser = async (user) => {
        console.log(user)
        this.setState({
            showModel: true,
            dataModel: user
        })





    }
    onHideModelUser = async () => {
        this.setState({
            showModelUser: false,
            dataModel: {},
            action: 'CREATE'


        })
        let respons = await feactAllCar(this.state.currenpage, this.state.currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listUser = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

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
        let respons = await feactAllCar(currenpage, currenlimit)

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
            let respons = await feactAllCar(currenpage, currenlimit)

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
    SetShowmodelUser = () => {

        this.setState({
            showModelUser: true,
            action: 'CREATE',

        })


    }
    handlUpdatUser = (car) => {
        console.log(car)
        this.setState({
            dataModel: car,
            action: 'UPDATE',
            showModelUser: true

        })

    }
    handleClose = () => {
        this.setState({
            showModel: false,
            dataModel: {}
        })



    }
    comfirmDeleteUser = async () => {
        let res = await deleteCar(this.state.dataModel)
        console.log(res)
        if (res && res.EC === 0) {
            toast.success('delete succes')

            this.setState({
                showModel: false,

            })
        }
        let respons = await feactAllCar(this.state.currenpage, this.state.currenlimit)

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
                <div className='container'><div className='manage-user-container'>
                    <div className='user-header'>
                        <div className='tiltle'><h3>Tabble user</h3>
                        </div>
                        <div className='action'>
                            <button className='btn btn-primary mx-3'>refesh <span><i className="fa fa-refresh" aria-hidden="true"></i></span></button>
                            <button onClick={() => { this.SetShowmodelUser() }} className='btn btn-success'>Add New user <span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className="table table-hover table-bordered my-3">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">car NAME</th>
                                    <th scope="col">hang xe</th>
                                    <th scope="col">mo ta</th>
                                    <th scope="col">avata</th>
                                    <th scope="col">action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {listUser && listUser.length > 0 ?
                                    <>
                                        {
                                            listUser.map((item, index) => {
                                                let imageBase64 = ''
                                                if (item.avata) {

                                                    imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                                }
                                                return (
                                                    <tr key={`row-${index}`}>

                                                        <td>{item.id}</td>
                                                        <td>{item.nameCar}</td>
                                                        <td>{item.carCompanyData.name}</td>
                                                        <td>{item.descriptions}</td>
                                                        <td style={{
                                                            backgroundImage: `url(${imageBase64})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat'

                                                        }}></td>
                                                        <td><button onClick={() => this.handlUpdatUser(item)} className='btn btn-primary'>update</button>
                                                            <button onClick={() => this.handlDeleteuser(item)} className='btn btn-danger'>delete</button></td>
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

                <CreateCar titile={'crete new user'}
                    onHide={this.onHideModelUser}
                    show={this.state.showModelUser}
                    action={this.state.action}
                    dataModel={this.state.dataModel} />

                <Modelconfimdelede
                    show={this.state.showModel}
                    handleClose={this.handleClose}
                    comfirmDeleteUser={this.comfirmDeleteUser}
                    dataModel={this.state.dataModel}
                />

            </>
        )
    }

}



export default ManageCar;
