import React from 'react';
import Childe from './child';

class Myconponets extends React.Component {
    state = {
        name: 'duyhung1',
        address: 'sonla',
        arrJob: [
            { id: 'abcjob1', title: 'deleit', salary: '500' },
            { id: 'abcjob2', title: 'testter', salary: '300' }
        ]
    }
    handleChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }
    hanldleSunmid = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        console.log('>>call render: ', this.state)
        return (
            <>

                <form>
                    <label htmlFor='fname'>first name</label><br></br>
                    <input type='text'
                        value={this.state.name}
                        onChange={(event) => { this.handleChangeName(event) }}>

                    </input>
                    <br></br>
                    <label htmlFor='address1'>Address</label><br></br>
                    <input
                        type='text'
                        value={this.state.address}
                        onChange={(event) => { this.handleChangeAddress(event) }}></input>
                    <br></br>
                    <input type='submit' value={'submit'}
                        onClick={(event) => this.hanldleSunmid(event)}
                    ></input>

                </form>
                <Childe name={this.state.name}
                    age={'25'}
                    arrJob={this.state.arrJob} />


            </>
        )
    }
}
export default Myconponets;

