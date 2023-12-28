import React, { Component } from 'react';
import './register.scss'
import { toast } from 'react-toastify';
import { getAllGender } from '../../services/userService';
import { registerUser } from '../../services/userService';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from "../../context/userContext"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { loginUser } from '../../services/userService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],

            userName: '',
            password: '',
            comfimPassword: '',
            email: '',
            phone: '',
            gender: '',
            address: '',
            provindId: '',
            isValidEmail: true,
            isValidUserName: true,
            isValidphone: true,
            isValidConfigPassword: true,
            isValidPassword: true,
            isValidGender: true,
            isValidAddress: true,
            isNewAccout: true


        }
    }
    async componentDidMount() {
        let urlParams = new URLSearchParams(this.props.location.search);
        let email2 = urlParams.get('email');
        if (email2 !== '') {
            this.setState({
                email: email2,
                isNewAccout: false
            })
        }

        let data = await getAllGender()
        let coppyState = { ...this.state }
        coppyState.genderArr = data.DT
        this.setState({
            ...coppyState
        })
        let user = this.context.user
        if (user.isAuthenticated === true) {
            <Redirect to="/"></Redirect>
        }

    }

    vetyfyData = () => {

        let { address, gender, phone, userName, comfimPassword, email, password } = this.state
        let re = /\S+@\S+\.\S+/;
        let coppyStatea = { ...this.state }
        coppyStatea.isValidEmail = true
        coppyStatea.isValidUserName = true
        coppyStatea.isValidConfigPassword = true
        coppyStatea.isValidPassword = true
        coppyStatea.isValidGender = true
        coppyStatea.isValidAddress = true
        coppyStatea.isValidphone = true

        this.setState({
            ...coppyStatea
        })


        if (!email) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidEmail = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!re.test(email)) {

            toast.error('ples enter email address')
            let coppyState = { ...coppyStatea }
            coppyState.isValidEmail = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!phone) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidphone = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!userName) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidUserName = false
            this.setState({
                ...coppyState
            })
            return false
        }

        if (!password) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidPassword = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!comfimPassword) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidConfigPassword = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (password != comfimPassword) {
            toast.error('you password dont match')
            let coppyState = { ...coppyStatea }
            coppyState.isValidConfigPassword = false
            this.setState({
                ...coppyState
            })

            return false
        }

        if (!address) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidAddress = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (gender === '') {

            let coppyState = { ...coppyStatea }
            coppyState.gender = 1
            this.setState({
                ...coppyState
            })
            return false
        }







        return true



    }

    handleOnchaneInput = (event, id) => {
        let coppystate = { ...this.state };
        coppystate[id] = event.target.value
        this.setState({
            ...coppystate
        })

    }
    handlRegister = async () => {

        let { address, gender, phone, userName, comfimPassword, email, password } = this.state
        let check = this.vetyfyData()

        if (check === true) {
            let data = await registerUser(address, gender, phone, userName, comfimPassword, email, password)
            if (data && data.EC === 0) {
                toast.success('register success')
                let data = await loginUser(email, password)
                if (data && data.EC === 0) {
                    console.log('data: ', data)
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
                    this.context.loginContext(hehe)
                    console.log(this.context.user)
                    toast.success('LOGIN SUCCESS')

                    this.props.history.push(`/`);
                    // window.location.reload()


                }

            }
            if (data && data.EC === 1) {
                toast.error(data.EM)
            }
            if (data && data.EC === 2) {
                toast.error(data.EM)
            }
            if (data && data.EC === -1) {
                toast.error(data.EM)
            }
        }
    }
    HandlHaveAlredAccount = () => {
        this.props.history.push(`/login`);
    }

    render() {

        let { genderArr, address, gender, phone, userName, comfimPassword, email, password, isValidEmail,
            isValidUserName, isValidphone, isValidConfigPassword, isValidPassword, isValidGender, isValidAddress, isNewAccout } = this.state


        return (
            <>
                <div className='Registeer-container'>
                    <div className='container'>
                        <div className='row px-3 px-sm-0'>
                            <div className='content-left  my-3 col-12 d-none col-sm-7 d-sm-block '>
                                <div className='brand'>duyhungapp</div>
                                <div className='detail'>you can do it</div>



                            </div>

                            <div className='content-right col-sm-5 col-12  my-3 d-flex flex-column gap-3 py-3 '>
                                <div className='brand d-sm-none'>duyhungapp</div>
                                {isNewAccout === true ?
                                    <div className='form-group'>
                                        <label className='form-label'>Email</label>
                                        <input onChange={(event) => this.handleOnchaneInput(event, 'email')} type='email'
                                            className={isValidEmail === true ? 'form-control' : 'form-control is-invalid'}
                                            placeholder='Email address '
                                            value={email}
                                            required></input>
                                    </div> :
                                    <fieldset disabled>
                                        <div className='form-group'>
                                            <div class="form-group">
                                                <label for="disabledTextInput">Email</label>
                                                <input type="text" id="disabledTextInput" class="form-control" placeholder="Email input" value={email} />
                                            </div>
                                        </div></fieldset>
                                }

                                <div className='form-group'>
                                    <label className='form-label'>Phonenumber</label>
                                    <input onChange={(event) => this.handleOnchaneInput(event, 'phone')} type='text'
                                        className={isValidphone === true ? 'form-control' : 'form-control is-invalid'}
                                        placeholder='Phonenumber '
                                        value={phone} required></input>
                                </div>
                                <div className='form-group'>
                                    <label className='form-label'>User Name</label>
                                    <input onChange={(event) => this.handleOnchaneInput(event, 'userName')} type='text'
                                        className={isValidUserName === true ? 'form-control' : 'form-control is-invalid'}
                                        value={userName} required></input>
                                </div>

                                <div className='form-group'>
                                    <label className='form-label'>Password</label>
                                    <input onChange={(event) => this.handleOnchaneInput(event, 'password')} type='password'
                                        className={isValidPassword === true ? 'form-control' : 'form-control is-invalid'}
                                        placeholder='Password'
                                        value={password} required></input>



                                </div>


                                <div className='form-group'>
                                    <label className='form-label'>Re-enter Password</label>
                                    <input onChange={(event) => this.handleOnchaneInput(event, 'comfimPassword')} type='password'
                                        className={isValidConfigPassword === true ? 'form-control' : 'form-control is-invalid'}
                                        placeholder='Re-enter Password'
                                        value={comfimPassword} required></input>
                                </div>
                                <select value={gender} onChange={(event) => this.handleOnchaneInput(event, 'gender')} className=" form-control" >
                                    {genderArr && genderArr.length > 0 &&
                                        genderArr.map((item, index) => {
                                            return (
                                                <option value={item.id} key={`gender-${item.id}`} >{item.name}</option>
                                            )
                                        })

                                    }

                                </select>
                                <div className='form-group'>
                                    <label className='form-label'>address</label>
                                    <input onChange={(event) => this.handleOnchaneInput(event, 'address')} type='text'
                                        className={isValidAddress === true ? 'form-control' : 'form-control is-invalid'}
                                        placeholder='address'
                                        value={address} required></input>
                                </div>




                                <button onClick={() => this.handlRegister()} type="submit" className='btn btn-primary'>Registeer</button>

                                <hr />
                                <div className='text-center'>
                                    <button onClick={() => this.HandlHaveAlredAccount()} className='btn btn-success'>
                                        alredy've accoute</button>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

            </>

        )
    }
}
Register.contextType = UserContext


export default withRouter(Register);
