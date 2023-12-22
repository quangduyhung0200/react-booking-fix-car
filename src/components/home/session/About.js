import React, { Component } from 'react';


import './About.scss'

class About extends Component {

    render() {


        return (
            <><div className='about-container'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12'>asdasdasdasd</div>
                        <div className='conten-left col-6'>
                            <iframe
                                width="100%"
                                height="300px"
                                src="https://www.youtube.com/embed/iLoJQdGjXRU"
                                title="maybe i should get out more..."
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                        </div>
                        <div className='conten-right col-6'>
                            <p>toi ten la quang duy hung</p>
                        </div>

                    </div>

                </div>

            </div>

            </>

        );
    }

}


export default About;
