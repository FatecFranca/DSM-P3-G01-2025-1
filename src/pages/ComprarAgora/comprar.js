import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import { Navbar } from '../../components/Navbar/Navbar';
import { Faixa } from '../../components/Faixa/Faixa';
import './comprar.css';

const Comprar = () => {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      return total + parseFloat(item.preco || item.precoUnitario || 0) * item.quantidade;
    }, 0);
  };

  const handleFinalizarPedido = async () => {
    if (carrinho.length === 0) return;

    setLoading(true);
    
    try {

      const itensFormatados = carrinho.map(item => ({
        livroId: item.id,
        precoUnitario: item.preco,
        titulo: item.titulo,
        capa: item.capa,
        quantidade: item.quantidade
      }));


      localStorage.setItem('pedidoTemporario', JSON.stringify({
        itens: itensFormatados,
        metodoPagamento,
        total: metodoPagamento === 'pix' 
          ? calcularTotal() * 0.95 
          : calcularTotal()
      }));


      navigate('/endereco');

    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao finalizar o pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <Faixa />
      <Navbar />

      <main className="checkout-main">
        <h2>FINALIZAÇÃO DE COMPRA</h2>
        <h1>Seu Pedido</h1>

        <div className="checkout-columns">
          <div className="left-column">
            <section className="payment-section">
              <h3>Método de Pagamento</h3>
              
              <div className="payment-methods">
                <label className={metodoPagamento === 'pix' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    value="pix"
                    checked={metodoPagamento === 'pix'}
                    onChange={() => setMetodoPagamento('pix')}
                  />
                  PIX
                  <span>Pagamento instantâneo com 5% de desconto</span>
                </label>
                
                <label className={metodoPagamento === 'cartao' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    value="cartao"
                    checked={metodoPagamento === 'cartao'}
                    onChange={() => setMetodoPagamento('cartao')}
                  />
                  Cartão de Crédito
                </label>
                
                <label className={metodoPagamento === 'boleto' ? 'active' : ''}>
                  <input
                    type="radio"
                    name="payment"
                    value="boleto"
                    checked={metodoPagamento === 'boleto'}
                    onChange={() => setMetodoPagamento('boleto')}
                  />
                  Boleto Bancário
                </label>
              </div>
            </section>
          </div>

          <div className="right-column">
            <div className="order-summary">
              <h3>Resumo do Pedido</h3>
              
              <div className="order-items">
                {carrinho.map(item => (
                    <div key={item.id || item.livroId} className="order-item-visual">
                       <div className="item-image-wrapper">
                           <img 
                    src={item.capa ? `http://localhost:3001/uploads/${item.capa}` : '/livro-sem-capa.jpg'} 
                    alt={item.titulo} 
                    className="item-image-enlarged"
                          />
        <div className="item-quantity-badge">{item.quantidade}</div>
      </div>
      <span className="item-title">{item.titulo}</span>
    </div>
  ))}
</div>
              
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>R$ {calcularTotal().toFixed(2)}</span>
                </div>
                {metodoPagamento === 'pix' && (
                  <div className="summary-row discount">
                    <span>Desconto:</span>
                    <span>R$ {(calcularTotal() * 0.05).toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Frete:</span>
                  <span>Grátis</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>
                    R$ {(
                      metodoPagamento === 'pix' 
                        ? calcularTotal() * 0.95 
                        : calcularTotal()
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button 
                className="confirm-button" 
                onClick={handleFinalizarPedido}
                disabled={carrinho.length === 0 || loading}
              >
                {loading ? 'Processando...' : 'Finalizar Compra'}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Comprar;