import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { Faixa } from '../../components/Faixa/Faixa.js';
import '../Login/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentName, setCurrentName] = useState("");

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        if (localStorage.getItem("userEmail") && userName) {
            setLoggedIn(true);
            setCurrentName(userName);
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !senha) return;
        try {
            // Buscar usuário pelo e-mail no backend
            const res = await fetch('http://localhost:3001/api/clientes?email=' + encodeURIComponent(email));
            if (!res.ok) throw new Error('Usuário não encontrado');
            const user = await res.json();
            if (!user || !user.nome) throw new Error('Usuário não encontrado');
            // Aqui você pode validar a senha se desejar
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.nome);
            navigate("/");
        } catch (err) {
            setError('Usuário não encontrado ou erro no login');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        setLoggedIn(false);
        setCurrentName("");
        navigate("/login");
    };

    return (
        <>
            <Faixa />
            <header className="login-navbar"></header>

            <div className="login-container">
                <div className="login-card">
                    <img src={Logo} alt="Logo" className="login-logo" />
                    <h2 className="login-titulo">Bem-vindo de volta!</h2>

                    {loggedIn ? (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Olá, {currentName}!</div>
                            <button onClick={handleLogout} style={{ background: '#ffde59', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 600, color: '#292626', cursor: 'pointer', fontSize: 15 }}>Sair</button>
                        </div>
                    ) : (
                        <form onSubmit={handleLogin}>
                            <div className="login-input-group">
                                <label className="login-input-label">E-mail</label>
                                <input type="email" className="login-input-field" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>

                            <div className="login-input-group">
                                <label className="login-input-label">Senha</label>
                                <input type="password" className="login-input-field" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
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
                            >
                                ENTRAR
                            </button>
                            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
                        </form>
                    )}

                    <label className="login-cadastro-label" style={{ marginTop: '20px' }}>
                        Não tem conta? <Link to="/cadastro" style={{ color: '#292626', fontWeight: 'bold', textDecoration: 'none' }}>Cadastre-se aqui!</Link>
                    </label>
                </div>
            </div>
        </>
    );
};

export default Login;