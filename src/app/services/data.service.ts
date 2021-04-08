import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface Iemployee {
  id: number;
  name: string;
  department: string;
  joining_date: string;
}
export interface Idepartment {
  departmentName: string;
  employeeCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // Private variable so that it cannot be changed outside the service
  private employeeData: Iemployee[] = [
    {
      id: 11,
      name: 'Ash',
      department: 'Finance',
      joining_date: '8/10/2016',
    },
    { id: 12, name: 'John', department: 'HR', joining_date: '18/1/2011' },
    {
      id: 13,
      name: 'Zuri',
      department: 'Operations',
      joining_date: '28/11/2019',
    },
    {
      id: 14,
      name: 'Vish',
      department: 'Development',
      joining_date: '7/7/2017',
    },
    {
      id: 15,
      name: 'Barry',
      department: 'Operations',
      joining_date: '19/8/2014',
    },
    { id: 16, name: 'Ady', department: 'Finance', joining_date: '5/10/2014' },
    {
      id: 17,
      name: 'Gare',
      department: 'Development',
      joining_date: '6/4/2014',
    },
    {
      id: 18,
      name: 'Hola',
      department: 'Development',
      joining_date: '8/12/2010',
    },
    { id: 19, name: 'Ola', department: 'HR', joining_date: '7/5/2011' },
    {
      id: 20,
      name: 'Kim',
      department: 'Finance',
      joining_date: '20/10/2010',
    },
  ];

  constructor() {}
  // Function to return employee list
  getEmployeeList(): Iemployee[] {
    return this.employeeData.slice();
  }
  // Sorting of list by name 0 : Asc 1:Desc
  sortByName(index: number): Iemployee[] {
    const sortedList = this.getEmployeeList().sort((a, b) => {
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    if (index === 0) {
      return sortedList;
    } else {
      return sortedList.reverse();
    }
  }
  // Sorting of list by Joining Date 0 : Asc 1:Desc
  sortByJDate(index: number): Iemployee[] {
    const sortedList = this.getEmployeeList().sort((a, b) => {
      if (
        moment(a.joining_date, 'DD/MM/YYYY').toDate() >
        moment(b.joining_date, 'DD/MM/YYYY').toDate()
      ) {
        return 1;
      } else {
        return -1;
      }
    });
    if (index === 0) {
      return sortedList;
    } else {
      return sortedList.reverse();
    }
  }
  // Function to return Employees with more than 2 years experience
  getEmployeeTwoYears(): Iemployee[] {
    const filteredList = this.getEmployeeList().filter((value) => {
      const jDate = moment(value.joining_date, 'DD/MM/YYYY');
      const tDate = moment();

      return tDate.diff(jDate, 'years') >= 2;
    });
    return filteredList;
  }
  // Function to get unique department list
  getDistinctDep(): Idepartment[] {
    const depList: Idepartment[] = [];
    this.getEmployeeList().forEach((employee) => {
      const index = depList.findIndex((department) => {
        return department.departmentName === employee.department;
      });
      if (index > -1) {
        depList[index].employeeCount = depList[index].employeeCount + 1;
      } else {
        depList.push({ departmentName: employee.department, employeeCount: 1 });
      }
    });
    return depList;
  }
  // Remove Development department employee permanently
  removeDevEmpP(): Iemployee[]  {
    const newList = this.getEmployeeList().filter((employee) => {
      return employee.department !== 'Development';
    });
    this.employeeData = newList;
    return this.getEmployeeList();
  }
  // Remove Development department employee Temporary
  removeDevEmpT(): Iemployee[]  {
    const newList = this.getEmployeeList().filter((employee) => {
      return employee.department !== 'Development';
    });

    return newList;
  }
}
