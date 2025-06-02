import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Destaque from '../../assets/images/bannerLivros.png';
import '../../pages/Livros/Livros.css';
import Footer from '../../components/Footer/Footer.js';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';
import { FiEdit, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

function Livros() {
    const navigate = useNavigate();
    const [livros, setLivros] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [genero, setGenero] = useState("");

    const [livroEditando, setLivroEditando] = useState(null);
    const [formData, setFormData] = useState({ titulo: '', preco: '' });

    useEffect(() => {
        fetch('http://localhost:3001/api/livros')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setLivros(data);
                } else {
                    setLivros([]);
                }
            })
            .catch(() => setLivros([]));
    }, []);

    const livrosFiltrados = Array.isArray(livros) ? livros.filter(livro => {
        const busca = filtro.toLowerCase();
        const generoBusca = genero;
        return (
            (!busca || livro.titulo?.toLowerCase().includes(busca) || livro.autor?.toLowerCase().includes(busca)) &&
            (!generoBusca || livro.genero === generoBusca)
        );
    }) : [];

    const abrirEdicao = (livro) => {
        setLivroEditando(livro);
        setFormData({
            titulo: livro.titulo || '',
            preco: livro.preco || '',
        });
    };

    const salvarEdicao = () => {
        setLivros((prevLivros) =>
            prevLivros.map(l =>
                l.id === livroEditando.id ? { ...l, titulo: formData.titulo, preco: formData.preco } : l
            )
        );
        setLivroEditando(null);
    };

    // Função para excluir livro
    const handleExcluirLivro = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/livros/${id}`, { method: 'DELETE' });
            setLivros(prev => prev.filter(l => l.id !== id));
        } catch (error) {
            alert('Erro ao excluir livro');
        }
    };

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

    return (
        <div className="livros-content">
            <Faixa />
            <Navbar />
            <div className='livros-body'>
                <div className='text-destaque'>
                    
                </div>
                <div className='img-destaque' style={{ marginTop: 32 }}>
                    <img src={Destaque} alt="Destaque" className="destaque" />
                </div>
                <div className='text-products'>
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
                            style={{
                                padding: 8,
                                borderRadius: 6,
                                border: genero ? '2px solid #3b82f6' : '1px solid #ccc',
                                fontSize: 15,
                                color: genero ? '#222' : '#555',
                                fontWeight: genero ? 600 : 400,
                                background: '#fff',
                                outline: genero ? '2px solid #3b82f6' : 'none',
                                boxShadow: genero ? '0 0 0 2px #3b82f633' : 'none',
                                transition: 'border 0.2s, box-shadow 0.2s'
                            }}
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
                        {isAdmin && (
                            <div className="add-livro-card" onClick={() => navigate('/novo-livro')}>
                                <span className="plus-icon">+</span>
                            </div>
                        )}
                        {livrosFiltrados.length === 0 && <p style={{ marginLeft: 16 }}>Nenhum livro encontrado.</p>}

                        {livrosFiltrados.map(livro => (
                            <div
                                key={livro.id || livro.isbn || Math.random()}
                                className="livro-card"
                                onClick={() => navigate(`/livros/${livro.id}`)}
                                title="Ver detalhes do livro"
                            >
                                {livro.genero && (
                                    <span className="livro-genero">{livro.genero}</span>
                                )}

                                {isAdmin && (
                                    <div className="edit-icon" onClick={e => { e.stopPropagation(); abrirEdicao(livro); }}>
                                        <FiEdit size={18} />
                                    </div>
                                )}

                                {isAdmin && (
                                    <button
                                        className="excluir-botao-minimalista"
                                        style={{
                                            position: 'absolute',
                                            left: 8,
                                            bottom: 8,
                                            background: 'transparent',
                                            color: '#ff4d4f',
                                            border: 'none',
                                            borderRadius: '50%',
                                            padding: 0,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 10
                                        }}
                                        onClick={e => {
                                            e.stopPropagation();
                                            if (window.confirm('Tem certeza que deseja excluir este livro?')) {
                                                handleExcluirLivro(livro.id);
                                            }
                                        }}
                                        title="Excluir livro"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                )}

                                {livro.capa ? (
                                    <img
                                        src={`http://localhost:3001/uploads/${livro.capa}`}
                                        alt={livro.titulo || 'Capa do livro'}
                                        className="livro-capa"
                                        style={{ width: 115, height: 165, objectFit: 'cover', borderRadius: 4 }}
                                    />
                                ) : (
                                    <div className="livro-capa-placeholder">Sem capa</div>
                                )}

                                <strong className="livro-titulo">{livro.titulo || livro.nome}</strong>
                                <span className="livro-preco">
                                    R$ {Number(livro.preco).toFixed(2)}
                                </span>

                                <div className="buttons-row">
                                    <button
                                        className="livro-botao"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/livros/${livro.id}`);
                                        }}
                                    >
                                        Ver mais
                                    </button>
                                    <button
                                        className="carrinho-botao"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                                            const existente = carrinho.find(item => item.id === livro.id);
                                            if (existente) {
                                                existente.quantidade += 1;
                                            } else {
                                                carrinho.push({
                                                    ...livro,
                                                    quantidade: 1,
                                                    capa: livro.capa 
                                                });
                                            }

                                            localStorage.setItem('carrinho', JSON.stringify(carrinho));
                                            const modal = document.createElement('div');
                                            modal.innerHTML = `
                                                <div style="
                                                    position: fixed;
                                                    top: 50%;
                                                    left: 50%;
                                                    transform: translate(-50%, -50%);
                                                    background: white;
                                                    padding: 20px;
                                                    border-radius: 8px;
                                                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                                                    z-index: 1000;
                                                    text-align: center;
                                                    max-width: 80%;
                                                ">
                                                    <p style="margin-bottom: 15px; font-size: 16px;">
                                                        ✅ Livro <strong>"${livro.titulo}"</strong> adicionado ao carrinho!
                                                    </p>
                                                    <button style="
                                                        background: #ffc107;
                                                        color: black;
                                                        border: none;
                                                        padding: 8px 15px;
                                                        border-radius: 4px;
                                                        cursor: pointer;
                                                        font-weight: bold;
                                                    ">
                                                        OK
                                                    </button>
                                                </div>
                                                <div style="
                                                    position: fixed;
                                                    top: 0;
                                                    left: 0;
                                                    width: 100%;
                                                    height: 100%;
                                                    background: rgba(0,0,0,0.5);
                                                    z-index: 999;
                                                "></div>
                                            `;
                                            document.body.appendChild(modal);
                                            modal.querySelector('button').addEventListener('click', () => {
                                                modal.remove();
                                            });
                                            modal.querySelector('div').addEventListener('click', (e) => {
                                                if (e.target === modal.querySelector('div')) {
                                                    modal.remove();
                                                }
                                            });


                                            setTimeout(() => {
                                                if (document.body.contains(modal)) {
                                                    modal.remove();
                                                }
                                            }, 3000);
                                        }}
                                        aria-label="Adicionar ao carrinho"
                                    >
                                        <FiShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isAdmin && livroEditando && (
                <div className="modal-overlay" onClick={() => setLivroEditando(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>Editar Livro</h2>
                        <form onSubmit={e => {
                            e.preventDefault();
                            salvarEdicao();
                        }}>
                            <label>
                                Título:
                                <input
                                    type="text"
                                    value={formData.titulo}
                                    onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                                />
                            </label>
                            <label>
                                Preço:
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.preco}
                                    onChange={e => setFormData({ ...formData, preco: e.target.value })}
                                />
                            </label>
                            <button type="submit">Salvar</button>
                            <button type="button" onClick={() => setLivroEditando(null)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Livros;
