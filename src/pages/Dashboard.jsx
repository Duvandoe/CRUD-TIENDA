import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      // Obtener productos
      axios
        .get('http://localhost:5000/api/productos', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setProducts(response.data))
        .catch((error) => console.error(error));
    }
  }, [navigate]);

  return (
    <div>
      <h2>Dashboard</h2>
      <ProductForm />
      <ProductList products={products} />
    </div>
  );
}

export default Dashboard;
