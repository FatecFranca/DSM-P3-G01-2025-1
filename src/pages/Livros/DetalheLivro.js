import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../pages/Livros/Livros.css';
import Footer from '../../components/Footer/Footer.js';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';

const DetalheLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/livros`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(l => l._id === id);
        setLivro(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (!livro) return <div>Livro não encontrado.</div>;

  return (
    <div className="livros-content">
      <Faixa />
      <Navbar />
      <div className="detalhe-livro-card" style={{
        maxWidth: 400,
        margin: '2rem auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {livro.capa && (
          <img
            src={`http://localhost:3001/uploads/${livro.capa}`}
            alt={livro.titulo || 'Capa do livro'}
            style={{ width: 180, height: 240, objectFit: 'cover', borderRadius: 8, marginBottom: 18 }}
          />
        )}
        <h2 style={{ marginBottom: 8 }}>{livro.titulo || livro.nome}</h2>
        <span style={{ color: '#292626', fontWeight: 'bold', background: '#ffde59', borderRadius: '20px', padding: '4px 12px', display: 'inline-block', fontSize: 18, marginBottom: 12 }}>
          R$ {Number(livro.preco).toFixed(2)}
        </span>
        <div style={{ textAlign: 'left', width: '100%' }}>
          <p><strong>Autor:</strong> {livro.autor}</p>
          <p><strong>Editora:</strong> {livro.editora}</p>
          <p><strong>ISBN:</strong> {livro.isbn}</p>
          <p><strong>Ano:</strong> {livro.ano}</p>
          <p><strong>Gênero:</strong> {livro.genero}</p>
          <p><strong>Quantidade:</strong> {livro.quantidade}</p>
          <p><strong>Sinopse:</strong> {livro.sinopse}</p>
        </div>
        <button onClick={() => navigate('/comprar')} style={{ marginTop: 24, background: '#ffde59', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 'bold', cursor: 'pointer' }}>Comprar</button>
      </div>
      <Footer />
    </div>
  );
};

export default DetalheLivro;
