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
import AllGara from "../components/home/listGara/allGara.js";
import detailHandBook from "../components/customer/handBook/detailHandBook.js";
import AllHandBook from "../components/home/listHandBook/allHandBook.js";
import Forget_pasword from "../components/login/forget_pasword.js";
class AppRouter extends Component {




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

                        <Route exact path="/allGara">
                            <AllGara />
                        </Route>
                        <Route exact path="/AllHandBook">
                            <AllHandBook />
                        </Route>

                        <Route exact path="/forgotpassword">
                            <Forget_pasword />
                        </Route>



                        <Route path='/detailHandbook/:id' exact component={detailHandBook} />
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
export default AppRouter