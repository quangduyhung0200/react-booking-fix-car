import React, { Component } from 'react';




import 'moment/locale/vi';
import moment from 'moment';


import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { readAllCarByGara } from '../../../services/guestService';
class ExtralDataGara extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {




    }
    async componentDidUpdate(prevProps, prevState, snapshot) {


    }



    render() {


        return (
            <>
                <div>asdadasd</div>

            </>
        );
    }
}



export default withRouter(ExtralDataGara);