import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import Logout from '../components/Logout';
import banner from '../img/banner.png';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('list'); // Estado para cambiar la vista
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para el menú desplegable
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token recuperado del localStorage:", token);
    if (!token) {
      navigate('/login'); // Redirigir si no hay token
    } else {
      axios
        .get('http://localhost:5000/api/productos', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setProducts(response.data))
        .catch((error) => {
          console.error('Error al obtener productos:', error);
          navigate('/login'); // Redirigir si el token es inválido
        });
    }
  }, [navigate]); // Dependencia para que se ejecute solo cuando el componente se monta

  return (
    <div className="dashboard-container">
      {/* Botón de hamburguesa (ahora oculto mediante CSS) */}
      <button
        className={`hamburger-btn ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? '' : 'hidden'}`}>
        <h2>Dashboard</h2>
        <div className="banner-container">
          <img src={banner} alt="banner" className="sidebar-banner" />
        </div>
        <ul>
          <li onClick={() => setView('list')}>Ver Productos</li>
          <li onClick={() => setView('create')}>Crear Producto</li>
          <Logout />
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        {view === 'list' && <ProductList products={products} />}
        {view === 'create' && <ProductForm />}
      </div>
    </div>
  );
}

export default Dashboard;



