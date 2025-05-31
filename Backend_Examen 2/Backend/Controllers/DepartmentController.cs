using Backend.DTO;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<DepartmentDTO> Get()
        {
            return _departmentService.GetDepartments();
        }

        [HttpGet("{id}")]
        [Authorize]
        public DepartmentDTO Get(int id)
        {
            return _departmentService.GetDepartmentById(id);
        }

        [HttpPost]
        [Authorize]
        public void Post([FromBody] DepartmentDTO department)
        {
            _departmentService.AddDepartment(department);
        }

        [HttpPut]
        [Authorize]
        public void Put([FromBody] DepartmentDTO department)
        {
            _departmentService.UpdateDepartment(department);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id)
        {
            _departmentService.DeleteDepartment(id);
        }
    }
}
