import { useState, useEffect } from 'react';
import DynamicTable from '../../components/common/DynamicTable';
import { useCRUD } from '../../hooks/Crud/useCRUD';
import { personService } from '../../services/apiService';
import { Plus } from 'lucide-react';
import GenericForm from '../../components/common/GenericForm';
import FilterComponent from '../../components/common/FilterComponent';

const Personas = () => {
    // Definir las columnas de la tabla
    const columns = ['ID', 'Nombre', 'Apellido', 'Fecha Contratación', 'Fecha Inscripción', 'Discriminador'];

    // Usar el hook CRUD con el servicio de person y especificar el campo ID
    const {
        data: persons,
        loading,
        create,
        update,
        remove
    } = useCRUD(personService, { idField: 'personId' });

    // Estados para el formulario
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentPerson, setCurrentPerson] = useState(null);
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
    const [newPersonData, setNewPersonData] = useState({
        personId: '',
        firstName: '',
        lastName: '',
        hireDate: getCurrentDate(),
        enrollmentDate: getCurrentDate(),
        discriminator: ''
    });

    // Definir campos del formulario para creación
    const createFormFields = [
        { name: 'personId', label: 'ID de Persona', type: 'number', required: true },
        { name: 'firstName', label: 'Nombre', type: 'text', required: true },
        { name: 'lastName', label: 'Apellido', type: 'text', required: true },
        { name: 'hireDate', label: 'Fecha de Contratación', type: 'date', required: true },
        { name: 'enrollmentDate', label: 'Fecha de Inscripción', type: 'date', required: true },
        { name: 'discriminator', label: 'Discriminador', type: 'text', required: true }
    ];

    // Definir campos del formulario para edición (sin personId)
    const editFormFields = [
        { name: 'firstName', label: 'Nombre', type: 'text', required: true },
        { name: 'lastName', label: 'Apellido', type: 'text', required: true },
        { name: 'hireDate', label: 'Fecha de Contratación', type: 'date', required: true },
        { name: 'enrollmentDate', label: 'Fecha de Inscripción', type: 'date', required: true },
        { name: 'discriminator', label: 'Discriminador', type: 'text', required: true }
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

    // Actualizar tableData cuando persons cambie
    useEffect(() => {
        if (persons && persons.length > 0) {
            const formattedData = persons.map(person => {
                // Verificar que el objeto person tenga todas las propiedades esperadas
                if (!person) return null;
                
                return {
                    id: person.personId,
                    nombre: person.firstName,
                    apellido: person.lastName,
                    fechaContratacion: formatDate(person.hireDate),
                    fechaInscripcion: formatDate(person.enrollmentDate),
                    discriminador: person.discriminator,
                    // Guardamos los valores originales para filtrar
                    rawHireDate: person.hireDate,
                    rawEnrollmentDate: person.enrollmentDate
                };
            }).filter(item => item !== null); // Filtrar items nulos
            
            console.log('Datos formateados para tabla:', formattedData);
            setTableData(formattedData);
            setFilteredData(formattedData); // Inicialmente, los datos filtrados son todos los datos
        } else {
            setTableData([]);
            setFilteredData([]);
        }
    }, [persons]);

    // Manejadores de acciones
    const handleEdit = (person) => {
        // Formatear las fechas para el input date (YYYY-MM-DD)
        let formattedHireDate, formattedEnrollmentDate;
        
        try {
            const hireDate = new Date(person.rawHireDate);
            if (!isNaN(hireDate.getTime())) {
                formattedHireDate = hireDate.toISOString().split('T')[0];
            } else {
                formattedHireDate = getCurrentDate();
            }
        } catch (error) {
            console.error('Error al procesar la fecha de contratación:', error);
            formattedHireDate = getCurrentDate();
        }

        try {
            const enrollmentDate = new Date(person.rawEnrollmentDate);
            if (!isNaN(enrollmentDate.getTime())) {
                formattedEnrollmentDate = enrollmentDate.toISOString().split('T')[0];
            } else {
                formattedEnrollmentDate = getCurrentDate();
            }
        } catch (error) {
            console.error('Error al procesar la fecha de inscripción:', error);
            formattedEnrollmentDate = getCurrentDate();
        }
        
        setCurrentPerson({
            ...person,
            formattedHireDate,
            formattedEnrollmentDate
        });
        setShowEditForm(true);
        setShowCreateForm(false);
    };

    const handleDelete = async (person) => {
        try {
            // Pasar el ID correcto al método remove
            await remove(person.id);
            // No es necesario recargar datos aquí, el hook useCRUD ya actualiza el estado
        } catch (error) {
            console.error('Error al eliminar persona:', error);
        }
    };

    const handleCreate = () => {
        // Reiniciar los datos de la nueva persona
        setNewPersonData({
            personId: '',
            firstName: '',
            lastName: '',
            hireDate: getCurrentDate(),
            enrollmentDate: getCurrentDate(),
            discriminator: ''
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
            const newPersonData = {
                personId: parseInt(formData.personId),
                firstName: formData.firstName,
                lastName: formData.lastName,
                hireDate: toISODateString(formData.hireDate),
                enrollmentDate: toISODateString(formData.enrollmentDate),
                discriminator: formData.discriminator
            };
            
            console.log('Enviando datos para crear:', newPersonData);
            await create(newPersonData);
            
            // Si hay problemas con la actualización automática, podemos forzar una recarga
            // await fetchData();
            
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error al crear persona:', error);
        }
    };

    const handleSubmitEdit = async (formData) => {
        try {
            const personData = {
                personId: currentPerson.id, // Mantener el ID actual para la actualización
                firstName: formData.firstName,
                lastName: formData.lastName,
                hireDate: toISODateString(formData.hireDate),
                enrollmentDate: toISODateString(formData.enrollmentDate),
                discriminator: formData.discriminator
            };
        
            console.log('Datos a enviar para actualizar:', personData);
            await update(personData);
            
            // Si hay problemas con la actualización automática, podemos forzar una recarga
            // await fetchData();
            
            setShowEditForm(false); // Cerrar el formulario después de editar
        } catch (error) {
            console.error('Error al actualizar persona:', error);
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
        
        // Filtrar by texto (ID, nombre, apellido o discriminador)
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            filtered = filtered.filter(item => 
                (item.id && item.id.toString().includes(searchLower)) || 
                (item.nombre && item.nombre.toLowerCase().includes(searchLower)) ||
                (item.apellido && item.apellido.toLowerCase().includes(searchLower)) ||
                (item.discriminador && item.discriminador.toLowerCase().includes(searchLower))
            );
        }
        
        // Filtrar por fecha de contratación (usando startDate y endDate como rango)
        if (startDate) {
            const startDateTime = new Date(startDate).getTime();
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.rawHireDate).getTime();
                return itemDate >= startDateTime;
            });
        }
        
        // Filtrar por fecha de fin
        if (endDate) {
            const endDateTime = new Date(endDate).getTime() + (24 * 60 * 60 * 1000 - 1); // Fin del día
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.rawHireDate).getTime();
                return itemDate <= endDateTime;
            });
        }
        
        setFilteredData(filtered);
    };

    // Renderizado condicional de carga
    if (loading) {
        return <div>Cargando personas...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-emerald-700">Gestión de Personas</h1>
                {!showCreateForm && !showEditForm && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
                    >
                        <Plus size={18} className="mr-2" />
                        Nueva Persona
                    </button>
                )}
            </div>

            {showCreateForm && (
                <div className="mb-8">
                    <GenericForm
                        initialData={newPersonData}
                        fields={createFormFields}
                        onSubmit={handleSubmitCreate}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {showEditForm && currentPerson && (
                <div className="mb-8">
                    <GenericForm
                        initialData={{
                            firstName: currentPerson.nombre,
                            lastName: currentPerson.apellido,
                            hireDate: currentPerson.formattedHireDate || getCurrentDate(),
                            enrollmentDate: currentPerson.formattedEnrollmentDate || getCurrentDate(),
                            discriminator: currentPerson.discriminador
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

export default Personas;