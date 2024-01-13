import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllGender } from '../../../services/guestService';
import CommonUtils from '../../../utils/CommonUtils';
import { getAllGroup, updateUser } from '../../../services/adminService';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import _ from 'lodash';
import Lightbox from 'react-image-lightbox';
import { registerUser } from '../../../services/guestService';
import { chanepass } from '../../../services/userService';

class Chanepass extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isOpen: false,
            oldpassword: '',
            newpassword: '',
            comfimPasswordemail: '',
            email: '',

            isValidoldPassword: true,
            isValidConfigPassword: true,
            isValidPassword: true,
            showpass: false



        }
    }
    isNumeric = (value) => {
        return /^-?\d+$/.test(value);
    }
    vetyfyData = () => {

        let { oldpassword, newpassword, comfimPasswordemail, isValidoldPassword, isValidConfigPassword, isValidPassword } = this.state

        let coppyStatea = { ...this.state }
        coppyStatea.isValidoldPassword = true
        coppyStatea.isValidConfigPassword = true
        coppyStatea.isValidPassword = true



        this.setState({
            ...coppyStatea
        })



        if (!oldpassword) {

            let coppyState = { ...coppyStatea }
            coppyState.isValidoldPassword = false
            this.setState({
                ...coppyState
            })
            return false
        }
        if (!newpassword || newpassword.length < 6) {

            let coppyState = { ...coppyStatea }
            toast.error('Độ dài tối thiểu phải lớn hơn 6 ký tự')
            coppyState.isValidPassword = false
            this.setState({
                ...coppyState
            })
            return false
        }

        if (!comfimPasswordemail || comfimPasswordemail.length < 6) {

            let coppyState = { ...coppyStatea }
            toast.error('Độ dài tối thiểu phải lớn hơn 6 ký tự')
            coppyState.isValidConfigPassword = false
            this.setState({
                ...coppyState
            })
            return false
        }

        if (newpassword != comfimPasswordemail) {
            toast.error('Mật khẩu bạn nhập không trùng nhau')
            let coppyState = { ...coppyStatea }
            coppyState.isValidPassword = false
            this.setState({
                ...coppyState
            })

            return false
        }









        return true



    }
    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModel !== this.props.dataModel) {

            this.setState({
                email: this.props.dataModel.email
            })



        }
    }
    handleClose = () => {

        this.props.onHide()
        this.setState(
            {
                previewimg: ''
            }
        )
    }
    handleOnchaneInput = (event, id) => {
        let coppystate = { ...this.state };
        coppystate[id] = event.target.value
        this.setState({
            ...coppystate
        })

    }


    handlchanepass = async () => {
        console.log(this.state.oldpassword)
        let check = this.vetyfyData()
        if (check === true) {
            let datainput = {
                email: this.state.email,
                oldpassword: this.state.oldpassword,
                newPassword: this.state.newpassword
            }
            let res = await chanepass(datainput)
            if (res.EC === 0) {
                toast.success('Đổi mật khẩu thành công')
                this.handleClose()
            }
            if (res.EC === 1) {
                toast.error('Mật khẩu nhập không chính xác')

            }
            if (res.EC !== 0 && res.EC !== 1) {
                toast.error('có lỗi xảy ra vui lòng thử lại sau')
                this.handleClose()
            }

        }

    }


    onclickshowpass = () => {
        this.setState({
            showpass: !this.state.showpass
        })
    }
    render() {

        let { oldpassword, newpassword, comfimPasswordemail, email, isValidoldPassword, isValidConfigPassword, isValidPassword, showpass } = this.state
        console.log(this.state)
        return (
            <div>


                <Modal
                    {...this.props}
                    size="xl"
                    show={this.props.show}
                    aria-labelledby="contained-modal-title-vcenter"

                    className='model-user'
                    onHide={() => this.handleClose()}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <span>Đổi mật khẩu</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>


                            <div className='col-12  form-group'>
                                <label className='form-label'>Mật khẩu cũ</label>
                                <input onChange={(event) => this.handleOnchaneInput(event, 'oldpassword')} type={showpass === true ? 'text' : 'password'}
                                    className={this.state.isValidoldPassword === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Mật khẩu cũ '
                                    value={oldpassword}
                                    required>
                                </input>



                            </div>

                            <div className='col-12 form-group'>
                                <label className='form-label'>Mật khẩu mới</label>
                                <input onChange={(event) => this.handleOnchaneInput(event, 'newpassword')} type={showpass === true ? 'text' : 'password'}
                                    className={this.state.isValidPassword === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Mật khẩu mới '
                                    value={newpassword} required></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label className='form-label'>Nhập lại mật khẩu mới</label>
                                <input onChange={(event) => this.handleOnchaneInput(event, 'comfimPasswordemail')} type={showpass === true ? 'text' : 'password'}
                                    className={this.state.isValidConfigPassword === true ? 'form-control' : 'form-control is-invalid'}
                                    placeholder='Xác nhận mật khẩu'
                                    value={comfimPasswordemail} required></input>
                            </div>
                            <div ><label onClick={() => this.onclickshowpass()} >Ẩn/hiện mật khẩu </label>  {showpass === false ? <i onClick={() => this.onclickshowpass()} className="fa fa-eye mt-2 fs-3 mx-2" aria-hidden="true"></i> :
                                <i onClick={() => this.onclickshowpass()} className="fa fa-eye-slash  mt-2 fs-3 mx-2" aria-hidden="true"></i>}</div>


                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handlchanepass()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div >
        );
    }
}


export default Chanepass;