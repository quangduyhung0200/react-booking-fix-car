import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

import ReactPaginate from 'react-paginate';
import { readHanndBook } from '../../../services/staffService';
import { Buffer } from "buffer";
import { withRouter } from 'react-router-dom';
class ManageGaraHandBookHasNotPass extends Component {

    constructor(props) {
        super(props);
        this.state = {

            listHandBook: [],
            currenpage: 1,
            currenlimit: 1,
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
        let { currenpage, currenlimit } = this.state
        let respons = await readHanndBook(currenpage, currenlimit, 'ALL')

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listHandBook = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await readHanndBook(currenpage, currenlimit, 'ALL')

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

        this.props.history.push(`/checkdetailHandBook/${item.id}`)

    }
    render() {

        let { listHandBook } = this.state

        return (
            <>
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
                                                                <td>{item.staffId}</td>
                                                                <td>{s}</td>





                                                                <td><button onClick={() => this.handlViewDetailHandBook(item)} className='button btn btn-primary'>view</button>
                                                                    <button className='button btn btn-primary'>accep</button>
                                                                    <button className='button btn btn-danger'>denice</button></td>
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


            </>
        )
    }

}



export default withRouter(ManageGaraHandBookHasNotPass);
