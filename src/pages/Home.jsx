import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../img/banner.png';
import envios from '../img/entrega.png';
import soporte from '../img/soporte-tecnico.png';
import persona1 from '../img/persona1.jpeg';
import persona2 from '../img/persona2.jpeg';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Sección Principal (Hero) */}
      <section className="hero-section">
        <img 
          src={banner} 
          alt="Banner Principal" 
          className="hero-image"
        />
        <h1>Bienvenido a nuestra tienda</h1>
        <p>La tienda online para los mejores productos tecnológicos. ¡Comienza hoy!</p>
        <div className="home-button-container">
          <Link to="/login" className="home-button">Iniciar sesión</Link>
          <Link to="/register" className="home-button">Registrarse</Link>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="benefits">
        <h2>¿Por qué elegirnos?</h2>
        <div className="benefit-items">
          <div className="benefit-item">
            <img 
              src={envios} 
              alt="Envíos Rápidos" 
              className="benefit-image"
            />
            <h3>Envíos Rápidos</h3>
            <p>Recibe tus productos de forma segura y en tiempo récord.</p>
          </div>
          <div className="benefit-item">
            <img 
              src={soporte}
              alt="Soporte Técnico" 
              className="benefit-image"
            />
            <h3>Soporte Técnico</h3>
            <p>Contamos con un servicio de soporte para resolver cualquier inconveniente.</p>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="testimonials">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <img 
              src={persona1} 
              alt="Cliente Testimonio" 
              className="testimonial-image"
            />
            <p>"¡La mejor tienda! Compré una laptop y estoy encantado."</p>
            <h4>- Juan Pérez</h4>
          </div>
          <div className="testimonial-card">
            <img 
              src={persona2} 
              alt="Cliente Testimonio" 
              className="testimonial-image"
            />
            <p>"Un excelente servicio, rápido y confiable."</p>
            <h4>- Ana Gómez</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 La Retacadora. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;




