import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Company from "./views/components/company/company"
import User from "./views/components/user/user"
// 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComCreate from "./views/components/company/create";
import ComUpdate from "./views/components/company/update";
import ComView from "./views/components/company/viewCompany";

import UsrCreate from "./views/components/user/create";
import UsrUpdate from "./views/components/user/update";
import UsrView from "./views/components/user/viewUser";
import Add from './views/components/company/addUser';

//testiong
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/company" element={<Company/>}></Route>
    <Route path="/company/create" element={<ComCreate/>}></Route>
    <Route path="/company/:type/:id" element={<Add/>}></Route>
    <Route path="/company/update/:id" element={<ComUpdate/>}></Route>
    <Route path="/company/view/:id" element={<ComView/>}></Route>
    <Route path="/user" element={<User/>}></Route>
    <Route path="/user/view/:id" element={<UsrView/>}></Route>
    <Route path="/user/create" element={<UsrCreate/>}></Route>
    <Route path="/user/update/:id" element={<UsrUpdate/>}></Route>
    <Route path="*" element={<Company/>} />
    
      </Routes>
      <ToastContainer theme="colored" />
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
