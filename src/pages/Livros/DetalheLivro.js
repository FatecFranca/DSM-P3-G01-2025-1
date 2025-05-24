import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BsCart, BsStarFill, BsStar } from 'react-icons/bs';
import '../../pages/Livros/Livros.css';
import Footer from '../../components/Footer/Footer.js';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';

const DetalheLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [novaAvaliacao, setNovaAvaliacao] = useState("");
  const [novaNota, setNovaNota] = useState(0);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/api/livros/${id}`)
      .then(res => res.json())
      .then(data => {
        setLivro(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    fetch(`http://localhost:3001/api/livros/${id}/avaliacoes`)
      .then(res => res.json())
      .then(data => setAvaliacoes(data))
      .catch(() => setAvaliacoes([]));
  }, [id]);

  const handleAvaliacao = async (e) => {
    e.preventDefault();
    if (!novaAvaliacao.trim() || novaNota === 0) return;
    setEnviando(true);
    await fetch(`http://localhost:3001/api/livros/${id}/avaliacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: novaAvaliacao, nota: novaNota })
    });
    setNovaAvaliacao("");
    setNovaNota(0);
    setEnviando(false);
    fetch(`http://localhost:3001/api/livros/${id}/avaliacoes`)
      .then(res => res.json())
      .then(data => setAvaliacoes(data));
  };

  // Média das notas
  const media = avaliacoes.length > 0 ? (avaliacoes.reduce((acc, a) => acc + (a.nota || 0), 0) / avaliacoes.length).toFixed(1) : 0;

  if (loading) return <div>Carregando...</div>;
  if (!livro) return <div>Livro não encontrado.</div>;

  return (
    <div className="livros-content" style={{ minHeight: '100vh', background: '#fff' }}>
      <Faixa />
      <Navbar />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 48,
        margin: '2rem auto',
        maxWidth: '90vw',
        width: '100%',
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        padding: 48,
        minHeight: 420,
      }}>
        {/* Capa do livro */}
        <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {livro.capa && (
            <img
              src={`http://localhost:3001/uploads/${livro.capa}`}
              alt={livro.titulo || 'Capa do livro'}
              style={{ width: 280, height: 400, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 16px #fcd53555', border: '2px solid #ffde59' }}
            />
          )}
        </div>
        {/* Informações do livro + sinopse separada */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 32, minWidth: 320 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <h2 style={{ marginBottom: 10, color: '#292626', fontWeight: 700, fontSize: 32 }}>{livro.titulo || livro.nome}</h2>
            <div style={{ fontWeight: 500, color: '#3b3b3b', marginBottom: 10, fontSize: 20 }}>{livro.autor}</div>
            <div style={{ marginBottom: 10, fontSize: 18 }}>
              <b>Editora:</b> {livro.editora}<br />
              <b>Ano:</b> {livro.ano}<br />
              <b>ISBN:</b> {livro.isbn}
            </div>
            <div style={{ marginBottom: 24 }}>
              <span style={{
                color: '#292626',
                fontWeight: 'bold',
                fontSize: 32 // Aumenta o tamanho do preço
              }}>
                R$ {Number(livro.preco).toFixed(2)}
              </span>
            </div>
            {/* Botões */}
            <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
              <button
                onClick={() => navigate('/comprar')}
                style={{
                  background: '#ffde59',
                  color: '#292626',
                  border: 'none',
                  borderRadius: 12,
                  padding: '14px 44px',
                  fontWeight: 'bold',
                  fontSize: 20,
                  cursor: 'pointer',
                  boxShadow: '0 1px 6px #fcd53533',
                  transition: 'background 0.2s',
                }}
              >
                Comprar agora
              </button>
              <button
                style={{
                  background: '#fff',
                  color: '#292626',
                  border: '2.5px solid #ffde59',
                  borderRadius: 12,
                  padding: '14px 36px',
                  fontWeight: 'bold',
                  fontSize: 20,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: '0 1px 6px #fcd53533',
                  transition: 'background 0.2s',
                }}
              >
                <BsCart size={28} /> Carrinho
              </button>
            </div>
          </div>
          {/* Sinopse separada */}
          <div style={{ 
            flex: 1, 
            borderRadius: 10, 
            padding: 24, 
            boxShadow: '0 1px 4px #fcd53533', 
            color: '#292626', 
            fontSize: 16, 
            minWidth: 320, 
            maxWidth: 600, 
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // alinha no topo
            alignItems: 'flex-start', // alinha à esquerda
            background: 'none'
          }}>
            <b>Sinopse:</b> <br />
            <span style={{ textAlign: 'justify', width: '100%', display: 'block' }}>{livro.sinopse}</span>
          </div>
        </div>
      </div>
      {/* Aba de avaliações */}
      <div style={{
        maxWidth: '90vw',
        width: '100%',
        margin: '2rem auto 3rem',
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
        padding: 48,
        marginTop: 0,
        minHeight: 220,
      }}>
        <h3 style={{ color: '#292626', fontWeight: 700, fontSize: 26, marginBottom: 22 }}>Avalie</h3>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }} onSubmit={handleAvaliacao}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} style={{ cursor: 'pointer' }} onClick={() => setNovaNota(i + 1)}>
                {i < novaNota ? <BsStarFill color="#ffde59" size={28} /> : <BsStar color="#ffde59" size={28} />}
              </span>
            ))}
            <span style={{ color: '#292626', fontWeight: 500, fontSize: 18, marginLeft: 8 }}>{novaNota > 0 ? `${novaNota} estrela${novaNota > 1 ? 's' : ''}` : ''}</span>
          </div>
          <textarea
            placeholder="Deixe seu feedback sobre este livro..."
            rows={4}
            value={novaAvaliacao}
            onChange={e => setNovaAvaliacao(e.target.value)}
            style={{
              border: '2px solid #fcd535',
              borderRadius: 12,
              padding: 16,
              fontSize: 17,
              resize: 'vertical',
              outline: 'none',
              width: '100%',
              marginBottom: 10
            }}
            required
            disabled={enviando}
          />
          <button
            type="submit"
            style={{
              background: '#ffde59',
              color: '#292626',
              border: 'none',
              borderRadius: 12,
              padding: '10px 32px',
              fontWeight: 'bold',
              fontSize: 18,
              cursor: 'pointer',
              alignSelf: 'flex-end',
              opacity: enviando ? 0.7 : 1
            }}
            disabled={enviando}
          >
            {enviando ? 'Enviando...' : 'Enviar avaliação'}
          </button>
        </form>
        {/* Avaliações recebidas */}
        {avaliacoes.length > 0 && (
          <>
            <h3 style={{ color: '#292626', fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Avaliações</h3>
            {avaliacoes.map((a, idx) => (
              <div key={idx} style={{
                border: '1px solid #fcd535',
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
                boxShadow: 'none',
                color: '#292626',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: 'none'
              }}>
                <span>{a.texto}</span>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetalheLivro;
