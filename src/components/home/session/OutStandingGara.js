import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import garaImage1 from '../../../assets/img/image/garacar1.jpeg'
import garaImage2 from '../../../assets/img/image/gara2.webp'
import garaImage3 from '../../../assets/img/image/gara3.jpeg'
import { getTopGara } from '../../../services/userService';
import './OutStandingGara.scss'
import { Buffer } from 'buffer';
import { withRouter } from 'react-router';

class OutStandingGara extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDocter: []
        }
    }
    async componentDidMount() {
        let res = await getTopGara(10)

        if (res && res.EC === 0) {
            this.setState({
                arrDocter: res.DT
            })
        }
    }

    handlOnclickGara = (item) => {
        this.props.history.push(`/detailGara/${item.id}`)
    }
    render() {
        console.log(this.state)
        let { arrDocter } = this.state
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
            <>
                <div className='container'>
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
                                {arrDocter && arrDocter.length > 0 &&
                                    arrDocter.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.avata) {

                                            imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                        }
                                        return (
                                            <div key={`chile-${index}`} className='silde-child' >
                                                <img
                                                    className="img-child w-100 h-100"
                                                    src={imageBase64}
                                                    alt="First slide"
                                                    onClick={() => this.handlOnclickGara(item)}
                                                />
                                                <p className='name-child'>{item.nameGara}</p>
                                            </div>
                                        )
                                    })}




                            </Carousel>;

                        </div>

                    </div>
                </div>



            </>

        );
    }

}



export default withRouter(OutStandingGara);
