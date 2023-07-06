import React from "react";
import axios from "axios";
import "./listUser.scss"

import withRouter1 from "../example/withRouter";




class ListUser extends React.Component {
    state = {
        listUser: []
    }
    async componentDidMount() {

        let res = await axios.get('https://reqres.in/api/users?page=1');
        this.setState({
            listUser: res && res.data && res.data.data ? res.data.data : []
        })
    }
    handleViewDetalUser = (user) => {

        this.props.navigate(`/user/${user.id}`)
        console.log("check navigateasdasd", this.props);




    }
    render() {
        let { listUser } = this.state;
        return (
            <div className="list-user-contener">
                <div className="title">
                    fech all user
                </div>
                <div className="list-user-conten">
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <div className="child" key={item.id} onClick={() => this.handleViewDetalUser(item)}>
                                {index + 1}- {item.fist_name} - {item.last_name}
                            </div>

                        )
                    })}

                </div>
            </div>
        )
    }
}
export default withRouter1(ListUser) 