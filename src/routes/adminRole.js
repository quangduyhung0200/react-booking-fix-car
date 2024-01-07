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
import ManageGaraFromStaffNotYetPass from "../components/system/manageGara/manageGara";
import ManageSchedule from "../components/Gara/manageSchedule.js";
import DetailGara from "../components/customer/gara/garaDetail";
import CheckDetailGara from "../components/system/manageGara/checkDetailGara";
import MyOrder from "../components/customer/gara/MyOrder.js";
import VerifyEmail from "../components/customer/vetifyEmail";

import ManageBookingGara from "../components/Gara/manageBooking";
import ManageOrder from "../components/Gara/manageOrder.js";
import checkDetailHandBook from "../components/system/manageHandbook/checkDetailHandBook.js";
import ManageGaraHandBookHasNotPass from "../components/system/manageHandbook/manageHandBookUncensorship.js";
import ManageHandbook from "../components/system/manageHandbook/manageHankbook.js"
import AddNewHandBook from "../components/Staff/addNewHandBook.js";
import UpdateHandBook from "../components/Staff/updateHandBook.js";
import ManageGaraStaff from "../components/Staff/manageGara.js";

import detailHandBook from "../components/customer/handBook/detailHandBook.js";
import PickCar from "../components/Gara/pickCar";
import ManageBookingStaff from "../components/system/manageBooking/manageBooking.js"
import manageCarCompany from "../components/system/manageCarCompany/manageCarCompany.js";
import manageComment from "../components/system/manageComment/manageComment.js";
import DetailCar from "../components/customer/car/carDetail.js"
import UpadateGaraAdmin from "../components/system/manageGara/updateGaraAdmin.js";
import DetailAccount from "../components/customer/manageAccount/manageAccount.js"
import AllGara from "../components/home/listGara/allGara.js";
import AllHandBook from "../components/home/listHandBook/allHandBook.js";
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
                        <Route exact path="/allGara">
                            <AllGara />
                        </Route>
                        <Route exact path="/AllHandBook">
                            <AllHandBook />
                        </Route>


                        <PrivateRole exact path="/myOrder" component={MyOrder} />
                        <PrivateRole path='/user' component={ManageUser} />

                        <PrivateRole path='/car' component={ManageCar} />
                        <PrivateRole path="/manageBooking" component={ManageBookingGara} />
                        <PrivateRole path="/setSchedule" component={ManageSchedule} />
                        <PrivateRole path='/checkdetailGara/:id' component={CheckDetailGara} />
                        <PrivateRole path='/detailGara/:id' component={DetailGara} />
                        <PrivateRole path='/manage-handBookuncensorship' component={ManageGaraHandBookHasNotPass} />
                        <PrivateRole path='/manage-handBook' component={ManageHandbook} />
                        <PrivateRole path='/checkdetailHandBook/:id' component={checkDetailHandBook} />
                        <PrivateRole exact path="/addNewHandBook" component={AddNewHandBook} />
                        <PrivateRole path='/updateHandbook' component={UpdateHandBook} />
                        <PrivateRole path='/ManageGara' component={ManageGaraStaff} />
                        <PrivateRole path='/ManageGarahasntPass' component={ManageGaraFromStaffNotYetPass} />
                        <PrivateRole path='/UpadateGara/:id' component={UpadateGaraAdmin} />
                        <PrivateRole path='/detailHandbook/:id' component={detailHandBook} />
                        <PrivateRole path='/manage-PickCar' component={PickCar} />
                        <PrivateRole path='/manage-booking' component={ManageBookingStaff} />
                        <PrivateRole path='/manage-carCompany' component={manageCarCompany} />
                        <PrivateRole path='/manage-comment' component={manageComment} />
                        <PrivateRole path='/detailCar/:id' component={DetailCar} />
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
export default AdminRouter