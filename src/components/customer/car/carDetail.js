import React, { Component } from 'react';

import { Buffer } from "buffer";

import { UserContext } from "../../../context/userContext"
import { getDataCarById } from '../../../services/guestService';
import { withRouter } from 'react-router-dom';
import './carDetail.scss'
class DetailCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avata: '',
            nameCar: '',
            carCompanyName: '',
            descriptionL: ''

        }
    }
    async componentDidMount() {
        if (this.props.carId !== '') {

            let data = await getDataCarById(this.props.carId)
            let imageBase64 = ''
            if (data.DT.avata.data) {

                imageBase64 = new Buffer(data.DT.avata.data, 'base64').toString('binary')
            }
            this.setState({
                avata: imageBase64,
                nameCar: data.DT.nameCar,
                carCompanyName: data.DT.carCompanyData.name,
                descriptionL: data.DT.descriptions
            })

        }
        if (this.props.carId === '') {
            this.setState({
                avata: '',
                nameCar: '',
                carCompanyName: '',
                descriptionL: ''
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.carId !== this.props.carId) {
            let data = await getDataCarById(this.props.carId)
            let imageBase64 = ''
            if (data.DT.avata.data) {

                imageBase64 = new Buffer(data.DT.avata.data, 'base64').toString('binary')
            }
            this.setState({
                avata: imageBase64,
                nameCar: data.DT.nameCar,
                carCompanyName: data.DT.carCompanyData.name,
                descriptionL: data.DT.descriptions
            })

        }

    }

    render() {




        return (
            <>

                <div className='Car-Detail-Container container'>
                    <div className='row'>
                        <div className='introduction'>
                            <div className='content-left' style={{ backgroundImage: `url(${this.state.avata ? this.state.avata : ''})` }}>

                            </div>
                            <div className='content-right'>
                                <div className='up'>
                                    {this.state.nameCar}
                                </div>

                                <div className='down'>
                                    {this.state.descriptionL}
                                </div>
                            </div>
                        </div>



                    </div>

                </div >
            </>
        );
    }
}

DetailCar.contextType = UserContext

export default withRouter(DetailCar);
