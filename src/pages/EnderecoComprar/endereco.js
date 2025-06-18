import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { Faixa } from '../../components/Faixa/Faixa';
import './endereco.css';
import Logo from '../../assets/images/logo.png';

const Endereco = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [address, setAddress] = useState({
    nome: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const [pedidoInfo, setPedidoInfo] = useState(null);
  
  useEffect(() => {
    const pedidoTemporario = localStorage.getItem('pedidoTemporario');
    if (pedidoTemporario) {
      setPedidoInfo(JSON.parse(pedidoTemporario));
    } else {
      navigate('/comprar');
    }
  }, [navigate]);

  // Função para formatar CEP (igual Cadastro.js)
  const formatCEP = (value) => {
    value = value.replace(/\D/g, '');
    value = value.slice(0, 8);
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{1,3})/, '$1-$2');
    }
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === 'cep') {
      formattedValue = formatCEP(value);
    } else if (name === 'estado') {
      formattedValue = value.toUpperCase();
    }
    setAddress({ ...address, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pedidoCompleto = {
        ...pedidoInfo,
        enderecoEntrega: address,
        data: new Date().toISOString()
      };

      localStorage.setItem('pedidoFinal', JSON.stringify(pedidoCompleto));
      navigate('/confirmar-compra', { state: pedidoCompleto });

    } catch (error) {
      console.error('Erro ao processar pedido:', error);
      alert('Erro ao processar seu pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!pedidoInfo) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="endereco-container">
      <Faixa />
      <Navbar />
      
      <main className="endereco-main">
        <div className="logo-container">
          <img src={Logo} alt="logo" className="logo" />
        </div>
        
        <div className="endereco-content">
          <h1 className="titulo-principal">Endereço de Entrega</h1>

          <form className="delivery-address-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Nome Completo
                <input 
                  type="text" 
                  name="nome" 
                  value={address.nome} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>

            <div className="form-row-duo rua-cep">
              <label>
                Rua
                <input 
                  type="text" 
                  name="rua" 
                  value={address.rua} 
                  onChange={handleChange} 
                  required 
                />
              </label>
              
              <label>
                CEP
                <input 
                  type="text" 
                  name="cep" 
                  value={address.cep} 
                  onChange={handleChange} 
                  required 
                  pattern="\d{5}-?\d{3}"
                  placeholder="00000-000"
                />
              </label>
            </div>

            <div className="form-row-duo">
              <label className="numero-label">
                Número
                <input 
                  type="text" 
                  name="numero" 
                  value={address.numero} 
                  onChange={handleChange} 
                  required 
                />
              </label>

              <label>
                Complemento
                <input 
                  type="text" 
                  name="complemento" 
                  value={address.complemento} 
                  onChange={handleChange} 
                  required 
                />
              </label>
            </div>

            <div className="form-row-duo">
              <label>
                Cidade
                <input 
                  type="text" 
                  name="cidade" 
                  value={address.cidade} 
                  onChange={handleChange} 
                  required 
                />
              </label>

              <label className="estado-label">
                Estado
                <input 
                  type="text" 
                  name="estado" 
                  value={address.estado} 
                  onChange={handleChange} 
                  required 
                  maxLength="2"
                  placeholder="SP"
                />
              </label>
            </div>

            <button 
              className="checkout-button full-width" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>
      </main>
      
      
    </div>
  );
};

export default Endereco;