import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './Carrinho.css';
import { Navbar } from '../../components/Navbar/Navbar.js';
import { Faixa } from '../../components/Faixa/Faixa.js';
import Footer from '../../components/Footer/Footer.js';

const Carrinho = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = localStorage.getItem('carrinho');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        
        const newCartItems = [...cartItems];
        newCartItems[index].quantidade = newQuantity;
        setCartItems(newCartItems);
        localStorage.setItem('carrinho', JSON.stringify(newCartItems));
    };

    const removeFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        localStorage.setItem('carrinho', JSON.stringify(newCartItems));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => 
            total + (item.preco * item.quantidade), 0).toFixed(2);
    };

    const handleCheckout = () => {
        navigate('/comprar');
    };

    const continueShopping = () => {
        navigate('/livros');
    };

    return (
        <div className="livros-content">
            <Faixa />
            <Navbar />
            <div className="carrinho-container">
                <div className="carrinho-header">
                    <h1>Seu Carrinho de Compras</h1>
                    <button onClick={continueShopping} className="continue-btn">
                        Continuar Comprando
                    </button>
                </div>

                <div className="carrinho-items">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Seu carrinho está vazio</p>
                            <button onClick={continueShopping} className="btn-primary">
                                Ver Livros
                            </button>
                        </div>
                    ) : (
                        <>
                            {cartItems.map((item, index) => (
                                <div key={index} className="carrinho-item">
                                    <div className="item-image">
                                        {item.capa ? (
                                            <img 
                                                src={`http://localhost:3001/uploads/${item.capa}`} 
                                                alt={item.titulo} 
                                            />
                                        ) : (
                                            <div className="livro-capa-placeholder">Sem capa</div>
                                        )}
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.titulo}</h3>
                                        <p className="autor">{item.autor}</p>
                                        <p className="preco">R$ {item.preco.toFixed(2)}</p>
                                        
                                        <div className="quantity-control">
                                            <button 
                                                onClick={() => updateQuantity(index, item.quantidade - 1)}
                                                disabled={item.quantidade <= 1}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span>{item.quantidade}</span>
                                            <button 
                                                onClick={() => updateQuantity(index, item.quantidade + 1)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(index)}
                                        className="remove-btn"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}

                            <div className="carrinho-summary">
                                <div className="carrinho-total">
                                    <span>Total:</span>
                                    <span>R$ {calculateTotal()}</span>
                                </div>

                                <button 
                                    onClick={handleCheckout} 
                                    className="checkout-btn"
                                >
                                    Finalizar Compra
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Carrinho;