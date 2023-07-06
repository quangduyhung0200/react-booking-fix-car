import axios from "axios";
import React from "react";
import {

    useParams,
} from "react-router-dom";
import withRouter1 from "../example/withRouter";
function withRouter(Component) {
    function ComponentWithRouterProp(props) {

        let params = useParams();
        return (
            <Component
                {...props}
                router={{ params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
class DetailUser extends React.Component {
    state = {
        user: []
    }
    async componentDidMount() {
        console.log(this.props)
        if (this.props.router && this.props.router.params) {
            let id = this.props.router.params.id;
            console.log("check id123123 ", this.props)
            console.log("check id ", id)
            let res = await axios.get(`https://reqres.in/api/users/${id}`);
            this.setState({
                user: res && res.data && res.data.data ? res.data.data : []
            })

        }


    }
    handleBacklishuser = () => {

        this.props.navigate(`/user`)
        console.log("check navigateasdasd", this.props);

    }
    render() {
        let { user } = this.state
        let isemty = Object.keys(user).length == 0;

        return (<>
            <div>hello deatail user {this.props.router.params.id}</div>
            {isemty === false &&
                <>
                    <div>user name: {user.first_name}-{user.last_name}</div>
                    <div>user email: {user.email}</div>
                    <div>
                        <img src={user.avatar}></img>
                    </div>
                    <button onClick={() => this.handleBacklishuser()}>Back</button>
                </>
            }
        </>)

    }

}

export default withRouter1(withRouter(DetailUser))