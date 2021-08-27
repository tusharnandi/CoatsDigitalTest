using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Coats.Data
{
    public class Customer: BaseEntity
    {
        
        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string ContactPersonName { get; set; }

        public string CompanyAddress { get; set; }



        [EmailAddress]
        public string Email { get; set; }

        [Phone]
        public string Phone { get; set; }

    }
}
