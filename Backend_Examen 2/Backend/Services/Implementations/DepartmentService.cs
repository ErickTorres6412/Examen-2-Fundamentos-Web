using Backend.DTO;
using Backend.Services.Interfaces;
using DAL.Interfaces;
using Entities.Entities;

namespace BackEnd.Services.Implementations
{
    public class DepartmentService : IDepartmentService
    {
        IUnidadDeTrabajo _unidadDeTrabajo;

        public DepartmentService(IUnidadDeTrabajo unidad)
        {
            _unidadDeTrabajo = unidad;
        }

        DepartmentDTO Convertir(Department department)
        {
            return new DepartmentDTO
            {
                DepartmentId = department.DepartmentId,
                Name = department.Name,
                Budget = department.Budget,
                StartDate = department.StartDate,
                Administrator = department.Administrator
            };
        }

        Department Convertir(DepartmentDTO department)
        {
            return new Department
            {
                DepartmentId = department.DepartmentId,
                Name = department.Name,
                Budget = department.Budget,
                StartDate = department.StartDate,
                Administrator = department.Administrator
            };
        }

        public DepartmentDTO AddDepartment(DepartmentDTO department)
        {
            _unidadDeTrabajo.DepartmentDAL.Add(Convertir(department));
            _unidadDeTrabajo.Complete();
            return department;
        }

        public DepartmentDTO DeleteDepartment(int id)
        {
            var department = _unidadDeTrabajo.DepartmentDAL.FindById(id);
            if (department == null)
            {
                return null;
            }
            _unidadDeTrabajo.DepartmentDAL.Remove(department);
            _unidadDeTrabajo.Complete();
            return Convertir(department);
        }

        public List<DepartmentDTO> GetDepartments()
        {
            var departments = _unidadDeTrabajo.DepartmentDAL.Get();
            List<DepartmentDTO> departmentDTOs = new List<DepartmentDTO>();
            foreach (var department in departments)
            {
                departmentDTOs.Add(this.Convertir(department));
            }
            return departmentDTOs;
        }

        public DepartmentDTO GetDepartmentById(int id)
        {
            var result = _unidadDeTrabajo.DepartmentDAL.FindById(id);
            return Convertir(result);
        }

        public DepartmentDTO UpdateDepartment(DepartmentDTO department)
        {
            var entity = Convertir(department);
            _unidadDeTrabajo.DepartmentDAL.Update(entity);
            _unidadDeTrabajo.Complete();
            return department;
        }
    }

    namespace Backend.Services.Implementations
    {
        public class DepartmentService
        {
        }
    }
}
