import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { Faixa } from '../../components/Faixa/Faixa.js';
import '../Login/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <Faixa />
            <header className="login-navbar"></header>

            <div className="login-container">
                <div className="login-card">
                    <img src={Logo} alt="Logo" className="login-logo" />
                    <h2 className="login-titulo">Bem-vindo de volta!</h2>

                    <form>
                        <div className="login-input-group">
                            <label className="login-input-label">E-mail</label>
                            <input type="email" className="login-input-field" placeholder="E-mail" />
                        </div>

                        <div className="login-input-group">
                            <label className="login-input-label">Senha</label>
                            <input type="password" className="login-input-field" placeholder="Senha" />
                        </div>

                        <div className="login-esqueci-senha">
                            <p><Link to="/">Esqueci minha senha</Link></p>
                        </div>

                        <button
                            type="submit"
                            className="login-submit-btn"
                            style={{
                                backgroundColor: '#ffde59',
                                borderRadius: '8px',
                                border: 'none',
                                color: '#292626',
                                padding: '10px 20px',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform 0.3s ease',
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={(event) => {
                                event.preventDefault();
                                navigate('/');
                            }}
                        >
                            ENTRAR
                        </button>
                    </form>

                    <label className="login-cadastro-label" style={{ marginTop: '20px' }}>
                        Não tem conta? <Link to="/cadastro" style={{ color: '#292626', fontWeight: 'bold', textDecoration: 'none' }}>Cadastre-se aqui!</Link>
                    </label>
                </div>
            </div>
        </>
    );
};

export default Login;