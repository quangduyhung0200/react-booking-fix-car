import React, { Component } from 'react';

import './homeBody.scss'
import Carousel from 'react-bootstrap/Carousel';
import { withRouter } from 'react-router';
import { getAllGara } from '../../../services/guestService';
import Select from 'react-select';
class HomeBody extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listGara: [],
            selectGara: ''
        }
    }

    async componentDidMount() {
        let data = await getAllGara()
        let data3 = data.DT
        let data2 = []
        data3.map((item, index) =>
            data2[index] = {
                label: item.nameGara,
                value: item.id
            })

        if (data.EC === 0) {
            this.setState({
                listGara: data2
            })
        }
    }
    handleChange = async (selectedOption) => {
        this.props.history.push(`/detailGara/${selectedOption.value}`)


    }

    render() {



        return (



            <div className='home-header-banner img-fluid'>
                <div className='content-up'>
                    <div className='title-1'>
                        MYCAR
                    </div>
                    <div className='title-2'>


                        Hệ thống đặt lịch sửa xe ôtô

                    </div>
                    <div className='search'>

                        <Select

                            placeholder={'Tìm gara nhanh'}
                            value={this.state.selectGara}
                            onChange={this.handleChange}
                            options={this.state.listGara}

                        />
                    </div>
                </div>
                <div className='content-dow'>

                </div>
            </div>


        )
    }

}



export default withRouter(HomeBody);
