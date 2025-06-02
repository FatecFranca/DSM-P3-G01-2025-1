import React from 'react';
import "../../pages/Sobre/Sobre.css";
import {Navbar} from '../../components/Navbar/Navbar.js';
import {Faixa} from '../../components/Faixa/Faixa.js';
import Footer  from "../../components/Footer/Footer.js";

function Sobre() {
    return (
        <div className="content-sobre">
            <Faixa/>
            <Navbar/>
            <h1 style={{ marginLeft: '-72px', textAlign: 'start' }}>Sobre a <strong>BookHub</strong></h1>
            <p>
                A BookHub é uma plataforma de livraria online dedicada a proporcionar uma experiência completa, segura e moderna para quem busca os melhores livros do mercado. Nosso compromisso é oferecer um ambiente digital intuitivo, com navegação facilitada, recomendações personalizadas e um catálogo diversificado que contempla desde grandes clássicos da literatura até os lançamentos mais recentes. Trabalhamos para garantir praticidade, segurança e excelência em cada etapa da sua experiência de compra, valorizando o prazer da leitura e incentivando o acesso à cultura e ao conhecimento.<br/>Este site é um projeto acadêmico desenvolvido por estudantes do curso de <strong>Desenvolvimento de Software Multiplataforma (DSM)</strong> da Fatec Franca, como parte de nossa formação profissional.<br/><br/>Equipe responsável: Ana Julia, Gabriel, Lauane, Miguel e Pedro.
            </p>
            <Footer/>
        </div>
        
        
    );
}

export default Sobre;