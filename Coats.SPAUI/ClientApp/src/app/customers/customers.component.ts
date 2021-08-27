import { Component, OnInit } from '@angular/core';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];

  selectedCustomer?: Customer;

  private enptyCustomer?: Customer;

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService  ) { }

  ngOnInit(): void {

    this.GetCustomers();

  }

  GetCustomers() {

    this.customerService.GetCustomerList().subscribe(res => {
      this.customers = res
    },
    error => {
      console.error(error);
      this.Log(error);
    });

  }

  OnSelect(c: Customer) {
    this.selectedCustomer = c;
  }

  OnAddClick() {

    this.selectedCustomer = {
      id: 0,
      dateCreated: new Date(),
      createdBy: "spaui",
      dateModified: new Date(),
      modifiedBy: "spaui",
      companyName: "",
      contactPersonName: "",
      companyAddress: "",
      email: "",
      phone: "",
    };
  }


  //Refresh List
  OnRefreshCustomerList() {

    //window.alert("Refresh Page");
    this.GetCustomers();

  }

  Log(message: string) {
    this.messageService.Add(message);
  }

}
