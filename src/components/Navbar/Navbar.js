import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import Perfil from '../../assets/images/perfil.png';
import Carrinho from '../../assets/images/carrinho.png';
import './Navbar.css';


export function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">

            <div className="navbar-content">  
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>

                <div className="navbar-search">
                    <input type="text" placeholder="Pesquisar..." />
                </div>

                <ul className="navbar-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">Livros</a></li>
                    <li><a href="/literatura-brasileira">Literatura Brasileira</a></li>
                    <li><a href="/sobre">Sobre nós</a></li>
                </ul>

                <div className="navbar-icon" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                    <img src={Perfil} alt="Ícone de Perfil" />
                </div>

                <div className="carrinho-icon">
                    <img src={Carrinho} alt="Ícone de Carrinho de Compras" />
                </div>
            </div>
        </nav>
    );
}

