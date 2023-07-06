import React from "react";
class AddComponen extends React.Component {
    state = {
        title: '',
        salary: '',
    }

    handleChangetitlejob = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    handleChangetisalary = (event) => {
        this.setState({
            salary: event.target.value
        })
    }
    hanldleSunmid = (event) => {
        event.preventDefault();
        if (!this.state.title || !this.state.salary) {
            alert('missing requier params')
            return;
        }
        console.log(this.state);
        this.props.addnewJob({
            id: Math.floor(Math.random() * 11),
            title: this.state.title,
            salary: this.state.salary
        }


        )
        this.setState({
            title: '',
            salary: ''
        })
    }

    render() {
        return (
            <form>
                <label htmlFor='fname'>title</label><br></br>
                <input type='text'
                    value={this.state.title}
                    onChange={(event) => { this.handleChangetitlejob(event) }}>

                </input>
                <br></br>
                <label htmlFor='address1'>salary</label><br></br>
                <input
                    type='text'
                    value={this.state.salary}
                    onChange={(event) => { this.handleChangetisalary(event) }}></input>

                <br></br>
                <input type='submit' value={'submit'}
                    onClick={(event) => this.hanldleSunmid(event)}
                ></input>


            </form>
        )
    }
}
export default AddComponen;