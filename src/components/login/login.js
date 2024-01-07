import React, { Component } from 'react';
import './login.scss'
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from "../../context/userContext"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isValidEmail: true,
            isValidPassword: true,
            createNewAccoutWithEmailHasOrder: false

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


        if (!password) {

            let coppyState = { ...this.coppyStatea }
            coppyState.isValidPassword = false
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
        let { email, password } = this.state

        if (check) {
            let data = await loginUser(this.state.email, password)

            if (data && data.EC === 0) {

                let token = data.DT.access_token
                let email = data.DT.email
                let userName = data.DT.userName
                let id = data.DT.id
                let role = data.DT.data
                let hehe = {
                    isAuthenticated: true,
                    token: token,
                    account: { role, email, userName, id }
                }
                console.log(token)
                localStorage.setItem('jwt', token)
                this.context.loginContext(hehe)

                toast.success('LOGIN SUCCESS')

                this.props.history.push(`/`);
                // window.location.reload()
                let coppyState = { ...this.state }
                coppyState.email = ''
                coppyState.password = ''
                this.setState({
                    ...coppyState
                })

            }
            if (data && data.EC === 1) {
                toast.error('wrong password')
            }
            if (data && data.EC === 2) {
                toast.error('your email or phone number dont exit')
            }
            if (data && data.EC === 3) {
                this.setState({
                    createNewAccoutWithEmailHasOrder: true
                })
            }
            if (data && data.EC === -1) {
                toast.error('erro from server')
            }

        }
    }
    HandlCreateNewAccoutewithEmail = (email) => {
        this.props.history.push(`/register?email=${this.state.email}`);
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


                                    <input onChange={(event) => this.handlOnchanInput(event, 'password')} type='password'
                                        className={isValidPassword === true ? 'form-control' : 'form-control is-invalid'}
                                        value={password}
                                        placeholder='Password'
                                    ></input>
                                    <button onClick={() => this.handlLogin()} className='btn btn-primary'>login</button>
                                    <span className='fogot-pwd text-center'><a href='#'>forgot your password</a></span>
                                    <hr />
                                    <div className='text-center'>
                                        <button onClick={() => this.HandlCreateNewAccoute()} className='btn btn-success' >
                                            create new accoute</button>
                                    </div>
                                    <div className={createNewAccoutWithEmailHasOrder === true ? 'text-center ' : 'text-center invisible'}>
                                        <button onClick={() => this.HandlCreateNewAccoutewithEmail(email)} className='btn btn-success' >
                                            create new accoute with this email</button>
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

Login.contextType = UserContext

export default withRouter(Login);
