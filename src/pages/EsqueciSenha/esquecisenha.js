import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Logo from '../../assets/images/logo.png';
import { Faixa } from '../../components/Faixa/Faixa.js';
import './EsqueciSenha.css'; 

const EsqueciSenha = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [etapa, setEtapa] = useState(1);
    const [error, setError] = useState("");

    const verificarDados = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/verificar-dados-recuperacao`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, cpf })
            });

            if (!res.ok) throw new Error('Dados incorretos');
            setEtapa(2);
        } catch (err) {
            setError("E-mail ou CPF não correspondem");
        }
    };

    const redefinirSenha = async () => {
        try {
            const res = await fetch(`http://localhost:3001/api/redefinir-senha`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, novaSenha })
            });

            if (!res.ok) throw new Error('Erro ao redefinir senha');
            alert('Senha alterada com sucesso!');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Faixa />
            <div className="login-container">
                <div className="login-card">
                    <img src={Logo} alt="Logo" className="login-logo" />
                    <h2 className="login-titulo">Redefinir Senha</h2>

                    {etapa === 1 ? (
                        <>
                            <div className="login-input-group">
                                <label className="login-input-label">E-mail</label>
                                <input
                                    type="email"
                                    className="login-input-field"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="login-input-group">
                                <label className="login-input-label">CPF</label>
                                <input
                                    type="text"
                                    className="login-input-field"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>
                            <button
                                className="login-submit-btn"
                                onClick={verificarDados}
                            >
                                Verificar
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="login-input-group">
                                <label className="login-input-label">Nova Senha</label>
                                <input
                                    type="password"
                                    className="login-input-field"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="login-submit-btn"
                                onClick={redefinirSenha}
                            >
                                Redefinir Senha
                            </button>
                        </>
                    )}

                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                    <Link to="/login" style={{ marginTop: '20px', display: 'block' }}>
                        Voltar para Login
                    </Link>
                </div>
            </div>
        </>
    );
};

export default EsqueciSenha;