import React, { Component } from 'react';

import './homeBody.scss'
import Carousel from 'react-bootstrap/Carousel';
import { withRouter } from 'react-router';
import garaImage1 from '../../../assets/img/image/garacar1.jpeg'
import garaImage2 from '../../../assets/img/image/gara2.webp'
import garaImage3 from '../../../assets/img/image/gara3.jpeg'

class HomeBody extends Component {



    render() {



        return (



            <div className='home-header-banner img-fluid'>
                <div className='content-up'>
                    <div className='title-1'>
                        asdasdasda
                    </div>
                    <div className='title-2'>


                        asfasfasd

                    </div>
                    <div className='search'>

                        <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                    </div>
                </div>
                <div className='content-dow'>

                </div>
            </div>


        );
    }

}



export default withRouter(HomeBody);
