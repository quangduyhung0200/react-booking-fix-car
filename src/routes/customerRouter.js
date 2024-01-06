import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "../components/login/login";
import React, { Component } from 'react';
import Register from "../components/register/register";
import PrivateRole from "./PrivateRole";
import { UserContext } from "../context/userContext";
import ManageUser from "../components/system/manageUser/manageUser";
import HomePage from "../components/home/homePage";
import RegisterGara from "../components/register/registerGara";
import DetailGara from "../components/customer/gara/garaDetail"
import ManageGara from "../components/Gara/manageGara";
import PickCar from "../components/Gara/pickCar";
import GaraSchedule from "../components/customer/gara/schedule";
import ManageSchedule from "../components/Gara/manageSchedule";
import VerifyEmail from "../components/customer/vetifyEmail";
import ManageBookingGara from "../components/Gara/manageBooking";
import ManageOrder from "../components/Gara/manageOrder.js";
import MyOrder from "../components/customer/gara/MyOrder.js";
import DetailAccount from "../components/customer/manageAccount/manageAccount.js"
import AllGara from "../components/home/listGara/allGara.js";
import AllHandBook from "../components/home/listHandBook/allHandBook.js";
import detailHandBook from "../components/customer/handBook/detailHandBook.js";
import { getUserById } from "../services/userService.js";
import UpadateGara from "../components/Gara/updateGara.js";
class CustommerRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {

            garaId: ''


        }
    }
    async componentDidMount() {
        console.log('user', this.context.user.account.id)
        let res = await getUserById(this.context.user.account.id)
        if (res.EC === 0) {
            this.setState({
                garaId: res.DT.userGara ? res.DT.userGara.id : ''
            })
        }
        console.log(res)
    }


    render() {

        let { garaId } = this.state
        return (
            <>
                <>
                    <Switch>






                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route exact path="/">
                            <HomePage />
                        </Route>
                        <PrivateRole exact path="/RegisterGara" component={RegisterGara} />

                        <PrivateRole exact path="/myOrder" component={MyOrder} />
                        <PrivateRole path="/Account" component={DetailAccount} />

                        <Route exact path="/allGara">
                            <AllGara />
                        </Route>
                        <Route exact path="/AllHandBook">
                            <AllHandBook />
                        </Route>

                        <Route path='/detailHandbook/:id' exact component={detailHandBook} />

                        {garaId !== '' && <PrivateRole exact path="/mygara" component={ManageGara} />}
                        {garaId !== '' && <PrivateRole exact path='/UpadateGara' component={UpadateGara} />}
                        <Route path="/vetyfy-booking" exact component={(VerifyEmail)} />

                        <Route path='/detailGara/:id' exact component={DetailGara} />

                        <Route path="*" >
                            404not fout
                        </Route>

                    </Switch>
                </>

            </>

        )
    }



}
CustommerRouter.contextType = UserContext
export default CustommerRouter