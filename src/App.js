import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Cadastro from '../src/pages/Cadastro/Cadastro.js';
import Login from '../src/pages/Login/Login.js';
import Home from '../src/pages/Home/Home.js';
import LiteraturaBrasileira from '../src/pages/LiteraturaBrasileira/LiteraturaBrasileira.js';
import Sobre from '../src/pages/Sobre/Sobre.js';
import 'flowbite/dist/flowbite.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css'; 



function App() {
    return (
        <Router>
           <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="*" element={<Navigate to="/" />} /> 
                <Route path="/sobre" element={<Sobre/>} />
                <Route path="/literatura-brasileira" element={<LiteraturaBrasileira />} />
            </Routes>
        </Router>
    );
}

export default App;
