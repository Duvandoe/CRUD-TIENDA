import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Gestión de la Tienda Online</h1>
      <p>Podrás administrar los productos que entran a nuestra tienda online.</p>

      <div className="home-button-container">
        <Link to="/login" className="home-button">Iniciar sesión</Link>
        <Link to="/register" className="home-button">Registrarse</Link>
      </div>
    </div>
  );
};

export default Home;
