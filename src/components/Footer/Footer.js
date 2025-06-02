import React from 'react';
import { BsGithub, BsInstagram } from "react-icons/bs";
import '../../components/Footer/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
        </div>
        
        <div className="footer-links">
          <div className="footer-links-column">
            <h3>Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/livros">Livros</a></li>
              <li><a href="/literatura-brasileira">Literatura Brasileira</a></li>
              <li><a href="/sobre">Sobre Nós</a></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Contate-nos</h3>
            <ul>
              <li><a href="#">+55 16 99297-1607</a></li>
              <li><a href="#">bookhub@gmail.com</a></li>
            </ul>
          </div>

          <div className="footer-links-column">
            <h3>Endereço</h3>
            <ul>
              <li>
                <a href="https://www.google.com/maps/place/Fatec+Franca+-+Faculdade+de+Tecnologia+de+Franca+Dr+Thomaz+Novelino/@-20.5149138,-47.4032692,17z/data=!3m1!4b1!4m6!3m5!1s0x94b0a650b93c4b5f:0xbe0e42f3aa42525c!8m2!3d-20.5149138!4d-47.4006943!16s%2Fg%2F1jkxwkhq2?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D">
                R. Irênio Greco, 4580 - Vila Imperador, Franca - SP, 14405-191
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>&copy; BookHub™ 2025</span>
          </div>

          <div className="footer-social">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <BsInstagram size={24} />
            </a>
            <a href="https://github.com/anamota13/BOOKHUB_PI" target="_blank" rel="noopener noreferrer">
              <BsGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
