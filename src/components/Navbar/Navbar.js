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

    return (
        <nav className="navbar">
            <div className="navbar-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div className="navbar-logo">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>
                <div className="navbar-search">
                    <input type="text" placeholder="Pesquisar..." />
                </div>
                <ul className="navbar-links" style={{ flex: 1, display: 'flex', justifyContent: 'center', marginLeft: 0, marginRight: 0 }}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/livros">Livros</a></li>
                    <li><a href="/literatura-brasileira">Literatura Brasileira</a></li>
                    <li><a href="/sobre">Sobre nós</a></li>
                </ul>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {userName && (
                            <span 
                                style={{ color: '#292626', fontSize: 13, fontWeight: 600, marginRight: 0, paddingRight: 0, cursor: 'pointer' }}
                                onClick={handlePerfilClick}
                            >
                                {userName}
                            </span>
                        )}
                        <div className="navbar-icon" style={{ cursor: 'pointer', position: 'relative', marginLeft: 0, paddingLeft: 0 }} onClick={handlePerfilClick}>
                            <img src={Perfil} alt="Ícone de Perfil" style={{marginLeft: 0, paddingLeft: 0}} />
                            {showMenu && userEmail && (
                                <div style={{
                                    position: 'absolute',
                                    top: '110%',
                                    right: '-10px',
                                    background: '#fff',
                                    border: '2.5px solid rgba(0,0,0,0.5)',
                                    borderRadius: 10,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                                    padding: '12px 20px',
                                    minWidth: 180,
                                    zIndex: 1002,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: -14,
                                        right: 24,
                                        width: 0,
                                        height: 0,
                                        borderLeft: '10px solid transparent',
                                        borderRight: '10px solid transparent',
                                        borderBottom: '14px solid rgba(0,0,0,0.5)',
                                        zIndex: 1003
                                    }} />
                                    <div style={{ color: '#292626', marginBottom: 8, fontSize: 14 }}>{userEmail}</div>
                                    <button onClick={handleLogout} style={{ background: '#ffde59', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, color: '#292626', cursor: 'pointer', fontSize: 13, alignSelf: 'flex-start' }}>Sair</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="carrinho-icon" style={{ marginLeft: 0 }}>
                        <img src={Carrinho} alt="Ícone de Carrinho de Compras" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

