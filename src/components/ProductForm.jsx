import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://localhost:5000/api/productos',
        { nombre, descripcion, precio, categoria, cantidad },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Producto agregado');
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <div>
      <h3>Agregar Producto</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
        />
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio"
        />
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Categoría"
        />
        <input
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
        />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default ProductForm;
