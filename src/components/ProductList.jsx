import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importamos iconos de FontAwesome
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "No se pudo cargar la lista de productos",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!token) {
      Swal.fire("Error", "Token no encontrado. Por favor, inicia sesión.", "error");
      return;
    }

    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el producto de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:5000/api/productos/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
          fetchProducts();
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "Error al eliminar el producto",
        "error"
      );
    }
  };

  const handleEdit = async (product) => {
    if (!token) {
      Swal.fire("Error", "Token no encontrado. Por favor, inicia sesión.", "error");
      return;
    }

    try {
      const { value: formValues } = await Swal.fire({
        title: "Editar Producto",
        html: ` 
          <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${product.nombre}" />
          <input id="swal-descripcion" class="swal2-input" placeholder="Descripción" value="${product.descripcion}" />
          <input id="swal-precio" class="swal2-input" placeholder="Precio" value="${product.precio}" type="number" />
          <input id="swal-categoria" class="swal2-input" placeholder="Categoría" value="${product.categoria}" />
          <input id="swal-cantidad" class="swal2-input" placeholder="Cantidad" value="${product.cantidad}" type="number" />
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return {
            nombre: document.getElementById("swal-nombre").value,
            descripcion: document.getElementById("swal-descripcion").value,
            precio: document.getElementById("swal-precio").value,
            categoria: document.getElementById("swal-categoria").value,
            cantidad: document.getElementById("swal-cantidad").value,
          };
        },
      });

      if (formValues) {
        const response = await axios.put(
          `http://localhost:5000/api/productos/${product._id}`,
          formValues,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          Swal.fire("¡Actualizado!", "El producto ha sido actualizado.", "success");
          fetchProducts();
        }
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.msg || "Error al actualizar el producto",
        "error"
      );
    }
  };

  return (
    <div className="product-list">
    <h3>Lista de Productos</h3>
    <div className="table-wrapper">
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
                <button className="edit-btn" onClick={() => handleEdit(product)}>
                  <FaEdit /> Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  

  );
}

export default ProductList;





