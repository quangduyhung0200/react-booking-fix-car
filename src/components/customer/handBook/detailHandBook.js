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
            listHandBook: []

        }
    }
    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {

            let id = this.props.match.params.id;
            this.setState({
                currenHandBookId: id
            })

            let data = await getHandBookById(id)

            let imageBase64 = ''
            if (data.DT.avata.data) {

                imageBase64 = new Buffer(data.DT.avata.data, 'base64').toString('binary')
            }
            let coppyState = { ...this.state }

            coppyState.createdAt = data.DT.createdAt
            coppyState.title = data.DT.title
            if (data.DT.GaraHandBook.id === null) {
                coppyState.garaId = 0
            } else {
                coppyState.garaId = data.DT.GaraHandBook.id
            }


            coppyState.avata = imageBase64
            coppyState.descriptionHTML = data.DT.contentHTML
            coppyState.handbookId = data.DT.id
            coppyState.staffName = data.DT.StaffHandbookData.userName

            this.setState({
                ...coppyState
            })

        }
        let res = await getTopHandBookRelateto(5, this.props.match.params.id)
        if (res.EC === 0) {
            this.setState({
                listHandBook: res.DT
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handlAcepHandBook = async () => {
        let respons = await accepHandBook(this.state.currenHandBookId)
        if (respons && respons.EC === 0) {

            toast.success('da xet duyet thanh cong')
            this.props.history.push(`/gara`);


        }

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
        let { listHandBook, garaId } = this.state
        console.log(garaId)
        return (
            <>

                <div className='HandBook-Detail-Container container'>
                    <div className='row'>
                        <div className='introduction col-12 row my-2'>
                            <div className='avata col-md-6 col-12' style={{ backgroundImage: `url(${this.state.avata ? this.state.avata : ''})`, height: '50vh' }}>

                            </div>
                            <div className='title col-md-6 col-12'>
                                <h3 className=' text-uppercase  up col-12 px-2'>
                                    {this.state.title}
                                </h3>
                                <div className='up col-12'>
                                    <p className='fw-light'>Nguoi viet: {this.state.staffName}</p>

                                </div>

                                <div className='down col-12'>
                                    <p className='fst-italic'>Ngay viet: {s}</p>
                                </div>
                            </div>
                        </div>
                        <div className='body col-12 my-3 '>
                            {this.state.descriptionHTML &&
                                < div dangerouslySetInnerHTML={{ __html: this.state.descriptionHTML }}></div>}
                        </div>

                        {garaId && garaId !== 0 ? <>
                            <div className='gara-with-handbook col-12'>
                                <h3>Đặt lịch tại gara ngay </h3>
                                <ProfileGara dataModelProfile={this.state.garaId} />
                            </div>
                        </> :
                            <><div className='gara-with-handbook col-12'>
                                <hr></hr>

                            </div></>

                        }



                        <div className='session-header'>
                            <h3 className='content-left'>Một số bài viết liên quan</h3>
                            <div className='content-right'> <button className='btn btn-warning'>Xem thêm</button></div>
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

                </div >
            </>
        );
    }
}
DetailHandBook.contextType = UserContext

export default withRouter(DetailHandBook);
