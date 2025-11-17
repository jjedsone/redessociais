import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { username, password },
        { withCredentials: true },
      );

      if (response.data.ok) {
        onLoginSuccess(response.data.user);
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Multipost Dashboard</h1>
        <p className="login-subtitle">Faça login para continuar</p>

        <form onSubmit={handleSubmit} className="login-form">
          <fieldset className="field-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="username"
            />
          </fieldset>

          <fieldset className="field-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </fieldset>

          {error && <div className="status-bar error">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-hint">
          <small>
            Usuário padrão: <strong>admin</strong> / Senha padrão: <strong>admin123</strong>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;

