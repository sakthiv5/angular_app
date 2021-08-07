import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../src/address-service.service';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {
  constructor(
    public addressservice:AddressService
    ) { }

  columnDefs = [
    {headerName: 'Selection', field: 'selection', cellRenderer: 'checkboxRenderer',checkboxSelection : true,resizable:true},
    {headerName: 'ID', field: 'id',resizable:true},
    {headerName: 'Address', field: 'address',resizable:true}
];

phoneNumber = {'phone':64223740205};

rowData : any;
tokenDetails : any;
formdata = new FormData();
  ngOnInit(): void {
    this.loadAddress(this.phoneNumber);
  }


loadAddress(phoneNumber) {
  return this.addressservice.getAddress(phoneNumber).subscribe((data: any) => {
    this.rowData = JSON. parse(data);
  })
}

// objectId = "7,8"

// deleteAddress(objectId) {
//   return this.addressservice.deleteAddress(objectId).subscribe((data: any) => {
//     this.rowData = "";
//   })
// }


}