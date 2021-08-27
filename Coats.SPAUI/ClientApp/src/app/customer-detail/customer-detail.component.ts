import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer?: Customer;
  @Output() reloadCustomerNotification = new EventEmitter<boolean>();

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }



  //GetCustomerById(id: number) {

  //  this.customerService.GetCustomerById(id).subscribe(r => {

  //    this.customer = {
  //      id: r.id,
  //      companyName: r.companyName,
  //      contactPersonName: r.contactPersonName,
  //      companyAddress: r.companyAddress,
  //      email: r.email,
  //      phone: r.phone,
  //      dateCreated: r.dateCreated,
  //      dateModified: r.dateModified,
  //      createdBy: r.createdBy,
  //      modifiedBy: r.modifiedBy
  //    };

  //    this.Log(`${r.id} is fatched`);
  //  });
  //}

  OnSave(c: Customer) {
    if (c.id == 0) {
      const dateNow = new Date();
      c.dateCreated = dateNow;
      c.dateModified = c.dateCreated;
      c.createdBy = 'spaui';
      c.modifiedBy = c.createdBy;

      this.customerService.AddCustomer(c).subscribe(res => {

        this.Log('Customer added successfully');
        //this.Log(res);

        this.customer = null;
        //Refresh List
        this.reloadCustomerNotification.emit(true);

      },
        errorRespnse => {

          if (errorRespnse.status != 200) {
            console.error(errorRespnse);
            //this.Log(error);
            this.Log(`Failed due to ${JSON.stringify(errorRespnse.error)}`);
          }
          else {
            this.Log(`Customer added successfully`);
            this.customer = null;
            //Refresh List
            this.reloadCustomerNotification.emit(true);
          }
          
        }
      );
    }
    else {

      this.customerService.UpdateCustomer(c).subscribe(res => {

        this.Log(`Customer updated successfully`);

        this.customer = null;

        //Refresh List
        this.reloadCustomerNotification.emit(true);

        },
        errorRespnse => {

          if (errorRespnse.status != 200) {
            console.error(errorRespnse);
            //this.Log(error);
            this.Log(`Failed due to ${JSON.stringify(errorRespnse.error)}`);
          }
          else {
            this.Log(`Customer updated successfully`);
            this.customer = null;
            //Refresh List
            this.reloadCustomerNotification.emit(true);
            
          }

        }

      );
    }


  }



  Log(message: string) {
    this.messageService.Add(message);
  }


}
