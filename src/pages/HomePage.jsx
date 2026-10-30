import { Navbar } from "../components/Navbar.jsx";
import { useFetch } from "../hooks/useFetch.js";

export const HomePage = () => {
  const {
    data: articles,
    isLoading,
    error,
  } = useFetch(`${import.meta.env.VITE_API_URL}/api/articles`);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center sm:text-left">
          Últimos Artículos Publicados
        </h1>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-lg font-medium text-gray-600">
              Cargando artículos...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm my-4">
            <div className="flex">
              <p className="text-sm text-red-700 font-medium">
                ⚠️ Error al cargar el blog: {error}
              </p>
            </div>
          </div>
        )}

        {!isLoading && !error && (!articles || articles.length === 0) && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              No hay artículos publicados todavía. ¡Sé el primero en escribir
              uno!
            </p>
          </div>
        )}

        {!isLoading && !error && articles && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between"
              >
                <div className="p-6">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide mb-3">
                    Blog
                  </span>

                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition cursor-pointer">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                      {article.author
                        ? article.author.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                    <span className="ml-2 text-xs font-semibold text-gray-700">
                      Por:{" "}
                      <span className="text-gray-900">
                        {article.author || "Anónimo"}
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
