import React from 'react';
import Childe from './child';
import AddComponen from './addComponen';
class Myconponets extends React.Component {
    state = {

        arrJob: [
            { id: 'abcjob1', title: 'deleit', salary: '500' },
            { id: 'abcjob2', title: 'testter', salary: '300' }
        ]
    }

    addnewJob = (job) => {
        console.log('checl', job)
        this.setState({
            arrJob: [...this.state.arrJob, job]
        })


    }
    deleteajob = (job) => {
        console.log('checl', job)
        let currenjob = this.state.arrJob;
        currenjob = currenjob.filter(item => item.id !== job.id)
        this.setState({
            arrJob: currenjob
        })
    }
    render() {
        console.log('>>call render: ', this.state)
        return (
            <>
                <AddComponen addnewJob={this.addnewJob} />

                <Childe
                    arrJob={this.state.arrJob}
                    deleteajob={this.deleteajob} />



            </>
        )
    }
}
export default Myconponets;

