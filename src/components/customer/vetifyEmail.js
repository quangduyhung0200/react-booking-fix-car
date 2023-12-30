import React, { Component } from 'react';


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


    render() {
        let { statusVetyfy, errCode } = this.state
        return (
            <>

                {statusVetyfy === false ?
                    <div>loading data....</div> :
                    <div>
                        {errCode === 0 ?
                            <div>thanh cong</div> :
                            <div>that bai</div>
                        }
                    </div>
                }


            </>
        );
    }
}


export default VerifyEmail;
