import React, { Component } from 'react';

import { Buffer } from "buffer";
import { getHandBookById, accepHandBook } from '../../../services/adminService';
import './detaiHandBook.scss'
import { UserContext } from "../../../context/userContext"
import { accepGara } from '../../../services/staffService';
import { toast } from 'react-toastify';
import Carousel from 'react-multi-carousel';
import { withRouter } from 'react-router-dom';
import { getTopHandBook, getTopHandBookRelateto } from '../../../services/guestService';
import ProfileGara from '../gara/garaProfile';
import GaraSchedule from "./../../customer/gara/schedule.js"
import HomeFooter from '../../home/homeFooter/homeFooter.js';
class DetailHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currenHandBookId: '',
            dataModelProfile: {},

            title: '',

            garaId: '',
            avata: '',
            descriptionHTML: '',
            handbookId: '',
            createdAt: '',
            staffName: '',
            listHandBook: [],
            isGaraDelete: false

        }
    }
    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {

            let id = this.props.match.params.id;
            this.setState({
                currenHandBookId: id
            })

            let data = await getHandBookById(id)
            if (data.EC === 1) {
                toast.error('Bài viết không tồn tại')
                this.props.history.push('/')
            }
            else {
                if (data.DT.status === 'S1') {
                    toast.error('Bài viết không tồn tại')
                    this.props.history.push('/')
                }
                else {
                    let imageBase64 = ''
                    if (data.DT.avata.data) {

                        imageBase64 = new Buffer(data.DT.avata.data, 'base64').toString('binary')
                    }
                    let coppyState = { ...this.state }

                    coppyState.createdAt = data.DT.createdAt
                    coppyState.title = data.DT.title
                    if (data.DT.GaraHandBook.id === null) {
                        coppyState.garaId = 0
                    } else if (data.DT.GaraHandBook.isDelete === '0') {
                        coppyState.garaId = data.DT.GaraHandBook.id
                    }
                    else if (data.DT.GaraHandBook.isDelete === '1') {
                        coppyState.isGaraDelete = true
                    }
                    if (data.DT.GaraHandBook.status === 'S1') {
                        coppyState.isGaraDelete = true
                    }


                    coppyState.avata = imageBase64
                    coppyState.descriptionHTML = data.DT.contentHTML
                    coppyState.handbookId = data.DT.id
                    coppyState.staffName = data.DT.StaffHandbookData.userName

                    this.setState({
                        ...coppyState
                    })
                    let res = await getTopHandBookRelateto(5, this.props.match.params.id)
                    if (res.EC === 0) {
                        this.setState({
                            listHandBook: res.DT
                        })
                    }
                }

            }

        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevState.currenHandBookId !== this.state.currenHandBookId) {
        //     let id = this.props.match.params.id;

        //     this.setState({
        //         currenHandBookId: id
        //     })

        //     let data = await getHandBookById(id)
        //     console.log(data)
        //     let imageBase64 = ''
        //     if (data.DT.avata.data) {

        //         imageBase64 = new Buffer(data.DT.avata.data, 'base64').toString('binary')
        //     }
        //     let coppyState = { ...this.state }

        //     coppyState.createdAt = data.DT.createdAt
        //     coppyState.title = data.DT.title
        //     if (data.DT.GaraHandBook.id === null) {
        //         coppyState.garaId = 0
        //     } else {
        //         coppyState.garaId = data.DT.GaraHandBook.id
        //     }


        //     coppyState.avata = imageBase64
        //     coppyState.descriptionHTML = data.DT.contentHTML
        //     coppyState.handbookId = data.DT.id
        //     coppyState.staffName = data.DT.StaffHandbookData.userName

        //     this.setState({
        //         ...coppyState
        //     })

        // }
        // let res = await getTopHandBookRelateto(5, this.props.match.params.id)
        // if (res.EC === 0) {
        //     this.setState({
        //         listHandBook: res.DT
        //     })
        // }


    }

    handlOnclickHandBook = (item) => {

        this.props.history.push(`/detailHandbook/${item.id}`)
        window.location.reload()
    }
    handClickMoreinfo = () => {
        this.props.history.push(`/allHandBook`)
    }

    render() {



        let str = this.state.createdAt;
        let endDate = Date.parse(str);
        let s = new Date(endDate).toLocaleDateString("vi")
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 1// optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 1 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };
        let { listHandBook, garaId, isGaraDelete } = this.state
        console.log(garaId)
        return (
            <>

                <div className='HandBook-Detail-Container container'>
                    <div className='row'>
                        <div className='introduction col-12 row my-2'>
                            <div className='box-avata  col-md-6 col-12'>
                                <div className='avata' style={{ backgroundImage: `url(${this.state.avata ? this.state.avata : ''})` }}>

                                </div>


                            </div>
                            <div className='title col-md-6 col-12'>
                                <h3 className=' text-uppercase  up col-12 px-2'>
                                    {this.state.title}
                                </h3>
                                <div className='up col-12'>
                                    <p className='fw-light'>Tác giả: {this.state.staffName}</p>

                                </div>

                                <div className='down col-12'>
                                    <p className='fst-italic'>Ngày viết: {s}</p>
                                </div>
                            </div>
                        </div>



                    </div>

                </div >
                <div className='body-container container'>
                    <div className='body col-12 my-3 '>
                        {this.state.descriptionHTML &&
                            < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                    </div>
                </div>

                <div className='gara container'>
                    {(garaId && garaId !== 0 && isGaraDelete === false) ? <>
                        <div className='gara-with-handbook col-12 row m-y-5' >
                            <h3 className='pt-2'>Đặt lịch tại gara ngay </h3>
                            <hr></hr>
                            <div className='col-6'>        <ProfileGara dataModelProfile={this.state.garaId} /></div>
                            <div className='col-6'>        <GaraSchedule garaId={this.state.garaId} /></div>

                        </div>
                    </> :
                        <><div className='gara-with-handbook col-12'>
                            <hr></hr>

                        </div></>

                    }


                </div>

                <div className='handbook-new container'>
                    <div className='session-header'>
                        <h3 className='content-left'>Một số bài viết liên quan</h3>
                        <div className='content-right'> <button onClick={() => this.handClickMoreinfo()} className='btn btn-warning'>Xem thêm</button></div>
                    </div>
                    <div className='session-content'>
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            showDots={true}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={false}
                            autoPlay={false}
                            autoPlaySpeed={5000}


                            transitionDuration={2}
                            containerClass="carousel-container"


                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            {listHandBook && listHandBook.length > 0 &&
                                listHandBook.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.avata) {

                                        imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                    }
                                    let date = item.createdAt;
                                    let datecreate1 = Date.parse(date);
                                    let datecreate2 = new Date(datecreate1).toLocaleDateString("vi")
                                    return (
                                        <>
                                            <div className='silde-child' >
                                                <img
                                                    className="img-child w-100 h-100"
                                                    src={imageBase64}
                                                    alt="First slide"
                                                    onClick={() => this.handlOnclickHandBook(item)
                                                    } />
                                            </div>
                                            <h5 className='name-child'>{item.title}</h5>
                                            <p className='name-child fw-light'>Tác giả: {item.StaffHandbookData.userName}, ngày đăng: {datecreate2}</p>
                                        </>

                                    )
                                })}










                        </Carousel>

                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}
DetailHandBook.contextType = UserContext

export default withRouter(DetailHandBook);
