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
import { getGaraInfo } from '../../services/guestService';
import { getUserById } from '../../services/userService';
class Navigate extends Component {
    constructor(props) {
        super(props);
        this.state = {

            garaId: ''


        }
    }

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
    async componentDidMount() {
        console.log('user', this.context.user.account.id)
        let res = await getUserById(this.context.user.account.id)
        if (res.EC === 0) {
            this.setState({
                garaId: res.DT.userGara ? res.DT.userGara.id : ''
            })
        }
        console.log(res)
    }
    render() {
        let user = this.context.user
        const location = window.location.pathname
        let { garaId } = this.state

        if (user && user.isAuthenticated === true && user.account.role[0].id === 1) {
            return (

                <div className='nav-header'>
                    <Navbar expand="lg" className="bg-body-tertiary bg-header h-100">
                        <Container>
                            <Navbar.Brand href="/"> <span className='band-nav'>MyCar</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    {user && user.isAuthenticated === true && <>
                                        <NavLink to="/myOrder" exact className='nav-link'>Đơn đặt lịch của tôi</NavLink>

                                    </>}
                                    {garaId !== '' && <NavLink to="/mygara" exact className='nav-link'>My gara</NavLink>}
                                    <NavLink to="/allGara" exact className='nav-link'>Gara</NavLink>
                                    <NavLink to="/allHandBook" exact className='nav-link'>HandBook</NavLink>


                                </Nav>
                                {user && user.isAuthenticated === true ? <>
                                    <Nav className='nav-link'>
                                        <Nav.Item  >Wellcome  {user.account.userName}</Nav.Item>

                                    </Nav>
                                    <NavDropdown title="Tùy chọn" id="basic-nav-dropdown">

                                        <Link className='nav-link' to="/RegisterGara">Đăng ký gara</Link>
                                        <Link className='nav-link' to="/Account">Trang cá nhân</Link>

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <span onClick={() => this.handLogout()}> Log out</span>

                                        </NavDropdown.Item>
                                    </NavDropdown></> : <> <Link className='nav-link' to='/login'>Login</Link></>}


                            </Navbar.Collapse>
                        </Container>
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
Navigate.contextType = UserContext


export default withRouter(Navigate);
