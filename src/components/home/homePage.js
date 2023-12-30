import React, { Component } from 'react';




import './Homepage.scss'
import HomeBody from './session/homeBody';
import HomeFooter from './homeFooter/homeFooter';
import OutStandingGara from './session/OutStandingGara'
import About from './session/About';
import HandBook from './session/HandBook';
import ForYou from './session/ForYou';
class HomePage extends Component {

    render() {


        return (
            <>

                <HomeBody />
                <OutStandingGara />
                <ForYou />
                <HandBook />
                <About />

                <HomeFooter />
                <div style={{ height: '300px' }}>         </div >

            </>

        );
    }

}


export default HomePage;
