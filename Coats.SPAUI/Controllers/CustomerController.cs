using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Coats.Services;
using Coats.Data;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Coats.SPAUI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class CustomerController : ControllerBase
    {

        #region Property  
        private readonly ICustomerService _customerService;
        #endregion

        #region Constructor  
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }
        #endregion


        [HttpGet(nameof(GetCustomer))]
        public IActionResult GetCustomer(int id)
        {
            var result = _customerService.GetCustomer(id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }
        [HttpGet(nameof(GetAllCustomer))]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Customer>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult GetAllCustomer()
        {
            var result = _customerService.GetCustomers();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }
        [HttpPost(nameof(AddCustomer))]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddCustomer(Customer customer)
        {
            _customerService.AddCustomer(customer);

            return Ok("Customer Data inserted");

        }
        [HttpPut(nameof(EditCustomer))]
        //[ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        public ActionResult EditCustomer(int Id, Customer customer)
        {
            _customerService.EditCustomer(customer);

            return Ok("Customer Updation done");

        }
        [HttpDelete(nameof(DeleteCustomer))]
        public IActionResult DeleteCustomer(int Id)
        {
            _customerService.DeleteCustomer(Id);
            return Ok("Data Deleted");

        }

    }
}
