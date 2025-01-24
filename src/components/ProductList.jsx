import React from 'react';
import './ProductList.css'; // Asegúrate de importar el CSS

function ProductList({ products }) {
  return (
    <div className="product-list">
      <h3>Lista de Productos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>{product.precio}</td>
              <td>{product.categoria}</td>
              <td>{product.cantidad}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;

