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
        if (this.props.carId) {

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
        if (!this.props.carId) {

            if (this.props.match && this.props.match.params && this.props.match.params.id) {

                let id = this.props.match.params.id;


                let data = await getDataCarById(id)
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
                        <div className='introduction2'>
                            <div className='content-left' style={{ backgroundImage: `url(${this.state.avata ? this.state.avata : ''})` }}>

                            </div>
                            <div className='content-right mx-4'>
                                <div className='up'>
                                    <h3>        {this.state.nameCar}</h3>

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
