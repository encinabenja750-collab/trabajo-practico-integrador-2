import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!resp.ok) {
        console.warn(
          "El servidor devolvió un error al cerrar sesión, igual procederemos localmente.",
        );
      }
    } catch (error) {
      console.error(
        "Error de red al intentar hacer logout en el servidor:",
        error,
      );
    } finally {
      localStorage.removeItem("isLogged");

      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold tracking-wider hover:text-blue-400 transition"
            >
              📝 Mi Blog Personal
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Inicio
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
