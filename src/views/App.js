import logo from './logo.svg';
import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './nav/nav';
import Home from './example/home';
import Myconponets from './example/myconponets';
import DetailUser from './user/detailUser';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ListTodo from './todo/listtodo';
import ListUser from './user/listUser';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">







          <Nav></Nav>
          <img src={logo} className="App-logo" alt="logo" />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Myconponets />} />
            <Route path="/todo" element={<ListTodo />} />
            <Route path="/user" element={<ListUser />} />
            <Route path="/user/:id" element={<DetailUser />} />

          </Routes>

        </header>
        <ToastContainer
          position="top-right"
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

        <ToastContainer />



      </div>
    </BrowserRouter>
  );
}

export default App;
