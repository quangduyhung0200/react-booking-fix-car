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
import ManageCar from "../components/system/manageCar/manageCar";
import ManageGara from "../components/system/manageGara/manageGara";
import ManageSchedule from "../components/system/ManageSchedule/ManageSchedule";
import DetailGara from "../components/customer/gara/garaDetail";
import CheckDetailGara from "../components/system/manageGara/checkDetailGara";
import MyOrder from "../components/customer/gara/MyOrder.js";
import VerifyEmail from "../components/customer/vetifyEmail";
import PickCar from "../components/Gara/pickCar";
import ManageBookingGara from "../components/Gara/manageBooking";
import ManageOrder from "../components/Gara/manageOrder.js";
import checkDetailHandBook from "../components/system/manageHandbook/checkDetailHandBook.js";
import ManageGaraHandBookHasNotPass from "../components/system/manageHandbook/manageHandBook.js";
class AdminRouter extends Component {




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


                        <PrivateRole exact path="/myOrder" component={MyOrder} />
                        <PrivateRole path='/user' component={ManageUser} />
                        <PrivateRole path='/gara' component={ManageGara} />
                        <PrivateRole path='/car' component={ManageCar} />
                        <PrivateRole path='/schedule' component={ManageSchedule} />
                        <PrivateRole path='/checkdetailGara/:id' component={CheckDetailGara} />
                        <PrivateRole path='/detailGara/:id' component={DetailGara} />
                        <PrivateRole path='/manage-handBook' component={ManageGaraHandBookHasNotPass} />
                        <PrivateRole path='/checkdetailHandBook/:id' component={checkDetailHandBook} />





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
export default AdminRouter