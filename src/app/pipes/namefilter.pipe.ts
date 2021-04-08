import { Pipe, PipeTransform } from '@angular/core';
import { Iemployee } from '../services/data.service';

@Pipe({
  name: 'namefilter',
})
export class NamefilterPipe implements PipeTransform {
  transform(employeeList: Iemployee[], filterValue: string): Iemployee[] {
    if (filterValue.trim()) {
      return employeeList.filter((employee) => {
        return employee.name.toLowerCase().includes(filterValue.trim());
      });
    } else {
      return employeeList;
    }
  }
}
