import React, { Component } from 'react';
import './login.scss'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from "../../context/userContext"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { forgetpassword } from '../../services/guestService';

class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',

            isValidEmail: true,



        }
    }




    vetyfyData = () => {
        let { email, password, isValidEmail, isValidPassword } = this.state
        let re = /\S+@\S+\.\S+/;
        let coppyStatea = { ...this.state }
        coppyStatea.isValidEmail = true

        coppyStatea.isValidPassword = true


        this.setState({
            ...coppyStatea
        })

        if (!email) {

            let coppyState = { ...this.coppyStatea }
            coppyState.isValidEmail = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!re.test(email)) {

            toast.error('ples enter email address')
            let coppyState = { ...this.coppyStatea }
            coppyState.isValidEmail = false
            this.setState({
                ...coppyState
            })
            return false
        }




        return true



    }
    HandlCreateNewAccoute = () => {
        this.props.history.push(`/register`);
    }
    handClickGohome = () => {
        this.props.history.push(`/`);
    }
    handlOnchanInput = (event, name) => {
        let valueInput = event.target.value
        let coppyState = { ...this.state }
        coppyState[name] = valueInput
        this.setState({
            ...coppyState
        })

    }
    handlLogin = async () => {
        let check = this.vetyfyData()
        if (check === true) {
            let res = await forgetpassword(this.state.email)
            if (res.EC === 0) {
                toast.success('Vui lòng kiểm tra email để lấy mật khẩu mới')
            }
            if (res.EC === 1) {
                toast.success('Email không tồn tại, vui lòng kiểm tra lại')
            }

        }

    }

    render() {
        let { email, password, isValidEmail, isValidPassword, createNewAccoutWithEmailHasOrder } = this.state
        if (this.context.user.isAuthenticated === true) {
            return (

                < Redirect to="/" ></Redirect >
            )
        }
        else {
            return (
                <>
                    <div className='login-container'>
                        <div className='container'>
                            <div className='row px-3 px-sm-0'>
                                <div className='content-left  my-3 col-12 d-none col-sm-7 d-sm-block '>
                                    <div className='brand'>duyhungapp</div>
                                    <div className='detail'>you can do it</div>

                                </div>

                                <div className='content-right col-sm-5 col-12  my-3 d-flex flex-column gap-3 py-3 '>
                                    <div className='brand d-sm-none'>duyhungapp</div>
                                    <input onChange={(event) => this.handlOnchanInput(event, 'email')} type='text'
                                        className={isValidEmail === true ? 'form-control' : 'form-control is-invalid'}
                                        value={email} placeholder='Email'
                                    ></input>



                                    <button onClick={() => this.handlLogin()} className='btn btn-primary'>Xác nhận</button>

                                    <hr />
                                    <div className='text-center'>
                                        <button onClick={() => this.HandlCreateNewAccoute()} className='btn btn-success' >
                                            Đăng ký</button>
                                    </div>

                                    <hr />
                                    <div className='return-home'>

                                        <button className='btn btn-primary' onClick={() => this.handClickGohome()}>Quay trở  về trang chủ</button>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div >

                </>

            )
        }

    }
}

Forgotpassword.contextType = UserContext

export default withRouter(Forgotpassword);
