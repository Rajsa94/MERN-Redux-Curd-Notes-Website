import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './screens/Login';
import MyNotes from './screens/MyNotes';
import Registration from './screens/Registration';
import {BrowserRouter, Routes,Route,} from "react-router-dom";
import CreateNnote from './screens/CreateNnote';
import Edit from './screens/Edit';
import { useState } from 'react';

function App() {
 const [search , setSearch] = useState("")
 
  return <>
    
    <BrowserRouter>
    <Navbar setSearch={(s) => setSearch(s)}/>
      <Routes>
      <Route path="/mynotes" element={<MyNotes search={search} />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Registration />}/>
      <Route path="/createnotes" element={<CreateNnote />}/>
      <Route path="/edit/:id" element={<Edit />}/>
      </Routes>
    </BrowserRouter>

  </>
}

export default App;
