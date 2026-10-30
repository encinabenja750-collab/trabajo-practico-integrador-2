import { useState } from 'react';
import { useForm } from '../hooks/useForm.js';
import { Link, useNavigate } from 'react-router'; 

export const LoginPage = () => {
  
  const { email, password, formState, handleInputChange } = useForm({
    email: '',
    password: ''
  });

  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    setErrorMessage(null);
    setIsLoading(true);

    try {
      
      const resp = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState), 
        credentials: 'include' 
      });

      
      if (!resp.ok) {
        if (resp.status === 401) {
          throw new Error('Credenciales incorrectas. Verificá tu correo y contraseña.');
        } else if (resp.status === 400) {
          throw new Error('Datos del formulario mal formados o incompletos.');
        } else {
          throw new Error('Ocurrió un error en el servidor. Intentalo más tarde.');
        }
      }

      
      const data = await resp.json();
      console.log('Login exitoso, datos del servidor:', data);

      
      localStorage.setItem('isLogged', 'true');

      
      navigate('/');

    } catch (error) {
      
      setErrorMessage(error.message);
    } finally {
      
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>

        
        {errorMessage && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-4">
            <p className="text-xs text-red-700 font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50"
              placeholder="correo@ejemplo.com"
              required
              disabled={isLoading} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50"
              placeholder="••••••••"
              required
              disabled={isLoading} 
            />
          </div>

          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-2 flex justify-center items-center cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                Ingresando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          ¿No tenés una cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Registrate acá
          </Link>
        </p>

      </div>
    </div>
  );
};
