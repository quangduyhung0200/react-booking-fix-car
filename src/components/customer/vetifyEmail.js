import React, { Component } from 'react';
import './vetyflyEmail.scss'
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import { veryfyBooking } from '../../services/guestService';
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVetyfy: false,
            errCode: 0

        }
    }
    async componentDidMount() {

        let urlParams = new URLSearchParams(this.props.location.search);

        let token = urlParams.get('token');
        let garaId = urlParams.get('garaId');

        let res = await veryfyBooking({
            token: token,
            garaId: garaId
        })
        if (res && res.EC === 0) {
            this.setState({
                statusVetyfy: true,
                errCode: res.EC
            })
        }
        else {
            this.setState({
                statusVetyfy: true,
                errCode: res && res.ec ? res.EC : -1
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handCickhome = () => {
        this.props.history.push('/')
    }
    render() {
        let { statusVetyfy, errCode } = this.state
        return (
            <>

                {statusVetyfy === false ?
                    <div>loading data....</div> :
                    <div>
                        {errCode === 0 ?

                            <div className='container'>
                                <div className='success'>
                                    <div className='icon d-plex'><i class="fa fa-check" aria-hidden="true"> </i><span className='fs-1'>Xác nhận thành công</span></div>
                                    <div>Vui lòng  kiểm tra email để biết được khi nào gara xác nhận đơn đặt lịch nhé</div>
                                    <div> <button onClick={() => this.handCickhome()} className='btn btn-primary mt-3'>Nhấn vào đây để về trang chủ</button></div>
                                </div>
                            </div> :
                            <div className='container'>
                                <div className='fails'>
                                    <div className='icon d-plex'><i class="fa fa-times" aria-hidden="true"></i><span className='fs-1'>Rất tiếc việc xác nhận đã không thành công</span></div>
                                    <div>Vui lòng kiểm tra lại email của bạn (nếu bạn đã xác nhận một lần thì lần thứ 2 load trang này sẽ dẫn đến hiển thị này)</div>
                                    <div> <button onClick={() => this.handCickhome()} className='btn btn-primary mt-3'>Nhấn vào đây để về trang chủ</button></div>
                                </div>
                            </div>
                        }
                    </div >
                }


            </>
        );
    }
}


export default withRouter(VerifyEmail);
