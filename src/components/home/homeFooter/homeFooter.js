import React, { Component } from 'react';
import './HomeFooter.scss'


class HomeFooter extends Component {

    render() {


        return (
            <>

                <div className='home-footer'>
                    <div className='container'>

                        <div className='infomycar row'>
                            <div className='col-4 part1 row'>
                                <div className='avata  col-sm-6 col-12'></div>
                                <div className='title col-6'>  <h3>Mycar</h3>
                                    <div>Hệ thống đặt lịch sửa chữa ô tô</div></div>




                            </div>
                            <div className='col-4 part2 row'>
                                <div className=' col-12'><h3>Về chúng tôi</h3></div>
                                <div className=' col-2'>Email</div>
                                <div className=' col-10'>Hung321chiengden@gmail.com</div>
                                <div className=' col-2'>Điện thoại</div>

                                <div className=' col-10'>0852820403</div>
                                <div className=' col-2'>Địa chỉ</div>
                                <div className=' col-10'>Bản Phiêng Tam xã Chiềng Đen Thành phố Sơn La tỉnh Sơn La</div>



                            </div>
                            <div className='col-4 part3'><h3>Theo dõi qua</h3>
                                <div><i class="fa fa-facebook-official" aria-hidden="true"></i> <span> https://www.facebook.com/profile.php?id=100007934385454</span></div>
                                <div>    <i class="fa fa-instagram" aria-hidden="true"></i><span>  https://www.instagram.com/quangduyhung/</span></div>
                                <div>    <i class="fa fa-github" aria-hidden="true"></i><span>  https://github.com/quangduyhung0200</span></div>
                            </div>


                        </div>
                    </div>

                    <p className='info'>&copy; 2024 DuyHung. <a target='_blank' href='https://www.facebook.com/profile.php?id=100007934385454'>More infornation, pls visit my profile</a></p>
                </div >
            </>

        );
    }

}



export default HomeFooter;
