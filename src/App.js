import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Cadastro from '../src/pages/Cadastro/Cadastro.js';
import Login from '../src/pages/Login/Login.js';
import Home from '../src/pages/Home/Home.js';
import LiteraturaBrasileira from '../src/pages/LiteraturaBrasileira/LiteraturaBrasileira.js';
import Sobre from '../src/pages/Sobre/Sobre.js';
import Livros from '../src/pages/Livros/Livros.js'
import NovoLivro from './pages/NovoLivro/NovoLivro.js';
import DetalheLivro from './pages/Livros/DetalheLivro.js';
import ConfirmacaoCompra from './pages/ConfirmarCompras/ConfirmarCompras.js';
import 'flowbite/dist/flowbite.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css'; 
import Carrinho from '../src/pages/Carrinho/Carrinho';


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

                <Route path="/comprar" element={<div style={{padding: 40, textAlign: 'center'}}>Tela de compra (em branco)</div>} />
                <Route path="/carrinho" element={<Carrinho />} />
 
            </Routes>
        </Router>
    );
}

export default App;
