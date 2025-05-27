import React from 'react';
import Logo from '../../assets/images/logo.png';
import { Faixa } from '../../components/Faixa/Faixa.js';
import './ConfirmarCompras.css';

const ConfirmarCompras = () => {

  const usuario = [
    {
      nome: "Gabriel",
      logradouro: "Rua das Flores",
      numero: 123,
      complemento: "Apto 202, Bloco B",
      cidade: "Franca",
      uf: "SP"
    }
  ]

  const pedido = [
    {
      id: "dsnakdhsakjndasda",
      produto: "Jantar Secreto",
      quantidade: 1,
      valor: 54.9,
      pagamento: "PIX"
    }
  ]
  return (
    <>
      <Faixa />
      <header className="navbar"></header>

      <div className="container">
        <div className="cards-wrapper">
          {/* Card Resumo do Pedido */}
          <div className="card">
            <img src={Logo} alt="Logo" className="logo" />
            <div className="resumo">
              <h2>Resumo do Pedido</h2>
              <div className="item">
                <span>Produto:</span>
                <span>{pedido[0].produto}</span>
              </div>
              <div className="item">
                <span>Quantidade:</span>
                <span>{pedido[0].quantidade}</span>
              </div>
              <div className="item">
                <span>Preço Total:</span>
                <span>R$ {pedido[0].valor.toFixed(2)}</span>
              </div>
              <div className="item">
                <span>Forma de Pagamento:</span>
                <span>{pedido[0].pagamento}</span>
              </div>

              <div className='item-endereco'>
                <h2>Endereço</h2>
                <div className="item">
                  <span>Logradouro:</span>
                  <span>{usuario[0].logradouro + ", " + usuario[0].numero}</span>
                </div>
                <div className="item">
                  <span>Compl. / Cidade:</span>
                  <span>
                    {usuario[0].complemento !== ""
                      ? `${usuario[0].complemento}, ${usuario[0].cidade}, ${usuario[0].uf}`
                      : `${usuario[0].cidade}, ${usuario[0].uf}`}
                  </span>

                </div>
              </div>
            </div>

            <a href="/" className="botao">Voltar à Home</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmarCompras;
