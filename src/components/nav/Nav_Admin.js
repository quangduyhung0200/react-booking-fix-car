import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Nav.scss'
import { UserContext } from '../../context/userContext';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { userLogout } from '../../services/userService';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
class NavigateAdmim extends Component {


    handLogout = async () => {
        let data = await userLogout()

        this.context.logout()
        if (data && data.EC === 0) {
            localStorage.setItem('jwt', '')
            this.props.history.push('/login')
            toast.success('log out success')

        }
        else {
            toast.error(data.EM)
        }
    }

    render() {
        let user = this.context.user
        const location = window.location.pathname


        if (user && user.isAuthenticated === true && user.account.role[0].id === 4) {
            return (

                <div className='nav-header'>
                    <Navbar expand="lg" className="  bg-body-tertiary bg-header h-100">


                        <Navbar.Brand href="/"> <span className='band-nav'>MyCar</span> </Navbar.Brand>
                        <NavLink to="/" exact className='nav-link'>Trang chủ</NavLink>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <NavLink to="/myOrder" exact className='nav-link'>Đơn đặt lịch của tôi</NavLink>
                            <NavDropdown title="Tìm kiếm" id="basic-nav-dropdown">
                                <NavLink to="/allGara" exact className='nav-link'>Tìm kiếm gara</NavLink>
                                <NavLink to="/allHandBook" exact className='nav-link'>Tìm kiếm bài viết</NavLink>

                            </NavDropdown>
                            <Nav className="ms-auto">


                            </Nav>


                            <NavDropdown title="Quản lý người dùng" id="basic-nav-dropdown">
                                <NavLink to="/user" exact className='nav-link'>Quản lý người dùng</NavLink>
                                <NavLink to="/manage-comment" exact className='nav-link'>Quản lý đánh giá người dùng</NavLink>

                            </NavDropdown>
                            <NavDropdown title="Quản lý gara" id="basic-nav-dropdown">
                                <NavLink to="/ManageGarahasntPass" exact className='nav-link'>Quản lý phê duyệt gara</NavLink>
                                <NavLink to="/ManageGara" exact className='nav-link'>Quản lý gara đang hoạt động</NavLink>
                                <NavLink to="/manage-PickCar" exact className='nav-link'>Quản lý chọn xe cho gara</NavLink>
                                <NavLink to="/setSchedule" exact className='nav-link'>Quản lý đặt lịch sửa xe cho gara</NavLink>
                                <NavLink to="/Chart" exact className='nav-link'>Quản lý doanh thu</NavLink>


                            </NavDropdown>
                            <NavDropdown title="Quản lý xe" id="basic-nav-dropdown">
                                <NavLink to="/car" exact className='nav-link'>Quản lý xe</NavLink>
                                <NavLink to="/manage-carCompany" exact className='nav-link'>Quản lý công ty xe</NavLink>


                            </NavDropdown>
                            <NavDropdown title="Quản lý đơn hàng" id="basic-nav-dropdown">
                                <NavLink to="/manage-booking" exact className='nav-link'>Quản lý đơn đặt lịch</NavLink>

                            </NavDropdown>
                            <NavDropdown title="Quản lý cẩm nang" id="basic-nav-dropdown">

                                <NavLink to="/manage-handBookuncensorship" exact className='nav-link'>Quản lý cẩm nang chưa phê duyệt</NavLink>
                                <NavLink to="/manage-handBook" exact className='nav-link'>Quản lý cẩm nang</NavLink>

                            </NavDropdown>

                            <NavDropdown title="Tùy chọn" id="basic-nav-dropdown">
                                <Link className='nav-link' to="/Account">Trang cá nhân</Link>


                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <span onClick={() => this.handLogout()}> Log out</span>

                                </NavDropdown.Item>

                            </NavDropdown>

                            <Nav className='nav-link'>
                                <Nav.Item  >Chào mừng:  {user.account.userName}</Nav.Item>

                            </Nav>

                        </Navbar.Collapse>

                    </Navbar>

                </div >




            )
        }
        else {
            return (
                <>
                    <Redirect to="/login"></Redirect>

                </>
            )
        }

    }
}
NavigateAdmim.contextType = UserContext


export default withRouter(NavigateAdmim);
