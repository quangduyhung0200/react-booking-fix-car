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
import UpadateGara from "../components/Gara/updateGara.js";
import DetailAccount from "../components/customer/manageAccount/manageAccount.js"
class GaraRouter extends Component {




    render() {


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

                        <PrivateRole exact path="/mygara" component={ManageGara} />
                        <PrivateRole exact path="/pickcar" component={PickCar} />
                        <PrivateRole exact path="/setSchedule" component={ManageSchedule} />
                        <PrivateRole exact path="/manageBooking" component={ManageBookingGara} />
                        <PrivateRole exact path="/manageOrder" component={ManageOrder} />
                        <PrivateRole exact path="/myOrder" component={MyOrder} />
                        <PrivateRole exact path='/UpadateGara/:id' component={UpadateGara} />
                        <PrivateRole path="/Account" component={DetailAccount} />






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
export default GaraRouter