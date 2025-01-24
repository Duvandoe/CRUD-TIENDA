import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import Logout from '../components/Logout';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('list'); // Estado para cambiar la vista
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
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => setView('list')}>Ver Productos</li>
          <li onClick={() => setView('create')}>Crear Producto</li>
          <li onClick={() => setView('update')}>Actualizar Producto</li>
          <li onClick={() => setView('delete')}>Eliminar Producto</li>
          <Logout />
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        {view === 'list' && <ProductList products={products} />}
        {view === 'create' && <ProductForm />}
        {view === 'update' && <h3>Función de actualizar en construcción...</h3>}
        {view === 'delete' && <h3>Función de eliminar en construcción...</h3>}
      </div>
    </div>
  );
}

export default Dashboard;

