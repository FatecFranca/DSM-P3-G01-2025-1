import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Faixa } from '../../components/Faixa/Faixa';
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './ConfirmarCompras.css';

const ConfirmarCompras = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pedidoData = location.state || JSON.parse(localStorage.getItem('pedidoFinal'));
    
    if (pedidoData) {
      setPedido(pedidoData);
    } else {
      navigate('/');
    }
    setLoading(false);
  }, [location.state, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <Faixa />
        <Navbar />
        <div className="container">
          <p>Carregando detalhes do pedido...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="error-container">
        <Faixa />
        <Navbar />
        <div className="container">
          <p>Não foi possível carregar os dados do pedido.</p>
          <button onClick={() => navigate('/')} className="botao">
            Voltar à Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = pedido.itens.reduce((sum, item) => sum + (item.precoUnitario * item.quantidade), 0);

  return (
    <div className="confirmar-compras-container">
      <Faixa />
      <Navbar />
      
      <main className="confirmar-main">
        <div className="confirmar-card">
          <div className="confirmar-header">
            <h1 className="titulo-confirmado"><strong>Pedido Confirmado!</strong></h1>
          </div>

          <div className="confirmar-sections">
            {/* Seção de Itens */}
            <section className="confirmar-section">
              <h2>Itens do Pedido</h2>
              <div className="itens-lista">
                {pedido.itens.map((item, index) => (
                  <div key={index} className="item-row">
                    <div className="item-info">
                      <span className="item-nome">{item.titulo}</span>
                      <span className="item-quantidade">{item.quantidade}x</span>
                    </div>
                    <span className="item-preco">
                      R$ {(item.precoUnitario * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className="divider"></div>

            <section className="confirmar-section">
              <h2>Forma de Pagamento</h2>
              <div className="pagamento-info">
                <p>
                  {pedido.metodoPagamento === 'pix' && 'PIX (5% de desconto)'}
                  {pedido.metodoPagamento === 'cartao' && 'Cartão de Crédito'}
                  {pedido.metodoPagamento === 'boleto' && 'Boleto Bancário'}
                </p>
              </div>
            </section>

            <div className="divider"></div>

            <section className="confirmar-section">
              <h2>Endereço de Entrega</h2>
              <div className="endereco-info">
                <p><strong>Nome:</strong> {pedido.enderecoEntrega.nome}</p>
                <p><strong>Endereço:</strong> {pedido.enderecoEntrega.rua}, {pedido.enderecoEntrega.numero}</p>
                {pedido.enderecoEntrega.complemento && (
                  <p><strong>Complemento:</strong> {pedido.enderecoEntrega.complemento}</p>
                )}
                <p><strong>Cidade/UF:</strong> {pedido.enderecoEntrega.cidade}/{pedido.enderecoEntrega.estado}</p>
                <p><strong>CEP:</strong> {pedido.enderecoEntrega.cep}</p>
              </div>
            </section>
            
            <section className="confirmar-totais">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </div>
              {pedido.metodoPagamento === 'pix' && (
                <div className="total-row desconto">
                  <span>Desconto PIX (5%):</span>
                  <span>- R$ {(subtotal * 0.05).toFixed(2)}</span>
                </div>
              )}
              <div className="total-row">
                <span>Frete:</span>
                <span>Grátis</span>
              </div>
              <div className="divider-total"></div>
              <div className="total-row total-final">
                <span>Total:</span>
                <span>R$ {pedido.total.toFixed(2)}</span>
              </div>
            </section>
          </div>

          <div className="confirmar-actions">
            <button onClick={() => navigate('/')} className="botao-primario">
              Voltar à Home
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConfirmarCompras;