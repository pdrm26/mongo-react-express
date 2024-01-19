import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Users from "./pages/Users";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";

export default function App() {
  return <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route path='/add-user' element={<AddUser />}/>
    <Route path='/users' element={<Users />}/>
    <Route path='/' element={<Home />}/>
  </Routes>
  </BrowserRouter>
</React.StrictMode>

}
