import React, { useState, useEffect } from "react";
import Destaque from '../../assets/images/bannerHome.png';
import '../../pages/Home/Home.css';
import Footer from '../../components/Footer/Footer.js';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function shuffleArray(array) {
  // Algoritmo Fisher-Yates para embaralhar
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Home() {
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

  const [autores, setAutores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [novoAutor, setNovoAutor] = useState({ nome: '', foto: null });
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/autores')
      .then(res => res.json())
      .then(data => setAutores(data))
      .catch(() => setAutores([]));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/livros')
      .then(res => res.json())
      .then(data => setLivros(shuffleArray(data)))
      .catch(() => setLivros([]));
  }, []);

  function handleAddAutor(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('nome', novoAutor.nome);
    if (novoAutor.foto) data.append('foto', novoAutor.foto);
    fetch('http://localhost:3001/api/autores', {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(autor => {
        setAutores([...autores, autor]);
        setNovoAutor({ nome: '', foto: null });
        setShowModal(false);
      })
      .catch(() => alert('Erro ao cadastrar autor.'));
  }

  return (
    <div className="home-content">
      <Faixa />
      <Navbar />
      <div className='home-body'>
        <div className='text-destaque'>
          <h1>DESTAQUE</h1>
        </div>
        <div className='img-destaque'>
          <img src={Destaque} alt="Destaque" className="destaque" />
        </div>
        <div className='text-products'>
          <h2>Os melhores livros para você</h2>
        </div>
        <div className="livros-home-list">
          {livros.map(livro => (
            <div
              key={livro.id}
              className="livro-card"
              title="Ver detalhes do livro"
              onClick={() => navigate(`/livros/${livro.id}`)}
            >
              {livro.genero && (
                <span className="livro-genero">{livro.genero}</span>
              )}
              <div className="livro-capa-wrapper">
                {livro.capa ? (
                  <img
                    src={`http://localhost:3001/uploads/${livro.capa}`}
                    alt={livro.titulo}
                    className="livro-capa"
                  />
                ) : (
                  <div className="livro-capa-placeholder">Sem capa</div>
                )}
              </div>
              <strong className="livro-titulo">{livro.titulo}</strong>
              <span className="livro-preco">R$ {Number(livro.preco).toFixed(2)}</span>
              <div className="buttons-row">
                <button
                  className="livro-botao"
                  onClick={e => {
                    e.stopPropagation();
                    navigate(`/livros/${livro.id}`);
                  }}
                >
                  Ver mais
                </button>
                <button
                  className="carrinho-botao"
                  onClick={e => {
                    e.stopPropagation();
                    alert(`Livro \"${livro.titulo}\" adicionado ao carrinho!`);
                  }}
                  aria-label="Adicionar ao carrinho"
                >
                  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="autores-descricao">
          Conheça os autores por trás das histórias que encantam leitores todos os dias.<br/>
          Aqui você encontrará desde escritores consagrados até novos talentos que estão<br/>
          transformando a literatura com criatividade e paixão.
        </div>
      </div>

      <div className="autores-section">
        <h2 style={{ fontWeight: 600, fontSize: 22, marginBottom: 24 }}>Autores</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, overflowX: 'auto' }}>
          {isAdmin && (
            <div
              className="autor-card add-autor"
              onClick={() => setShowModal(true)}
              title="Adicionar autor"
            >
              <div className="autor-foto">
                <FiPlus size={36} />
              </div>
            </div>
          )}

          {autores.map((autor, idx) => (
            <div key={idx} className="autor-card" style={{ minWidth: 120, minHeight: 150, borderRadius: '50%', overflow: 'visible', display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 12 }}>
              <div className="autor-foto" style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', background: '#f3f3f3', border: '2px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {autor.foto ? (
                  <img src={`http://localhost:3001${autor.foto}`} alt={autor.nome} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#bbb', fontSize: 48 }}>+</span>
                )}
              </div>
              {autor.nome && (
                <span style={{ fontSize: 15, marginTop: 8, fontWeight: 500, color: '#444', textAlign: 'center', maxWidth: 140, whiteSpace: 'normal', overflow: 'visible', textOverflow: 'unset', wordBreak: 'break-word' }}>
                  {autor.nome}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Modal para adicionar autor */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                background: '#fff',
                padding: 24,
                borderRadius: 10,
                minWidth: 320
              }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ marginTop: 0 }}>Adicionar Autor</h3>
              <form
                onSubmit={handleAddAutor}
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                encType="multipart/form-data"
              >
                <input
                  type="text"
                  placeholder="Nome do autor"
                  value={novoAutor.nome}
                  onChange={e => setNovoAutor({ ...novoAutor, nome: e.target.value })}
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    fontSize: 15
                  }}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setNovoAutor({ ...novoAutor, foto: e.target.files[0] })}
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #ccc',
                    fontSize: 15
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    background: '#fcd535',
                    color: '#222',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 0',
                    fontWeight: 600,
                    fontSize: 16,
                    marginTop: 8,
                    cursor: 'pointer'
                  }}
                >
                  Adicionar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
