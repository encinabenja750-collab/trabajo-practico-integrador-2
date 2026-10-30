import { useState } from "react";
import { useForm } from "../hooks/useForm.js";
import { Link, useNavigate } from "react-router";

export const RegisterPage = () => {
  const {
    username,
    email,
    password,
    formState,
    handleInputChange,
    handleReset,
  } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setGeneralError(null);
    setValidationErrors([]);
    setIsLoading(true);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        },
      );

      const data = await resp.json();

      if (!resp.ok) {
        if (resp.status === 400 && data.errors) {
          throw { isValidationError: true, errorsList: data.errors };
        } else {
          throw new Error(
            data.message || "Ocurrió un error al procesar el registro.",
          );
        }
      }

      console.log("Registro exitoso:", data);

      handleReset();

      navigate("/login");
    } catch (error) {
      if (error.isValidationError) {
        setValidationErrors(error.errorsList);
      } else {
        setGeneralError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Crear Cuenta
        </h2>

        {generalError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded mb-4">
            <p className="text-xs text-red-700 font-medium">{generalError}</p>
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded mb-4 space-y-1">
            <p className="text-xs text-orange-800 font-bold">
              Por favor corregí los siguientes campos:
            </p>
            <ul className="list-disc list-inside text-xs text-orange-700 font-medium">
              {validationErrors.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition disabled:opacity-50"
              placeholder="Ej: juan_perez"
              required
              disabled={isLoading}
            />
          </div>

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
                Registrando...
              </>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          ¿Ya tenés una cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Iniciá sesión acá
          </Link>
        </p>
      </div>
    </div>
  );
};
