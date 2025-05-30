import { useState } from "react"
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

const DynamicTable = ({ columns, data, onEdit, onDelete, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1)

  // Calcular páginas
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  // Funciones de navegación
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Función para obtener las claves de los datos (excluyendo propiedades raw)
  const getDataKeys = (item) => {
    return Object.keys(item).filter(key => !key.startsWith('raw'))
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          {/* Encabezados */}
          <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap"
                >
                  {column}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider whitespace-nowrap">
                Acciones
              </th>
            </tr>
          </thead>

          {/* Cuerpo de la tabla */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentData.map((item, rowIndex) => {
              const dataKeys = getDataKeys(item);
              return (
                <tr key={rowIndex} className="hover:bg-emerald-50/40 transition-colors duration-150 ease-in-out">
                  {dataKeys.map((key, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                      <div className="max-w-xs truncate" title={item[key]}>
                        {item[key]}
                      </div>
                    </td>
                  ))}

                  {/* Columna de acciones */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-700 transition-all duration-150 hover:scale-105"
                        aria-label="Editar"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-all duration-150 hover:scale-105"
                        aria-label="Eliminar"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Sin datos */}
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium mb-2">No hay datos disponibles</p>
            <p className="text-gray-400 text-sm">Agrega un nuevo departamento para comenzar</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {data.length > itemsPerPage && (
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gray-50 border-t border-gray-100 gap-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>
              Mostrando{" "}
              <span className="font-semibold text-emerald-600">
                {startIndex + 1}
              </span>{" "}
              a{" "}
              <span className="font-semibold text-emerald-600">
                {Math.min(endIndex, data.length)}
              </span>{" "}
              de{" "}
              <span className="font-semibold text-emerald-600">
                {data.length}
              </span>{" "}
              resultados
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Página{" "}
              <span className="font-semibold text-emerald-600">{currentPage}</span>{" "}
              de{" "}
              <span className="font-semibold text-emerald-600">{totalPages}</span>
            </span>
            
            <div className="flex space-x-1 ml-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-white border border-gray-200 text-emerald-600
                           disabled:opacity-40 disabled:cursor-not-allowed 
                           hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all duration-150
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                aria-label="Página anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center h-9 w-9 rounded-lg bg-white border border-gray-200 text-emerald-600
                           disabled:opacity-40 disabled:cursor-not-allowed 
                           hover:bg-emerald-50 hover:border-emerald-300 hover:scale-105 transition-all duration-150
                           focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                aria-label="Página siguiente"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DynamicTable