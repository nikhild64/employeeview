import { Component, OnInit } from '@angular/core';
import {
  DataService,
  Idepartment,
  Iemployee,
} from 'src/app/services/data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeList: Iemployee[];
  searchInput = '';
  filterForSenEmp = false;
  showDepList = false;
  depList: Idepartment[] = [];
  // Injecting DataService
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.employeeList = this.dataService.getEmployeeList();
  }
  // sort by name depending upon Asc or Desc button with call to Data Service
  sortByName(index: number): void {
    this.employeeList = this.dataService.sortByName(index);
  }
  // sort by Joining Date depending upon Asc or Desc button with call to Data Service
  sortByJDate(index: number): void {
    this.employeeList = this.dataService.sortByJDate(index);
  }
  // List of Employees with joining date more than 2 years
  getEmployeeTwoYears(): void {
    if (this.filterForSenEmp) {
      this.employeeList = this.dataService.getEmployeeList();
      this.filterForSenEmp = false;
    } else {
      this.employeeList = this.dataService.getEmployeeTwoYears();
      this.filterForSenEmp = true;
    }
  }
  // To get Distinct department List with employee count
  getDeptList(): void {
    if (this.showDepList) {
      this.showDepList = false;
    } else {
      this.depList = this.dataService.getDistinctDep();
      this.showDepList = true;
    }
  }
  // Remove Employees with Development department Permanentaly
  removeDevEmpP(): void {
    this.employeeList = this.dataService.removeDevEmpP();
    if (this.showDepList) {
      this.depList = this.dataService.getDistinctDep();
    }
  }
  // Remove Employees with Development department Temporary from the view
  removeDevEmpT(): void {
    this.employeeList = this.dataService.removeDevEmpT();
  }
}
