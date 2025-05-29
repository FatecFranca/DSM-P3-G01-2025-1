import React from 'react';
import { Link } from 'react-router-dom';  // Adicionando a importação do Link
import '../../pages/LiteraturaBrasileira/LiteraturaBrasileira.css';
import Fundo from '../../assets/images/bannerLit.png';
import Footer from '../../components/Footer/Footer.js';
import {Navbar} from '../../components/Navbar/Navbar.js';
import {Faixa} from '../../components/Faixa/Faixa.js';
import DomCas from '../../assets/images/DomCasmurro.png';
import Vereda from '../../assets/images/Veredas.png';
import Cortico from '../../assets/images/Cortico.png';
import Clarice from '../../assets/images/Clarice.png';
import Paulo from '../../assets/images/Paulo.png';
import Milton from '../../assets/images/Milton.png';
import Memorias from '../../assets/images/Memorias.png';
import Vidas from '../../assets/images/Vidas.png';
import Tempo from '../../assets/images/Tempo.png';

function LiteraturaBrasileira() {
  return (



    <div className="conteudo-lit">
      <Faixa />
      <Navbar/>
      <div className='img-lit'>

        <img src={Fundo} alt="Literatura Brasileira" className="lit" />


      </div>


      <div className="content-text-literatura">


        <p className="mt-4 text-lg">A literatura brasileira é um reflexo da rica diversidade cultural e histórica do país. 
          Desde os clássicos do século XIX até as obras contemporâneas, a literatura brasileira oferece uma vasta gama de temas, 
          estilos e autores que merecem ser explorados.</p>

        <h3 className="text-3xl font-bold">Os Clássicos da Literatura Brasileira</h3>
        <p className="mt-4 text-lg">
          A literatura brasileira do século XIX é marcada por obras que refletem a sociedade da época. 
          Alguns dos principais clássicos incluem:
        </p>
        <p className="mt-4 text-lg">
         O <strong>"Dom Casmurro"</strong> de <strong>Machado de Assis:</strong> Considerado um dos maiores escritores brasileiros, Machado de Assis é autor desta obra-prima que explora temas como amor, ciúme e traição. 
        A narrativa é apresentada de forma não linear, o que adiciona complexidade à história.
        </p>

         <img src={DomCas} alt="Dom Casmurro" className="DomCas" />

        <p className="mt-4 text-lg">
         O <strong>"Grande Sertão: Veredas"</strong> de <strong>Guimarães Rosa:</strong> Esta obra-prima da literatura brasileira explora a vida no sertão mineiro.
          A narrativa é apresentada em forma de monólogo, o que cria uma atmosfera única e imersiva.
        </p>

         <img src={Vereda} alt="Grande Sertão: Veredas" className="Vereda" />
        
        <p className="mt-4 text-lg">
         O <strong>"O Cortiço"</strong> de <strong>Aluísio Azevedo:</strong> Este romance naturalista retrata a vida em um cortiço no Rio de Janeiro do final do século XIX. 
         A obra é uma crítica à sociedade da época e aborda temas como pobreza, doença e exploração.
        </p>

         <img src={Cortico} alt="O Cortiço" className="Cortico" />

         <h3 className="text-3xl font-bold">A Literatura Brasileira Contemporânea</h3>
         <p className="mt-4 text-lg">
          A literatura brasileira contemporânea é marcada por uma grande diversidade de temas e estilos.
          Alguns dos principais autores incluem:
        </p>
         <p className="mt-4 text-lg">
         <strong>Clarice Lispector:</strong> Considerada uma das maiores escritoras brasileiras do século XX, Clarice Lispector é autora de obras como "A Hora da Estrela",
          que explora a vida de uma mulher pobre e solitária no Rio de Janeiro.
        </p>

         <img src={Clarice} alt="Clarice Lispector" className="Clarice" />

         <p className="mt-4 text-lg">
         <strong>Paulo Coelho:</strong> Autor de best-sellers como "O Alquimista",
          Paulo Coelho é conhecido por suas obras que exploram temas como espiritualidade e autoconhecimento.
        </p>

         <img src={Paulo} alt="Paulo Coelho" className="Paulo" />

         <p className="mt-4 text-lg">
         <strong>Milton Hatoum:</strong> Autor de obras como "A Resistível Ascensão do Boto Tucuxi",
          Milton Hatoum é conhecido por suas narrativas que exploram a vida em comunidades ribeirinhas na Amazônia.
        </p>

         <img src={Milton} alt="Milton Hatoum" className="Milton" />

        <h3 className="text-3xl font-bold">Recomendações de Leitura</h3>
        <p className="mt-4 text-lg">
         <strong>"Memórias Póstumas de Brás Cubas"</strong> de <strong>Machado de Assis:</strong> Um clássico da 
         literatura brasileira que explora temas como morte, vida e memória.
        </p>
         <img src={Memorias} alt="Memórias Póstumas de Brás Cubas" className="Memorias" />

        <p className="mt-4 text-lg">
         <strong>"Vidas Secas"</strong> de <strong>Graciliano Ramos: </strong> Um romance que retrata a vida 
         de uma família de retirantes no sertão nordestino.
        </p>
         <img src={Vidas} alt="Vidas Secas" className="Vidas" />

        <p className="mt-4 text-lg">
         <strong>"O Tempo e o Vento"</strong> de <strong>Érico Veríssimo:</strong> Uma trilogia que explora
          a história do Rio Grande do Sul desde a colonização até a Revolução Federalista.
        </p>
         <img src={Tempo} alt="O Tempo e o Vento" className="Tempo" />

       
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-gray-500 text-white rounded-lg">
          Voltar para Home
        </Link>

      </div>

    <Footer />
    </div>
  );
}

export default LiteraturaBrasileira;