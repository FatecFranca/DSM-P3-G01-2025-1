import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Destaque from '../../assets/images/bannerLivros.png';
import '../../pages/Livros/Livros.css';
import Footer from '../../components/Footer/Footer.js';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';

function Livros() {
    const navigate = useNavigate();
    const [livros, setLivros] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [genero, setGenero] = useState("");

    useEffect(() => {
        fetch('http://localhost:3001/api/livros')
            .then(res => res.json())
            .then(data => {
                setLivros(data);
            })
            .catch(() => setLivros([]));
    }, []);

    // Filtro por título, autor ou gênero
    const livrosFiltrados = livros.filter(livro => {
        const busca = filtro.toLowerCase();
        const generoBusca = genero;
        return (
            (!busca || livro.titulo?.toLowerCase().includes(busca) || livro.autor?.toLowerCase().includes(busca)) &&
            (!generoBusca || livro.genero === generoBusca)
        );
    });

    return (
        <div className="livros-content">
            <Faixa />
            <Navbar />
            <div className='livros-body'>
                <div className='text-destaque'>
                    <h1>DESTAQUE</h1>
                </div>
                <div className='img-destaque'>
                    <img src={Destaque} alt="Destaque" className="destaque" />
                </div>
                <div className='text-products'>
                    <h2>Os melhores livros para você</h2>
                    {/* Filtro */}
                    <div style={{ display: 'flex', gap: 16, marginBottom: 32, alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Filtrar por título ou autor"
                            value={filtro}
                            onChange={e => setFiltro(e.target.value)}
                            style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 15, minWidth: 220 }}
                        />
                        <select
                            value={genero}
                            onChange={e => setGenero(e.target.value)}
                            style={{ padding: 8, borderRadius: 6, border: genero ? '2px solid #3b82f6' : '1px solid #ccc', fontSize: 15, color: genero ? '#222' : '#555', fontWeight: genero ? 600 : 400, background: '#fff', outline: genero ? '2px solid #3b82f6' : 'none', boxShadow: genero ? '0 0 0 2px #3b82f633' : 'none', transition: 'border 0.2s, box-shadow 0.2s' }}
                        >
                            <option value="">Todos os gêneros</option>
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
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '24px',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginTop: '2rem',
                    }}>
                        <div className="add-livro-card" onClick={() => navigate('/novo-livro')}>
                            <span className="plus-icon">+</span>
                        </div>
                        {livrosFiltrados.length === 0 && <p style={{marginLeft: 16}}>Nenhum livro encontrado.</p>}
                        {livrosFiltrados.map(livro => (
                            <div key={livro._id}
                                style={{
                                    border: '1.5px solid #fcd535',
                                    borderRadius: 12,
                                    padding: 16,
                                    width: 200,
                                    minHeight: 300,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: '#fff',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.2s',
                                }}
                                onClick={() => navigate(`/livros/${livro._id}`)}
                                title="Ver detalhes do livro"
                            >
                                {livro.capa ? (
                                    <img
                                        src={`http://localhost:3001/uploads/${livro.capa}`}
                                        alt={livro.titulo || 'Capa do livro'}
                                        style={{ width: 120, height: 160, objectFit: 'cover', borderRadius: 4, marginBottom: 12 }}
                                    />
                                ) : (
                                    <div style={{ width: 120, height: 160, background: '#eee', borderRadius: 4, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 12 }}>
                                        Sem capa
                                    </div>
                                )}
                                <strong style={{ fontSize: 16, marginBottom: 8, textAlign: 'center' }}>{livro.titulo || livro.nome}</strong>
                                <span style={{ 
                                    color: '#292626', 
                                    fontWeight: 'bold', 
                                    marginBottom: 8, 
                                    fontSize: 16
                                }}>
                                    R$ {Number(livro.preco).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Livros;
