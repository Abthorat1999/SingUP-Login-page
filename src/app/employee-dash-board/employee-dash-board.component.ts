import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { EmployeeModal } from './employee-dash-board-modal';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.scss']
})
export class EmployeeDashBoardComponent implements OnInit{
  
  formValue!:FormGroup;
  employeeData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  employeeModalObj:EmployeeModal = new EmployeeModal()
  constructor(private formbuilder:FormBuilder, private api:ApiService){}
  
  ngOnInit(): void {
   this.formValue=this.formbuilder.group({
    firstName:[''],
    lastName:[''],
    emailId:[''],
    mobileNo:[''],
    salary:[''],
    id:[''],
   })
   this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModalObj.firstName=this.formValue.value.firstName;
    this.employeeModalObj.lastName=this.formValue.value.lastName;
    this.employeeModalObj.id=this.formValue.value.id;
    this.employeeModalObj.emailId=this.formValue.value.emailId;
    this.employeeModalObj.mobileNo=this.formValue.value.mobileNo;
    this.employeeModalObj.salary=this.formValue.value.salary;

    this.api.postEmployee(this.employeeModalObj)
    .subscribe((res)=>{
      console.log(res);
      alert("employee Added SuccessFully..!!!");
      let ref = document.getElementById('cancel');
      ref?.click(); 
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
  clickAddEmployee(){
    this.formValue.reset()
    this.showAdd=true;
    this.showUpdate=false;
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe({
      next:(res)=>{
        alert("Product Deleted SuccessFully..");
        this.getAllEmployee();
      },
      error:()=>{
        alert("Error While Deleting Product");
      }
    })
  }

  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.employeeModalObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['mobileNo'].setValue(row.mobileNo);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModalObj.firstName=this.formValue.value.firstName;
    this.employeeModalObj.lastName=this.formValue.value.lastName;
    this.employeeModalObj.id=this.formValue.value.id;
    this.employeeModalObj.emailId=this.formValue.value.emailId;
    this.employeeModalObj.mobileNo=this.formValue.value.mobileNo;
    this.employeeModalObj.salary=this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModalObj,this.employeeModalObj.id)
    .subscribe(res=>{
      alert('Updated SuccessFully...');
      let ref = document.getElementById('cancel');
      ref?.click(); 
      this.formValue.reset();
      this.getAllEmployee();
    })
  }
}
