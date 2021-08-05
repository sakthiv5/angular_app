import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridComponent } from '../common/ag-grid/ag-grid.component';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AddressService {
  
  // Define API
  apiURL = 'http://192.168.178.99:5000';
  
  
  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'      
    }),
    'responseType': 'text'    
  };

  // HttpClient API get() method => Fetch employees list
  getAddress(phoneNumber) {
    return this.http.get(this.apiURL + '/getaddress?phone=' + phoneNumber, {'responseType': 'text'});
  
  }


  // getToken(param): Observable<any> {
  //   return this.http.post<any>(this.url + '/portal/sharing/rest/generateToken',param, this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }  

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}