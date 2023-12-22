import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import garaImage1 from '../../../assets/img/image/garacar1.jpeg'
import garaImage2 from '../../../assets/img/image/gara2.webp'
import garaImage3 from '../../../assets/img/image/gara3.jpeg'




class Handbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDocter: []
        }
    }
    componentDidMount() {

    }
    handlClick = () => {
        alert('click')
    }
    render() {

        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 3 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };
        return (
            <><div className='container'>
                <div className='session-container'>
                    <div className='session-header'>
                        <div className='content-left'>asdasdasd</div>
                        <div className='content-right'>asdasdasd</div>
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

                            <div className='silde-child' >
                                <img
                                    className="img-child w-100"
                                    src={garaImage1}
                                    alt="First slide"
                                />
                                <p className='name-child'>asdasdasd</p>
                            </div>
                            <div className='silde-child' >  <img
                                className="img-child w-100"
                                src={garaImage2}
                                alt="First slide"
                            />
                                <p className='name-child'>asdasdasd</p></div>
                            <div className='silde-child' >  <img
                                className="img-child w-100"
                                src={garaImage3}
                                alt="First slide"
                            />
                                <p className='name-child'>asdasdasd</p></div>
                            <div className='silde-child' >
                                <img
                                    className="img-child w-100"
                                    src={garaImage1}
                                    alt="First slide"
                                />
                                <p className='name-child'>asdasdasd</p>
                            </div>
                            <div className='silde-child' >  <img
                                className="img-child w-100"
                                src={garaImage2}
                                alt="First slide"
                            />
                                <p className='name-child'>asdasdasd</p></div>
                            <div className='silde-child' >  <img
                                className="img-child w-100"
                                src={garaImage3}
                                alt="First slide"
                            />
                                <p className='name-child'>asdasdasd</p></div>



                        </Carousel>;

                    </div>

                </div>
            </div>



            </>

        );
    }


}



export default Handbook;
