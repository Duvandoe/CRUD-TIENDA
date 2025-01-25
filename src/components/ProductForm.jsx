import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import './ProductForm.css'; // Asegúrate de importar el CSS

function ProductForm() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Verifica si el token está presente
    if (!token) {
      Swal.fire({
        title: 'Error',
        text: 'Token no encontrado. Inicia sesión.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/productos',
        {
          nombre,
          descripcion,
          precio,
          categoria,
          cantidad,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Aquí se envía el token correctamente
          },
        }
      );

      // Mostrar alerta de éxito
      Swal.fire({
        title: '¡Producto añadido!',
        text: `El producto "${response.data.nombre}" se agregó correctamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      // Limpiar los campos después de agregar
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setCategoria('');
      setCantidad('');
    } catch (error) {
      console.error('Error al agregar producto:', error.response ? error.response.data : error.message);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo agregar el producto. Inténtalo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    }
  };

  return (
    <div className="product-form">
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


