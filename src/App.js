
import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/login/login';
import { Rings } from 'react-loader-spinner'
import AppRouter from './routes/appRouter';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { UserContext } from "./context/userContext"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navigate from './components/nav/Nav';
import NavigateGara from './components/nav/Nav_Gara';
import NavigateAdmim from './components/nav/Nav_Admin';
import NavigateStaff from './components/nav/Nav_staff';
import AdminRouter from './routes/adminRole';

function App() {

  let windowHeight = window.innerHeight

  const { user } = React.useContext(UserContext);
  return (
    <>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Scrollbars autoHide style={{ height: windowHeight }}>
        <Router>
          {user && user.isLoading === true ?
            <>
              <div className='loading-container'>
                <Rings
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"

                  colors={['#1877f2']}
                />
                <div className='loading-text'>loading data</div>
              </div>
            </> :

            <>
              {user && user.isAuthenticated === true && user.account.role[0].id === 2 ?
                <>
                  <div className='nav-container'>
                    <NavigateGara />
                  </div>
                  <div className='app-container'>
                    <AppRouter />
                  </div>
                </>
                :
                <>
                  {user && user.isAuthenticated === true && user.account.role[0].id === 3 ?
                    <>
                      <div className='nav-container'>
                        <NavigateStaff />
                      </div>
                      <div className='app-container'>
                        <AppRouter />
                      </div>
                    </>
                    :
                    <>
                      {user && user.isAuthenticated === true && user.account.role[0].id === 4 ?
                        <>
                          <div className='nav-container'>
                            <NavigateAdmim />
                          </div>
                          <div className='app-container'>
                            <AdminRouter />
                          </div>
                        </>
                        :
                        <>
                          <div className='nav-container'>
                            <Navigate />
                          </div>
                          <div className='app-container'>
                            <AppRouter />
                          </div> </>
                      }
                    </>
                  }

                </>
              }

            </>
          }




          {/* Same as */}

        </Router>
      </Scrollbars>


    </ >
  );
}

export default App;
