import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import garaImage1 from '../../../assets/img/image/garacar1.jpeg'
import garaImage2 from '../../../assets/img/image/gara2.webp'
import garaImage3 from '../../../assets/img/image/gara3.jpeg'
import { getTopHandBook } from '../../../services/guestService';
import './HandBook.scss'
import { Buffer } from 'buffer';
import { withRouter } from 'react-router';

class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrHandBook: []
        }
    }
    async componentDidMount() {
        let data = await getTopHandBook(10)
        if (data.EC === 0) {
            this.setState({
                arrHandBook: data.DT
            })
        }
    }

    handlOnclickHandBook = (item) => {
        this.props.history.push(`/detailHandBook/${item.id}`)
    }
    handOnclickMoreInfo = () => {
        this.props.history.push(`/allHandBook`)
    }
    render() {

        let { arrHandBook } = this.state
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
                    <div className='session-container'>
                        <div className='session-header'>
                            <h3 className='content-left'>Cẩm nang</h3>
                            <div className='content-right'> <button onClick={() => this.handOnclickMoreInfo()} className='btn btn-warning'>Xem thêm</button></div>
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
                                {arrHandBook && arrHandBook.length > 0 &&
                                    arrHandBook.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.avata) {

                                            imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                        }
                                        return (<>
                                            <div className='silde-child' >
                                                <img
                                                    className="img-child w-100 h-100"
                                                    src={imageBase64}
                                                    alt="First slide"
                                                    onClick={() => this.handlOnclickHandBook(item)}
                                                />

                                            </div>
                                            <h5 className='name-child'>{item.title}</h5>
                                        </>
                                        )

                                    })}



                            </Carousel>

                        </div>

                    </div>
                </div>



            </>

        )
    }

}



export default withRouter(HandBook);
