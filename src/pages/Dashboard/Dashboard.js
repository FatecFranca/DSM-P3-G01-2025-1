import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Faixa } from '../../components/Faixa/Faixa';
// import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaBook, FaUser, FaUsers } from 'react-icons/fa';
import { Pie } from 'react-chartjs-2';
import 'animate.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [totalLivros, setTotalLivros] = useState(0);
  const [totalAutores, setTotalAutores] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(() => {
    // Buscar total de livros
    fetch('http://localhost:3001/api/livros')
      .then(res => res.json())
      .then(data => setTotalLivros(Array.isArray(data) ? data.length : 0))
      .catch(() => setTotalLivros(0));
    // Buscar total de autores
    fetch('http://localhost:3001/api/autores')
      .then(res => res.json())
      .then(data => setTotalAutores(Array.isArray(data) ? data.length : 0))
      .catch(() => setTotalAutores(0));
    // Buscar total de usuários
    fetch('http://localhost:3001/api/clientes')
      .then(res => res.json())
      .then(data => setTotalUsuarios(Array.isArray(data) ? data.length : 0))
      .catch(() => setTotalUsuarios(0));
  }, []);

  // Verifica se o usuário é admin
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

  // Dados para o gráfico de barras
  const barData = {
    labels: ['Livros', 'Autores', 'Usuários'],
    datasets: [
      {
        label: 'Total',
        data: [totalLivros, totalAutores, totalUsuarios],
        backgroundColor: [
          'rgba(252, 213, 53, 0.8)',
          'rgba(198, 40, 40, 0.8)',
          'rgba(33, 150, 243, 0.8)'
        ],
        borderRadius: 12,
        borderWidth: 1
      }
    ]
  };
  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  // Dados para o gráfico de pizza
  const pieData = {
    labels: ['Livros', 'Autores', 'Usuários'],
    datasets: [
      {
        data: [totalLivros, totalAutores, totalUsuarios],
        backgroundColor: [
          'rgba(252, 213, 53, 0.8)',
          'rgba(198, 40, 40, 0.8)',
          'rgba(33, 150, 243, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  };
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 16 } } },
      tooltip: { enabled: true }
    }
  };

  return (
    <div className="dashboard-content" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: '#f7f7fa' }}>
      <Faixa />
      <Navbar />
      <header style={{ width: '100%', background: '#fff', boxShadow: '0 2px 8px #fcd53522', padding: '24px 0 8px 0', marginBottom: 24, position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 className="dashboard-title animate__animated animate__fadeInDown" style={{ textAlign: 'center', color: '#222', fontWeight: 800, fontSize: 36, letterSpacing: 1 }}>Dashboard BookHub</h1>
      </header>
      {isAdmin && (
        <section className="dashboard-section animate__animated animate__fadeInUp" style={{ width: '100%', maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 32, width: '100%', justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
            <div className="dashboard-card-modern animate__animated animate__zoomIn" style={{ background: '#fcd535', color: '#222', borderRadius: 16, boxShadow: '0 2px 8px #fcd53522', padding: '32px 40px', minWidth: 200, textAlign: 'center', fontWeight: 600, fontSize: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <FaBook size={48} style={{ marginBottom: 12, color: '#bfa100' }} />
              <span style={{ fontSize: 38, fontWeight: 700 }}>{totalLivros}</span>
              <div style={{ marginTop: 4 }}>Livros</div>
            </div>
            <div className="dashboard-card-modern animate__animated animate__zoomIn" style={{ background: '#c62828', color: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #c6282822', padding: '32px 40px', minWidth: 200, textAlign: 'center', fontWeight: 600, fontSize: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <FaUser size={48} style={{ marginBottom: 12, color: '#fff' }} />
              <span style={{ fontSize: 38, fontWeight: 700 }}>{totalAutores}</span>
              <div style={{ marginTop: 4 }}>Autores</div>
            </div>
            <div className="dashboard-card-modern animate__animated animate__zoomIn" style={{ background: '#2196f3', color: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #2196f322', padding: '32px 40px', minWidth: 200, textAlign: 'center', fontWeight: 600, fontSize: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <FaUsers size={48} style={{ marginBottom: 12, color: '#fff' }} />
              <span style={{ fontSize: 38, fontWeight: 700 }}>{totalUsuarios}</span>
              <div style={{ marginTop: 4 }}>Usuários</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 40, width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 520, background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #fcd53533', padding: 32, flex: 1, minWidth: 320 }}>
              <h2 style={{ textAlign: 'center', color: '#c62828', fontWeight: 700, fontSize: 22, marginBottom: 24 }}>Resumo Geral</h2>
              <Bar data={barData} options={barOptions} height={220} />
            </div>
            <div style={{ maxWidth: 380, background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px #2196f333', padding: 32, flex: 1, minWidth: 260 }}>
              <h2 style={{ textAlign: 'center', color: '#2196f3', fontWeight: 700, fontSize: 20, marginBottom: 24 }}>Distribuição</h2>
              <Pie data={pieData} options={pieOptions} height={220} />
            </div>
          </div>
          <div style={{ height: 48 }}></div>
        </section>
      )}
      {!isAdmin && (
        <div style={{ margin: '48px 0', textAlign: 'center', color: '#444', fontSize: '1.2rem' }}>
          Você não tem permissão para acessar o dashboard administrativo.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
