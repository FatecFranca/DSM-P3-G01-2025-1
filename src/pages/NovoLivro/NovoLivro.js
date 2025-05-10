import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Faixa } from '../../components/Faixa/Faixa.js';
import '../../pages/NovoLivro/NovoLivro.css'; 

const NovoLivro = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [capa, setCapa] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCapa(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação e envio futuro
    // Aqui, você pode fazer o upload do arquivo (capa) para o servidor, por exemplo.
    navigate('/livros');
  };

  return (
    <>
      <Faixa />
      <header className="login-navbar"></header>

      <div className="form-container">
        <div className="form-card">
          <h2 className="titulo-bemvindo">Cadastro de Livro</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">ID *</label>
                <input type="text" name="id" className="input-field" placeholder="ID do livro" required />
              </div>
              <div className="input-group">
                <label className="input-label">Título *</label>
                <input type="text" name="titulo" className="input-field" placeholder="Título do livro" required />
              </div>
              <div className="input-group">
                <label className="input-label">Autor *</label>
                <input type="text" name="autor" className="input-field" placeholder="Nome do autor" required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Editora *</label>
                <input type="text" name="editora" className="input-field" placeholder="Nome da editora" required />
              </div>
              <div className="input-group">
                <label className="input-label">ISBN *</label>
                <input type="text" name="isbn" className="input-field" placeholder="Código ISBN" required />
              </div>
              <div className="input-group">
                <label className="input-label">Ano de Publicação *</label>
                <input type="number" name="ano" className="input-field" placeholder="Ex: 2023" required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Gênero *</label>
                <select name="genero" className="input-field" required>
                  <option value="">Selecione o gênero</option>
                  <option value="Romance">Romance</option>
                  <option value="Aventura">Aventura</option>
                  <option value="Ficção Científica">Ficção Científica</option>
                  <option value="Terror">Terror</option>
                  <option value="Mistério">Mistério</option>
                  <option value="Fantasia">Fantasia</option>
                  <option value="Biografia">Biografia</option>
                  <option value="Não-ficção">Não-ficção</option>
                  <option value="História">História</option>
                  <option value="Poesia">Poesia</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Preço (R$) *</label>
                <input type="number" step="0.01" name="preco" className="input-field" placeholder="Ex: 49.90" required />
              </div>
              <div className="input-group">
                <label className="input-label">Quantidade em Estoque *</label>
                <input type="number" name="quantidade" className="input-field" placeholder="Ex: 100" required />
              </div>
            </div>

            
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Capa do Livro *</label>
                <input 
                  type="file" 
                  name="capa" 
                  className="input-field" 
                  accept="image/*" 
                  required
                  onChange={handleFileChange} 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group" style={{ width: '100%' }}>
                <label className="input-label">Sinopse *</label>
                <textarea
                  name="sinopse"
                  className="input-field"
                  placeholder="Escreva a sinopse do livro"
                  rows="4"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
            >
              Cadastrar Livro
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NovoLivro;
