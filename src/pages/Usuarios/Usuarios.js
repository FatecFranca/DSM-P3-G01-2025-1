import React, { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Faixa } from '../../components/Faixa/Faixa';
import Footer from '../../components/Footer/Footer';
import './Usuarios.css';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/clientes')
      .then(res => res.json())
      .then(data => {
        setUsuarios(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setUsuarios([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="usuarios-content">
      <Faixa />
      <Navbar />
      <h1 className="usuarios-title">Usuários cadastrados</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : usuarios.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul className="usuarios-lista">
          {usuarios.map((usuario, idx) => (
            <li key={usuario.id || idx} className="usuario-item">
              <span>{usuario.nome || usuario.email}</span>
              {usuario.email && <span className="usuario-email">{usuario.email}</span>}
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
}

export default Usuarios;
