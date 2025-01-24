import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Logout.css'; // Asegúrate de importar el CSS

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de login
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
}

export default Logout;

