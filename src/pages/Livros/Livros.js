import React from "react";
import { useNavigate } from "react-router-dom"; // <-- IMPORTANTE
import Destaque from '../../assets/images/bannerLivros.png';
import '../../pages/Livros/Livros.css';
import Footer from '../../components/Footer/Footer.js';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';

function Livros() {
    const navigate = useNavigate(); // <-- DEFINIR AQUI

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
                    <div className="add-livro-card" onClick={() => navigate('/novo-livro')}>
                        <span className="plus-icon">+</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Livros;
