using System;
using Coats.Data;
using Coats.Repository;
using System.Collections.Generic;

namespace Coats.Services
{


    public class CustomerService : ICustomerService
    {
        private IRepository<Customer> repository;


        public CustomerService(IRepository<Customer> repository)
        {
            this.repository = repository;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            return repository.GetAll();
        }

        public Customer GetCustomer(long id)
        {
            return repository.Get(id);
        }

        public void AddCustomer(Customer cust)
        {
            repository.Add(cust);
        }
        public void EditCustomer(Customer cust)
        {
            repository.Edit(cust);
        }

        public void DeleteCustomer(long id)
        {

            Customer user =  this.GetCustomer(id);
            repository.Delete(user);
            //repository.SaveChanges();
        }
    }
}
