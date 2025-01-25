import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, contrasena });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Redirigir al dashboard después de iniciar sesión
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <button className="back-button"><a href="/">Regresar al inicio</a></button>
      <h2>Iniciar Sesión</h2>
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
        <button type="submit">Iniciar Sesión</button>
        <h3 className='cuenta'>
          ¿No tienes una cuenta? <a href="/register">Registrarse</a>
        </h3>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;




