import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './manageCar.scss'




import _ from 'lodash';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { feactAllUser } from '../../../services/userService';
class ManageCar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUser: [],
            currenpage: 1,
            currenlimit: 2,
            totalpage: 0,
            showModel: false,
            showModelUser: false,
            dataModel: {}
        }
    }

    handlePageClick = async (event) => {

        let coppystate = { ...this.state }

        coppystate.currenpage = +event.selected + 1
        this.setState({
            ...coppystate
        })
        console.log(this.state.currenpage)

    };
    async componentDidMount() {
        let { currenpage, currenlimit } = this.state
        let respons = await feactAllUser(currenpage, currenlimit)
        console.log('all user: ', respons)
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
            console.log('all user: ', respons)
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
                            <button className='btn btn-success'>Add New user <span><i className="fa fa-plus" aria-hidden="true"></i></span></button>
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
                                                        <td><button className='btn btn-primary'>update</button>
                                                            <button className='btn btn-danger'>delete</button></td>
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


            </>
        )
    }

}



export default ManageCar;
