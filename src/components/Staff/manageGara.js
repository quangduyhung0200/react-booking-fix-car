import React, { Component } from 'react';

import { toast } from 'react-toastify';

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from "../../context/userContext"
import ReactPaginate from 'react-paginate';
import { feactAllGara, readHanndBook } from '../../services/staffService';
import { Buffer } from 'buffer';
import { getAllGarabyPageStaff } from '../../services/staffService';
import ModelconfimdeledeGara from '../system/manageGara/modelDelete';
import { deleteGara } from '../../services/adminService';
class ManageGaraStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {


            listGara: [],
            currenpage: 1,
            currenlimit: 5,
            totalpage: 0,
            groupId: "",
            dataModel: {},
            isShowModel: false


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
        let data = await getAllGarabyPageStaff(this.state.currenpage, this.state.currenlimit)
        if (data && data.EC === 0) {
            let groupId = this.context.user.account.role[0].id
            let coppystate = { ...this.state }
            coppystate.listGara = data.DT.user
            coppystate.totalpage = data.DT.totalPage
            coppystate.groupId = groupId
            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let data = await getAllGarabyPageStaff(this.state.currenpage, this.state.currenlimit)
            if (data && data.EC === 0) {
                let coppystate = { ...this.state }
                coppystate.listGara = data.DT.user
                coppystate.totalpage = data.DT.totalPage
                this.setState({
                    ...coppystate
                })

            }
        }
    }
    handOnlcickUpdate = (item) => {
        this.props.history.push(`/UpadateGara/${item.id}`)

    }

    handOnlcickView = (item) => {
        this.props.history.push(`/detailGara/${item.id}`)
    }
    handOnlcickDelete = (item) => {
        this.setState({
            dataModel: item,
            isShowModel: true
        })
    }
    handleClose = () => {
        this.setState({
            dataModel: {},
            isShowModel: false
        })



    }
    comfirmDeleteUser = async () => {

        let res = await deleteGara(this.state.dataModel)

        if (res && res.EC === 0) {
            toast.success('delete succes')

            this.setState({
                isShowModel: false,

            })
        }

        let data = await getAllGarabyPageStaff(this.state.currenpage, this.state.currenlimit)
        if (data && data.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listGara = data.DT.user
            coppystate.totalpage = data.DT.totalPage
            this.setState({
                ...coppystate
            })

        }

    }
    render() {

        let { listGara, groupId } = this.state
        return (
            <>
                <div className='manage-patient-container container'>
                    <div className='m-p-title'>
                        gara
                    </div>
                    <div className='m-p-body row'>

                        <div className='col-12'>
                            <table className="table-patient table table-hover table-bordered my-3">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">gara NAME</th>
                                        <th scope="col">description</th>
                                        <th scope="col">trang thai</th>
                                        <th scope="col">sodien thaoi</th>
                                        <th scope="col">dia chi</th>
                                        <th scope="col">action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listGara && listGara.length > 0 &&
                                        listGara.map((item, index) => {



                                            return (
                                                <tr key={`child-${index}`}>

                                                    <td>{item.id}</td>
                                                    <td>{item.nameGara}</td>
                                                    <td>{item.description}</td>



                                                    <td>{item.status === 'S1' ? 'gara dang duoc phe duyet' : 'gara da duoc phe duyet'}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.address}, Tỉnh: {item.provindGaraData.name}</td>


                                                    <td><button onClick={() => this.handOnlcickView(item)} className='button btn btn-primary'>view</button>
                                                        <button onClick={() => this.handOnlcickUpdate(item)} className='button btn btn-warning'>update</button>
                                                        {groupId === 4 && <button onClick={() => this.handOnlcickDelete(item)} className='button btn btn-warning'>delete</button>}
                                                    </td>
                                                </tr>

                                            )
                                        })}

                                </tbody>
                            </table>
                        </div>
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
                <ModelconfimdeledeGara
                    show={this.state.isShowModel}
                    handleClose={this.handleClose}
                    comfirmDeleteUser={this.comfirmDeleteUser}
                    dataModel={this.state.dataModel} />


            </>

        )
    }
}
ManageGaraStaff.contextType = UserContext


export default withRouter(ManageGaraStaff);
