import React from 'react';
import './demo.scss'

class Childe extends React.Component {

    state = {
        showJob: false
    }
    handldeShowHide = () => {
        this.setState({
            showJob: !this.state.showJob
        })
    }
    handleONclickdelete = (job) => {
        console.log('>>>check delete: ', job)
        this.props.deleteajob(job);
    }
    render() {
        console.log('>>check prop: ', this.props)
        let { arrJob } = this.props;
        let showJob1 = this.state.showJob;
        let check = showJob1 === true ? 'showjob=true' : 'showob = false ';
        console.log('check: ', check);
        console.log(showJob1)
        return (
            <>
                {showJob1 === false ?
                    < div >
                        <button className='btn-show' onClick={() => this.handldeShowHide()}>show1</button>
                    </div >
                    :
                    <>
                        <div className='job-list'>
                            {
                                arrJob.map((item, idex) => {
                                    return (
                                        <div key={item.id}>
                                            {item.title}- {item.salary}<></> <></> <span onClick={() => this.handleONclickdelete(item)}>x</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <button onClick={() => this.handldeShowHide()}>hide</button>
                        </div>
                    </>
                }




            </>
        )
    }
}

/*
const Childe = (props) => {
    console.log('check childe: ', props)
    let { arrJob } = props;
    return (
        <>

            <div className='job-list'>
                {
                    arrJob.map((item, idex) => {
                        if (item.salary >= 500) {
                            return (
                                <div key={item.id}>
                                    {item.title}- {item.salary}
                                </div>
                            )

                        }

                    })
                }
            </div>


        </>
    )
}*/
export default Childe;

