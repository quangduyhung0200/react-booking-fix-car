import './allHandBook.scss'
import React, { Component } from 'react';
import { Buffer } from 'buffer';

import { getTopHandBook } from '../../../services/guestService';
import { withRouter } from 'react-router';
import Carousel from 'react-multi-carousel';
import Select from 'react-select';
import HomeFooter from '../homeFooter/homeFooter';
import { searchHandBook } from '../../../services/guestService';
import _ from 'lodash';
class AllHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listHandBookNew: [],
            listHandBookHot: [],
            listHandBookSearch: [],
            selectHandBook: '',

        }
    }

    async componentDidMount() {
        let data = await getTopHandBook(10)
        if (data.EC === 0) {
            this.setState({
                listHandBookNew: data.DT,
                listHandBookHot: data.DT
            })
        }
    }
    handOnchane = (event) => {
        this.setState({
            selectHandBook: event.target.value
        })
    }
    handOnclickSearch = async () => {
        let data = await searchHandBook(this.state.selectHandBook)
        if (data.EC === 0) {
            this.setState({
                listHandBookSearch: data.DT
            })
        }
    }
    handOnclickHandBook = (data) => {
        this.props.history.push(`/detailHandbook/${data.id}`);
    }
    render() {
        let { listHandBookNew, listHandBookHot, listHandBookSearch } = this.state
        console.log(typeof (this.state.listHandBookSearch.length))
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
        return (


            <>

                <div className='home-header-banner-allHandBook img-fluid'>
                    <div className=' container'>
                        <div className='content-up row'>
                            <h3 className='title col-7'>Tìm kiếm bài viết</h3>

                            <div className='search col-4 row'>
                                <input className='form-control' value={this.state.selectHandBook} onChange={(event) => this.handOnchane(event)} placeholder='nhap tu khoa' />

                            </div>
                            <button onClick={() => this.handOnclickSearch()} className='btn btn-primary col-1'>tim kiem</button>

                        </div>
                        {
                            listHandBookSearch && listHandBookSearch.length > 0 ?
                                listHandBookSearch.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.avata) {

                                        imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                    }

                                    return (
                                        <>
                                            <div className='content-down-search row' key={`child-${index}`}>
                                                <div onClick={() => this.handOnclickHandBook(item)} className='avata col-3' style={{ backgroundImage: `url(${imageBase64})` }}></div>
                                                <div className='introaction col-7 row'>
                                                    <h3 className='title col-12'>
                                                        {item.title}
                                                    </h3>
                                                    <div className='athur col-12'>
                                                        {item.StaffHandbookData.userName}
                                                    </div>

                                                </div>
                                            </div >

                                        </>



                                    )
                                })
                                : <div className='content-down-search2'></div>}
                        {listHandBookNew && listHandBookNew.length > 0 && listHandBookSearch.length === 0 &&
                            <div className='content-down-new'>
                                <div><h3>Bài viết mới nhất</h3></div>
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

                                    {listHandBookNew && listHandBookNew.length > 0 && listHandBookSearch.length === 0
                                        && listHandBookNew.map((item, index) => {
                                            let imageBase64 = ''
                                            if (item.avata) {

                                                imageBase64 = new Buffer(item.avata, 'base64').toString('binary')
                                            }
                                            return (
                                                <> <div onClick={() => this.handOnclickHandBook(item)} className='silde-child' key={`chile-${index}`} >
                                                    <img
                                                        className="img-child w-100 h-100"
                                                        src={imageBase64}
                                                        alt="First slide"
                                                    // onClick={() => this.handlOnclickHandBook(item)}
                                                    />

                                                </div>
                                                    <h5 className='name-child'>{item.title}</h5>
                                                </>
                                            )
                                        })}






                                </Carousel>  </div>
                        }



                    </div>



                </div >

                <HomeFooter /></>



        )
    }

}



export default withRouter(AllHandBook);
