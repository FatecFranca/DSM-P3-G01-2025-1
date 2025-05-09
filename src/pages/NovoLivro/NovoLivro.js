import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Faixa } from '../../components/Faixa/Faixa.js';
import '../../pages/Cadastro/Cadastro.css';

const NovoLivro = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação e envio futuro
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
                <input type="text" name="id" className="input-field" placeholder="ID do livro" />
              </div>
              <div className="input-group">
                <label className="input-label">Título *</label>
                <input type="text" name="titulo" className="input-field" placeholder="Título do livro" />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Autor *</label>
                <input type="text" name="autor" className="input-field" placeholder="Nome do autor" />
              </div>
              <div className="input-group">
                <label className="input-label">Editora *</label>
                <input type="text" name="editora" className="input-field" placeholder="Nome da editora" />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">ISBN *</label>
                <input type="text" name="isbn" className="input-field" placeholder="Código ISBN" />
              </div>
              <div className="input-group">
                <label className="input-label">Ano de Publicação *</label>
                <input type="number" name="ano" className="input-field" placeholder="Ex: 2023" />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Gênero *</label>
                <input type="text" name="genero" className="input-field" placeholder="Ex: Romance, Aventura..." />
              </div>
              <div className="input-group">
                <label className="input-label">Preço (R$) *</label>
                <input type="number" step="0.01" name="preco" className="input-field" placeholder="Ex: 49.90" />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Quantidade em Estoque *</label>
                <input type="number" name="quantidade" className="input-field" placeholder="Ex: 100" />
              </div>
              <div className="input-group">
                <label className="input-label">URL da Capa *</label>
                <input type="url" name="capaUrl" className="input-field" placeholder="http://..." />
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
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NovoLivro;
