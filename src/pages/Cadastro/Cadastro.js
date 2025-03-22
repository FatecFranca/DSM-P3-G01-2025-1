import React, { useState } from 'react';
import Logo from '../../assets/images/logo.png';
import { Faixa } from '../../components/Faixa/Faixa.js';
import '../../pages/Cadastro/Cadastro.css';

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [isHovered, setIsHovered] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (nome && email && senha && confirmarSenha) {
            if (senha === confirmarSenha) {
                alert('Cadastro realizado com sucesso!');
                console.log({ nome, email, senha });
            } else {
                alert('As senhas não coincidem.');
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <>
            <Faixa />
            <header className="navbar"></header>

            <div className="form-container">
                <div className="form-card">
                    <img src={Logo} alt="Logo" className="logo" />
                    <h2 className="titulo-bemvindo">Seja bem-vindo!</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Linha 1: Nome e E-mail */}
                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Nome</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Digite seu nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">E-mail</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Linha 2: Senha e Confirmar Senha */}
                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Senha</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Digite sua senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Confirmar Senha</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Confirme a senha"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Botão de CADASTRAR */}
                        <button
                            type="submit"
                            className="btn-submit"
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
                            CADASTRAR
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Cadastro;