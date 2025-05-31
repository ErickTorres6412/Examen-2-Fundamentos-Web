using Backend.DTO;
using Backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<PersonDTO> Get()
        {
            return _personService.GetPersons();
        }

        [HttpGet("{id}")]
        [Authorize]
        public PersonDTO Get(int id)
        {
            return _personService.GetPersonById(id);
        }


        [HttpPost]
        [Authorize]
        public void Post([FromBody] PersonDTO person)
        {
            _personService.AddPerson(person);
        }

        [HttpPut]
        [Authorize]
        public void Put([FromBody] PersonDTO person)
        {
            _personService.UpdatePerson(person);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public void Delete(int id)
        {
            _personService.DeletePerson(id);
        }
    }
}
