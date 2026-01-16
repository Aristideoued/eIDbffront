import { Route } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { Page404Component } from '../../authentication/page404/page404.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeShiftComponent } from './employee-shift/employee-shift.component';
import { DocumentsComponent } from './documents/documents.component';
import { IdentityComponent } from './identity/identity.component';
import { AllemployeesComponent } from './allCitoyens/allemployees.component';
export const ADMIN_EMPLOYEE_ROUTE: Route[] = [
  {
    path: 'allCitoyens',
    component: AllemployeesComponent,
  },
  {
    path: 'add-employee',
    component: AddEmployeeComponent,
  },
  {
  path: 'documents/:id',
  component: DocumentsComponent
}

,
  {
    path: 'edit-employee',
    component: EditEmployeeComponent,
  },
  {
    path: 'employee-shift',
    component: EmployeeShiftComponent,
  },
  {
    path: 'employee-profile',
    component: EmployeeProfileComponent,
  },
  { path: '**', component: Page404Component },
];
