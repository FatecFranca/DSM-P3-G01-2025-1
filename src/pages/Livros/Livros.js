import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE
import Destaque from '../../assets/images/bannerLivros.png';
import '../../pages/Livros/Livros.css';
import Footer from '../../components/Footer/Footer.js';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';

function Livros() {
    const navigate = useNavigate(); // <-- DEFINIR AQUI
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/livros')
            .then(res => res.json())
            .then(data => setLivros(data))
            .catch(() => setLivros([]));
    }, []);

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
                        {livros.length === 0 && <p style={{marginLeft: 16}}>Nenhum livro cadastrado.</p>}
                        {livros.map(livro => (
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
                                    background: '#ffde59', 
                                    borderRadius: '20px', 
                                    padding: '4px 12px', 
                                    display: 'inline-block',
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
