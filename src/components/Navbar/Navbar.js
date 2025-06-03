import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import Perfil from '../../assets/images/perfil.png';
import Carrinho from '../../assets/images/carrinho.png';
import './Navbar.css';

export function Navbar() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        setUserEmail(localStorage.getItem("userEmail") || "");
        setUserName(localStorage.getItem("userName") || "");
    }, []);

    const handlePerfilClick = () => {
        if (userEmail) {
            setShowMenu((prev) => !prev);
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        setUserEmail("");
        setUserName("");
        setShowMenu(false);
        navigate('/login');
    };

    // Verifica se o usuário é admin
    const adminEmails = [
        'anajuliaalvesmota@gmail.com',
        'lauanegabtoledo@gmail.com',
        'miguelsoares3005@gmail.com',
        'gabrielferrarez77@gmail.com',
        'pedrohcsilva77@gmail.com'
    ];
    let usuarioEmail = localStorage.getItem('userEmail') || localStorage.getItem('usuarioEmail') || localStorage.getItem('email');
    usuarioEmail = usuarioEmail ? usuarioEmail.trim().toLowerCase() : '';
    const isAdmin = adminEmails.includes(usuarioEmail);

    return (
        <nav className="navbar">
            <div className="navbar-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>
                <div className="navbar-search">
                    <input type="text" placeholder="Pesquisar..." />
                </div>
                <ul className="navbar-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/livros">Livros</a></li>
                    <li><a href="/literatura-brasileira">Literatura Brasileira</a></li>
                    <li><a href="/sobre">Sobre nós</a></li>
                    {isAdmin && (
                        <li><a href="/dashboard">Dashboard</a></li>
                    )}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        {userName ? (
                            <span 
                                className="navbar-hello-highlight"
                                style={{ background: '#fafafa', color: '#333', fontSize: 13, fontWeight: 700, fontFamily: 'Poppins, Arial, sans-serif', marginRight: 18, cursor: 'pointer', marginLeft: -12, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 8px rgba(236, 236, 236, 0.86)' }}
                                onClick={handlePerfilClick}
                            >
                                Olá, {userName}
                                <svg style={{ marginLeft: 4 }} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1.5L6 6.5L11 1.5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        ) : (
                            <div className="navbar-icon" style={{ cursor: 'pointer', position: 'relative', marginLeft: 0, paddingLeft: 0 }} onClick={handlePerfilClick}>
                                <img src={Perfil} alt="Ícone de Perfil" style={{marginLeft: 0, paddingLeft: 0}} />
                            </div>
                        )}
                        {showMenu && userEmail && (
                            <div className="menu-dropdown-modern">
                                <button className="btn-logout-modern" onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }} width="16" height="16" fill="none" stroke="#292626" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Sair
                                </button>
                            </div>
                        )}

                    </div>
                    <div className="carrinho-icon" style={{ marginLeft: 0, cursor: 'pointer' }} onClick={() => navigate('/carrinho')}>
                        <img src={Carrinho} alt="Ícone de Carrinho de Compras" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
