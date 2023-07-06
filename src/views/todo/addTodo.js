import React from "react";
import { ToastContainer, toast } from 'react-toastify';
class Addtodo extends React.Component {
    state = {
        title: ''
    }
    handldechanetitle = (event) => {
        this.setState({
            title: event.target.value
        })

    }
    handleADDtodo = () => {
        if (!this.state.title) {
            toast.error("missing value")

            return;
        }
        let todo = {
            id: Math.floor(Math.random() * 1000),
            title: this.state.title
        }
        this.props.addnewtodo(todo)
        this.setState({
            title: '',

        })
        toast.success("add succes")
    }
    render() {
        let { title } = this.state;
        return (
            <div className="add-todo" >
                <input type="text" value={title} onChange={(event) => this.handldechanetitle(event)}></input>
                <button type="button" className="add"
                    onClick={(event) => this.handleADDtodo()}>add</button>
            </div>
        )
    }


}
export default Addtodo