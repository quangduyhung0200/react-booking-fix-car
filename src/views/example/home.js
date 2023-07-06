import React from "react";
import logo from '../../assets/img/tumblr_inline_pfk5vm5VY71sb8zbw_1280.jpg'
import Color from "../HOC/color";
import { connect } from "react-redux";
import listUser from "../user/listUser";
import './demo.scss'
class Home extends React.Component {
    handerClickuser = (user) => {
        console.log('check onlcick: ', user)
        this.props.deleteUserRedux(user)
    }
    handerAddUser = () => {
        this.props.addUserRedux();
    }
    render() {
        console.log("check props home: ", this.props)
        let listUeser = this.props.dataRedux
        return (
            <>
                <div>helo </div>

                <div>
                    {
                        listUeser && listUeser.length > 0 &&
                        listUeser.map((item, idex) => {
                            return (
                                <div key={item.id}>
                                    {idex + 1} -{item.name} <span onClick={() => this.handerClickuser(item)}> x </span>
                                </div>
                            )

                        })
                    }
                    <button onClick={() => this.handerAddUser()}> add user</button>
                </div>
            </>


        )
    }
}
const mapStateToProps = (state) => {
    return {
        dataRedux: state.users
    }

}
const mapDispatchToProp = (dispatch) => {
    return {
        deleteUserRedux: (userdelete) => dispatch({
            type: 'DELETE_USER', payload: userdelete
        }),
        addUserRedux: () => dispatch({ type: 'CREATE_USER' }),

    }
}
export default connect(mapStateToProps, mapDispatchToProp)(Color(Home))