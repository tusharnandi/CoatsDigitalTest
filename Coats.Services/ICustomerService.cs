using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Coats.Data;

namespace Coats.Services
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomer(long id);
        void AddCustomer(Customer cust);
        void EditCustomer(Customer cust);
        void DeleteCustomer(long id);
    }
}
