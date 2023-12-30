import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import garaImage1 from '../../../assets/img/image/garacar1.jpeg'
import garaImage2 from '../../../assets/img/image/gara2.webp'
import garaImage3 from '../../../assets/img/image/gara3.jpeg'

import './ForYou.scss'
import { Buffer } from 'buffer';
import { withRouter } from 'react-router';

class ForYou extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    handlOnclickGara = (item) => {
        this.props.history.push(`/detailGara/${item.id}`)
    }
    render() {

        let { arrDocter } = this.state
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
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
        return (
            <>
                <div className='container'>
                    <div className='session-container-foryou'>
                        <div className='session-header'>
                            <h3 className='content-left'>Dành cho bạn</h3>
                            <div className='content-right'> <button className='btn btn-warning'>Xem thêm</button></div>
                        </div>
                        <div className='session-content'>
                            <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={false}
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

                                <>
                                    <div className='silde-child' >
                                        <img
                                            className="img-child w-100 h-100"
                                            src={garaImage1}
                                            alt="First slide"
                                        // onClick={() => this.handlOnclickGara()}
                                        />

                                    </div>
                                    <h5 className='name-child'>Tìm gara theo địa chỉ</h5>
                                </>
                                <>
                                    <div className='silde-child' >
                                        <img
                                            className="img-child w-100 h-100"
                                            src={garaImage1}
                                            alt="First slide"
                                        // onClick={() => this.handlOnclickGara()}
                                        />

                                    </div>
                                    <h5 className='name-child'>Tìm gara theo ô tô</h5>
                                </>
                                <>
                                    <div className='silde-child' >
                                        <img
                                            className="img-child w-100 h-100"
                                            src={garaImage1}
                                            alt="First slide"
                                        // onClick={() => this.handlOnclickGara()}
                                        />

                                    </div>
                                    <h5 className='name-child'>Tìm gara theo hãng xe</h5>
                                </>



                            </Carousel>

                        </div>

                    </div>
                </div>



            </>

        )
    }

}



export default withRouter(ForYou);
