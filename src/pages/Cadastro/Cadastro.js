import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { Faixa } from '../../components/Faixa/Faixa.js';
import '../../pages/Cadastro/Cadastro.css';

const Cadastro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cpf: '',
        logradouro: '',
        num_casa: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        celular: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        
        if (name === 'uf') {
            setFormData(prev => ({
                ...prev,
                [name]: value.toUpperCase()
            }));
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.nome || !formData.email || !formData.senha || !formData.cpf) {
            setError('Preencha todos os campos obrigatórios');
            return false;
        }
        
        if (formData.senha !== formData.confirmarSenha) {
            setError('As senhas não coincidem');
            return false;
        }
        
        if (formData.uf && formData.uf.length !== 2) {
            setError('UF deve ter 2 caracteres');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        
        if (!validateForm()) return;
        
        if (formData.senha !== formData.confirmarSenha) {
          setError('As senhas não coincidem');
          return;
        }
      
        setIsSubmitting(true);
      
        try {
          const { confirmarSenha, ...clienteData } = formData;
          
          const response = await fetch('http://localhost:3001/api/clientes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(clienteData)
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao cadastrar');
          }
      
          setSuccess(true);
          setTimeout(() => {
            navigate('/login', { state: { successMessage: 'Cadastro realizado com sucesso!' } });
          }, 1500);
          
        } catch (err) {
          console.error('Erro no cadastro:', err);
          setError(err.message || 'Erro ao processar cadastro');
        } finally {
          setIsSubmitting(false);
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

                    {error && (
                        <div className="error-message">
                            ⚠️ {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="success-message">
                            Cadastro realizado com sucesso! Redirecionando...
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Nome Completo *</label>
                                <input
                                    type="text"
                                    name="nome"
                                    className="input-field"
                                    placeholder="Digite seu nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">E-mail *</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input-field"
                                    placeholder="exemplo@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">CPF *</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    className="input-field"
                                    placeholder="000.000.000-00"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Celular *</label>
                                <input
                                    type="tel"
                                    name="celular"
                                    className="input-field"
                                    placeholder="(00) 00000-0000"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Logradouro *</label>
                                <input
                                    type="text"
                                    name="logradouro"
                                    className="input-field"
                                    placeholder="Rua, Avenida, etc."
                                    value={formData.logradouro}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group" style={{ maxWidth: '120px' }}>
                                <label className="input-label">Número *</label>
                                <input
                                    type="text"
                                    name="num_casa"
                                    className="input-field"
                                    placeholder="Nº"
                                    value={formData.num_casa}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Complemento</label>
                                <input
                                    type="text"
                                    name="complemento"
                                    className="input-field"
                                    placeholder="Apto, Bloco, etc."
                                    value={formData.complemento}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Bairro *</label>
                                <input
                                    type="text"
                                    name="bairro"
                                    className="input-field"
                                    placeholder="Seu bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Cidade *</label>
                                <input
                                    type="text"
                                    name="cidade"
                                    className="input-field"
                                    placeholder="Sua cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group" style={{ maxWidth: '80px' }}>
                                <label className="input-label">UF *</label>
                                <input
                                    type="text"
                                    name="uf"
                                    className="input-field"
                                    placeholder="SP"
                                    value={formData.uf}
                                    onChange={handleChange}
                                    maxLength={2}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">CEP *</label>
                                <input
                                    type="text"
                                    name="cep"
                                    className="input-field"
                                    placeholder="00000-000"
                                    value={formData.cep}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label className="input-label">Senha *</label>
                                <input
                                    type="password"
                                    name="senha"
                                    className="input-field"
                                    placeholder="Mínimo 6 caracteres"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    minLength={6}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label className="input-label">Confirmar Senha *</label>
                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    className="input-field"
                                    placeholder="Confirme sua senha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    minLength={6}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span> CADASTRANDO...
                                </>
                            ) : (
                                'CADASTRAR'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Cadastro;