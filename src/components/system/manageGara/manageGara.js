import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './manageGara.scss'
import ReactPaginate from 'react-paginate';
import { feactAllGara } from '../../../services/userService';
import { Buffer } from "buffer";
import { withRouter } from 'react-router-dom';
class ManageGara extends Component {

    constructor(props) {
        super(props);
        this.state = {

            listGara: [],
            currenpage: 1,
            currenlimit: 5,
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


    };
    async componentDidMount() {
        let { currenpage, currenlimit } = this.state
        let respons = await feactAllGara(currenpage, currenlimit)

        if (respons && respons.EC === 0) {
            let coppystate = { ...this.state }
            coppystate.listGara = respons.DT.user
            coppystate.totalpage = respons.DT.totalPage
            this.setState({
                ...coppystate
            })

        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currenpage !== this.state.currenpage) {
            let { currenpage, currenlimit } = this.state
            let respons = await feactAllGara(currenpage, currenlimit)

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
    handlViewDetailGara = (item) => {

        this.props.history.push(`/detailGara/${item.userGara.id}`)

    }
    render() {

        let { listGara } = this.state
        console.log(listGara)
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
                                            <th scope="col">gara NAME</th>
                                            <th scope="col">address</th>
                                            <th scope="col">provindId</th>

                                            <th scope="col">phone</th>
                                            <th scope="col">description</th>
                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listGara && listGara.length > 0 ?
                                            <>
                                                {
                                                    listGara.map((item, index) => {


                                                        return (
                                                            <tr key={`row-${index}`}>

                                                                <td>{item.userGara.id}</td>
                                                                <td>{item.userGara.nameGara}</td>
                                                                <td>{item.userGara.address}</td>
                                                                <td>{item.userGara.provindGaraData.name}</td>

                                                                <td>{item.userGara.phone}</td>
                                                                <td>{item.userGara.description}</td>


                                                                <td><button onClick={() => this.handlViewDetailGara(item)} className='button btn btn-primary'>view</button>
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



export default withRouter(ManageGara);
