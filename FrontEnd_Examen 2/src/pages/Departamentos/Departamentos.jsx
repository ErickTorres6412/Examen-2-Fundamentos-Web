import { useState, useEffect } from 'react';
import DynamicTable from '../../components/common/DynamicTable';
import { useCRUD } from '../../hooks/Crud/useCRUD';
import { departmentService } from '../../services/apiService';
import { Plus } from 'lucide-react';
import GenericForm from '../../components/common/GenericForm';
import FilterComponent from '../../components/common/FilterComponent';

const Departamentos = () => {
    // Definir las columnas de la tabla
    const columns = ['ID', 'Nombre', 'Presupuesto', 'Fecha de Inicio', 'Administrador'];

    // Usar el hook CRUD con el servicio de department y especificar el campo ID
    const {
        data: departments,
        loading,
        create,
        update,
        remove
    } = useCRUD(departmentService, { idField: 'departmentId' });

    // Estados para el formulario
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState(null);
    const [tableData, setTableData] = useState([]);
    
    // Estado para los datos filtrados
    const [filteredData, setFilteredData] = useState([]);
    
    // Obtener la fecha actual en formato YYYY-MM-DD para el input date
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    // Nuevo estado para el formulario de creación
    const [newDepartmentData, setNewDepartmentData] = useState({
        departmentId: '',
        name: '',
        budget: '',
        startDate: getCurrentDate(),
        administrator: ''
    });

    // Definir campos del formulario para creación
    const createFormFields = [
        { name: 'departmentId', label: 'ID de Departamento', type: 'number', required: true },
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'budget', label: 'Presupuesto', type: 'number', required: true, step: '0.01' },
        { name: 'startDate', label: 'Fecha de Inicio', type: 'date', required: true },
        { name: 'administrator', label: 'Administrador', type: 'number', required: true }
    ];

    // Definir campos del formulario para edición (sin departmentId)
    const editFormFields = [
        { name: 'name', label: 'Nombre', type: 'text', required: true },
        { name: 'budget', label: 'Presupuesto', type: 'number', required: true, step: '0.01' },
        { name: 'startDate', label: 'Fecha de Inicio', type: 'date', required: true },
        { name: 'administrator', label: 'Administrador', type: 'number', required: true }
    ];

    // Formatear fecha para mostrar en la tabla
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Fecha inválida';
            
            return date.toLocaleDateString();
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
            return 'Error en fecha';
        }
    };

    // Formatear presupuesto para mostrar en la tabla
    const formatBudget = (budget) => {
        if (budget === null || budget === undefined) return 'N/A';
        
        try {
            return new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(budget);
        } catch (error) {
            console.error('Error al formatear el presupuesto:', error);
            return budget.toString();
        }
    };

    // Actualizar tableData cuando departments cambie
    useEffect(() => {
        if (departments && departments.length > 0) {
            const formattedData = departments.map(department => {
                // Verificar que el objeto department tenga todas las propiedades esperadas
                if (!department) return null;
                
                return {
                    id: department.departmentId,
                    nombre: department.name,
                    presupuesto: formatBudget(department.budget),
                    fechaInicio: formatDate(department.startDate),
                    administrador: department.administrator,
                    // Guardamos los valores originales para filtrar
                    rawBudget: department.budget,
                    rawStartDate: department.startDate
                };
            }).filter(item => item !== null); // Filtrar items nulos
            
            console.log('Datos formateados para tabla:', formattedData);
            setTableData(formattedData);
            setFilteredData(formattedData); // Inicialmente, los datos filtrados son todos los datos
        } else {
            setTableData([]);
            setFilteredData([]);
        }
    }, [departments]);

    // Manejadores de acciones
    const handleEdit = (department) => {
        // Formatear la fecha para el input date (YYYY-MM-DD)
        let formattedDate;
        try {
            const date = new Date(department.rawStartDate);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString().split('T')[0];
            } else {
                formattedDate = getCurrentDate();
            }
        } catch (error) {
            console.error('Error al procesar la fecha:', error);
            formattedDate = getCurrentDate();
        }
        
        setCurrentDepartment({
            ...department,
            formattedDate,
            budget: department.rawBudget
        });
        setShowEditForm(true);
        setShowCreateForm(false);
    };

    const handleDelete = async (department) => {
        try {
            // Pasar el ID correcto al método remove
            await remove(department.id);
            // No es necesario recargar datos aquí, el hook useCRUD ya actualiza el estado
        } catch (error) {
            console.error('Error al eliminar departamento:', error);
        }
    };

    const handleCreate = () => {
        // Reiniciar los datos del nuevo departamento
        setNewDepartmentData({
            departmentId: '',
            name: '',
            budget: '',
            startDate: getCurrentDate(),
            administrator: ''
        });
        setShowCreateForm(true);
        setShowEditForm(false);
    };

    // Convertir fecha a formato ISO seguro
    const toISODateString = (dateString) => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                // Si la fecha es inválida, usar la fecha actual
                return new Date().toISOString();
            }
            return date.toISOString();
        } catch (error) {
            console.error('Error al convertir a ISO:', error);
            return new Date().toISOString();
        }
    };

    const handleSubmitCreate = async (formData) => {
        try {
            const newDepartmentData = {
                departmentId: parseInt(formData.departmentId),
                name: formData.name,
                budget: parseFloat(formData.budget),
                startDate: toISODateString(formData.startDate),
                administrator: parseInt(formData.administrator)
            };
            
            console.log('Enviando datos para crear:', newDepartmentData);
            await create(newDepartmentData);
            
            // Si hay problemas con la actualización automática, podemos forzar una recarga
            // await fetchData();
            
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error al crear departamento:', error);
        }
    };

    const handleSubmitEdit = async (formData) => {
        try {
            const departmentData = {
                departmentId: currentDepartment.id, // Mantener el ID actual para la actualización
                name: formData.name,
                budget: parseFloat(formData.budget),
                startDate: toISODateString(formData.startDate),
                administrator: parseInt(formData.administrator)
            };
        
            console.log('Datos a enviar para actualizar:', departmentData);
            await update(departmentData);
            
            // Si hay problemas con la actualización automática, podemos forzar una recarga
            // await fetchData();
            
            setShowEditForm(false); // Cerrar el formulario después de editar
        } catch (error) {
            console.error('Error al actualizar departamento:', error);
        }
    };

    const handleCancel = () => {
        setShowCreateForm(false);
        setShowEditForm(false);
    };

    // Manejar filtrado
    const handleFilter = (filters) => {
        const { searchText, startDate, endDate } = filters;
        
        let filtered = [...tableData];
        
        // Filtrar por texto (ID, nombre o administrador)
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            filtered = filtered.filter(item => 
                (item.id && item.id.toString().includes(searchLower)) || 
                (item.nombre && item.nombre.toLowerCase().includes(searchLower)) ||
                (item.administrador && item.administrador.toString().includes(searchLower))
            );
        }
        
        // Filtrar por fecha de inicio
        if (startDate) {
            const startDateTime = new Date(startDate).getTime();
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.rawStartDate).getTime();
                return itemDate >= startDateTime;
            });
        }
        
        // Filtrar por fecha de fin
        if (endDate) {
            const endDateTime = new Date(endDate).getTime() + (24 * 60 * 60 * 1000 - 1); // Fin del día
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.rawStartDate).getTime();
                return itemDate <= endDateTime;
            });
        }
        
        setFilteredData(filtered);
    };

    // Renderizado condicional de carga
    if (loading) {
        return <div>Cargando departamentos...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-emerald-700">Gestión de Departamentos</h1>
                {!showCreateForm && !showEditForm && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                    >
                        <Plus size={18} className="mr-2" />
                        Nuevo Departamento
                    </button>
                )}
            </div>

            {showCreateForm && (
                <div className="mb-8">
                    <GenericForm
                        initialData={newDepartmentData}
                        fields={createFormFields}
                        onSubmit={handleSubmitCreate}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {showEditForm && currentDepartment && (
                <div className="mb-8">
                    <GenericForm
                        initialData={{
                            name: currentDepartment.nombre,
                            budget: currentDepartment.budget,
                            startDate: currentDepartment.formattedDate || getCurrentDate(),
                            administrator: currentDepartment.administrador
                        }}
                        fields={editFormFields}
                        onSubmit={handleSubmitEdit}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {!showCreateForm && !showEditForm && (
                <>
                    {/* Componente de filtros */}
                    <FilterComponent onFilter={handleFilter} />
                    
                    <DynamicTable
                        columns={columns}
                        data={filteredData}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </>
            )}
        </div>
    );
};

export default Departamentos;