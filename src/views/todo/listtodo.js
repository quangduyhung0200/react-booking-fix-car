import React from "react";
import './listTodo.scss'
import Addtodo from "./addTodo";
import { ToastContainer, toast } from 'react-toastify';
import Color from "../HOC/color";
class ListTodo extends React.Component {
    state = {
        listTodos:
            [
                { id: '123', title: 'doinghomework' },
                { id: '124', title: 'playvideogame' },
                { id: '125', title: 'fix bug' }

            ],
        editTodo: {}
    }
    Addnewtodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })
    }
    handleDeletetodo = (todo) => {
        let currentodo = this.state.listTodos;
        currentodo = currentodo.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentodo
        })
        toast.success('delete success')

    }
    handleedittodo = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isemty = Object.keys(editTodo).length == 0;
        if (isemty === false && editTodo.id === todo.id) {
            let listtodocopy = [...listTodos];
            let objIndex = listtodocopy.findIndex((item => item.id === todo.id));
            //Update object's name property.
            listtodocopy[objIndex].title = editTodo.title;
            this.setState({
                listTodos: listtodocopy,
                editTodo: ''
            })
            toast.success('update success');
            return;

        }

        this.setState({
            editTodo: todo
        })


    }
    handldeedittodo = (event) => {
        let edittodocopy = { ...this.state.editTodo };
        edittodocopy.title = event.target.value;
        this.setState({
            editTodo: edittodocopy
        })
    }
    render() {
        let { listTodos, editTodo } = this.state;
        let isemty = Object.keys(editTodo).length == 0;
        console.log('check emty: ', isemty);
        console.log('check state: ', listTodos)
        return (
            <div className="list-todo-contener">
                <Addtodo addnewtodo={this.Addnewtodo} />
                <div className="list-todo-conten">
                    {listTodos && listTodos.length > 0 &&
                        listTodos.map((item, index) => {
                            return (

                                <div className="todo-childe" key={item.id}>
                                    {isemty === true ?
                                        <spane>{index + 1}-{item.title} </spane> :
                                        <>{editTodo.id === item.id ?
                                            < span >
                                                {index + 1}-<input value={editTodo.title}
                                                    onChange={(event) => this.handldeedittodo(event)}></input>
                                            </span> :
                                            <spane>{index + 1}-{item.title} </spane>
                                        }
                                        </>

                                    }
                                    <button className="edit" onClick={() => this.handleedittodo(item)}> {isemty === false && editTodo.id === item.id ? 'save' : 'edit'}</button>
                                    <button className="delete" onClick={() => this.handleDeletetodo(item)}>delete</button>
                                </div>

                            )
                        })
                    }
                </div>
            </div >
        )

    }
}
export default Color(ListTodo);