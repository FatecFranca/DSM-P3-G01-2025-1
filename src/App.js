import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Cadastro from '../src/pages/Cadastro/Cadastro.js';
import Login from '../src/pages/Login/Login.js';
import Home from '../src/pages/Home/Home.js';
import LiteraturaBrasileira from '../src/pages/LiteraturaBrasileira/LiteraturaBrasileira.js';
import Sobre from '../src/pages/Sobre/Sobre.js';
import Livros from '../src/pages/Livros/Livros.js'
import NovoLivro from './pages/NovoLivro/NovoLivro.js';
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
                <Route path="/livros" element={<Livros />} /> 
                <Route path="/sobre" element={<Sobre/>} />
                <Route path="/literatura-brasileira" element={<LiteraturaBrasileira />} />
                <Route path="/novo-livro" element={<NovoLivro />} />
            </Routes>
        </Router>
    );
}

export default App;
