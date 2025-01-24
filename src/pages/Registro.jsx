import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registro.css'; // Importa el archivo de estilos

function Registro() {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, contrasena });
      navigate('/login');
    } catch (error) {
      console.error('Error al registrarse:', error.response ? error.response.data : error);
      alert("Hubo un error al registrarse. Inténtalo de nuevo.");
    }
  };
  
  return (
    <div className="registro-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
        <h3>¿Tienes cuenta? <a href="/login">Iniciar sesión</a></h3>
      </form>
    </div>
  );
}

export default Registro;

