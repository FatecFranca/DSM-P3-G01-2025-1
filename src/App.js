import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Cadastro from '../src/pages/Cadastro/Cadastro.js';
import Login from '../src/pages/Login/Login.js';
import Home from '../src/pages/Home/Home.js';
import LiteraturaBrasileira from '../src/pages/LiteraturaBrasileira/LiteraturaBrasileira.js';
import Sobre from '../src/pages/Sobre/Sobre.js';
import Livros from '../src/pages/Livros/Livros.js'
import NovoLivro from './pages/NovoLivro/NovoLivro.js';
import DetalheLivro from './pages/Livros/DetalheLivro.js';
import ConfirmarCompras from './pages/ConfirmarCompras/ConfirmarCompras.js';
import 'flowbite/dist/flowbite.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css'; 
import Carrinho from '../src/pages/Carrinho/Carrinho';
import Dashboard from './pages/Dashboard/Dashboard';
import Autores from './pages/Autores/Autores';
import Usuarios from './pages/Usuarios/Usuarios';
import ComprarAgora from './pages/ComprarAgora/comprar';
import EnderecoComprar from './pages/EnderecoComprar/endereco';


function App() {
    return (
        <Router>
           <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/livros" element={<Livros />} /> 
                <Route path="/livros/:id" element={<DetalheLivro />} />
                <Route path="/sobre" element={<Sobre/>} />
                <Route path="/literatura-brasileira" element={<LiteraturaBrasileira />} />
                <Route path="/novo-livro" element={<NovoLivro />} />
                <Route path="/comprar" element={<ComprarAgora/>} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/endereco" element={<EnderecoComprar />} />
                <Route path="/confirmar-compra" element={<ConfirmarCompras />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/autores" element={<Autores />} />
                <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
        </Router>
    );
}

export default App;
