import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse  } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Customer } from './Customer';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers: Customer[] = [];
  
  private customerBaseUrl = "/api/customer";

  private httpOptions = {
    headers: new HttpHeaders()
      .set('content.type', 'application/json')
  };


  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  GetCustomerList(): Observable<Customer[]> {

    this.Log(`Loading Customers, Please Wait...`);

    return this.http.get<Customer[]>(this.customerBaseUrl +'/GetAllCustomer')
      .pipe(
        tap(res => {
          this.Log(`Fatched customers data`);

          res.forEach(r => {
            this.customers.push({
              id: r.id,
              companyName: r.companyName,
              contactPersonName: r.contactPersonName,
              companyAddress: r.companyAddress,
              email: r.email,
              phone: r.phone,
              dateCreated: r.dateCreated,
              dateModified: r.dateModified,
              createdBy: r.createdBy,
              modifiedBy: r.modifiedBy
            });
          })
        }),
        catchError(this.HandleHttpError("GetCustomerList", []))
      );
  }

  //GetCustomerById(id: number): Observable<Customer> {

  //  this.Log(`GetCustomerById...`);
  //  return of(this.customers[0]);
  //}

  AddCustomer(customer: Customer): Observable<any> {

    this.Log(`Adding Customer, Please Wait...`);
    const url = this.customerBaseUrl +"/AddCustomer";
    return this.http.post(url, customer, this.httpOptions);
  }


  UpdateCustomer(cust: Customer): Observable<any> {

    //this.Log(JSON.stringify(cust));

    this.Log(`Updating Customer, Please Wait...`);
    const url = this.customerBaseUrl + `/EditCustomer?id=` + cust.id;
    return this.http.put(url, cust, this.httpOptions);


    //return this.http.put(url, cust, this.httpOptions).pipe(
    //  tap(_ => this.Log('EditCustomer done')),
    //  catchError(this.HandleHttpError('UpdateCustomer'))
    //);

  }


  Log(message: string) {
    this.messageService.Add(message);
  }

  HandleHttpError<T>(op = 'op', result?: T) {
    return (error: any): Observable<T> => {

      console.error("HandleHttpError: " + JSON.stringify(error));
      this.Log(`Failed ${op} - Error ${JSON.stringify(error)}`);
      //if (error.statusText != 200) {
      // 
      //}

      return of(result as T);
    };
  }

}
