import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Faixa } from '../../components/Faixa/Faixa';
import Footer from '../../components/Footer/Footer';
import './Autores.css';

function Autores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/autores')
      .then(res => res.json())
      .then(data => {
        setAutores(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setAutores([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="autores-content">
      <Faixa />
      <Navbar />
      <h1 className="autores-title">Autores cadastrados</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : autores.length === 0 ? (
        <p>Nenhum autor cadastrado.</p>
      ) : (
        <ul className="autores-lista">
          {autores.map((autor, idx) => (
            <li key={autor.id || idx} className="autor-item">
              {autor.foto && <img src={`http://localhost:3001${autor.foto}`} alt={autor.nome} className="autor-foto" />}
              <span>{autor.nome}</span>
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
}

export default Autores;
