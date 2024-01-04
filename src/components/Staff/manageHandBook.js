import React, { Component } from 'react';

import { toast } from 'react-toastify';

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from "../../context/userContext"
import ReactPaginate from 'react-paginate';
import { readHanndBook } from '../../services/staffService';
import { Buffer } from 'buffer';

class ManageHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {


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
        if (data && data.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listHandBook = data.DT.user
            coppystate.totalpage = data.DT.totalPage
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
    render() {

        let { listHandBook } = this.state
        return (
            <>
                <div className='manage-patient-container container'>
                    <div className='m-p-title'>
                        gara
                    </div>
                    <div className='m-p-body row'>
                        <button onClick={() => this.handOnclickAddnewHandBook()} className='button btn btn-danger'>create</button>
                        <div className='col-12'>
                            <table className="table-patient table table-hover table-bordered my-3">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">USER NAME</th>
                                        <th scope="col">title</th>
                                        <th scope="col">ngay viet</th>
                                        <th scope="col">trang thai</th>
                                        <th scope="col">action</th>
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
                                                    <td>{item.StaffHandbookData.userName}</td>
                                                    <td>{item.title}</td>



                                                    <td>{s}</td>
                                                    <td>{item.status === 'S1' ? 'cam nang dang duoc phe duyet' : 'cam nang da duoc phe duyet'}</td>


                                                    <td><button onClick={() => this.handlViewHandbook(item)} className='button btn btn-primary'>view</button>
                                                        <button onClick={() => this.handOnlcickUpdate(item)} className='button btn btn-warning'>update</button>
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

            </>

        )
    }
}
ManageHandBook.contextType = UserContext


export default withRouter(ManageHandBook);
