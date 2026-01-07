import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { EmployeesService } from '../../employees.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Plateforme } from '../../employees.model';
import { CommonModule, formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentService } from 'app/admin/departments/all-departments/department.service';
import { Department } from 'app/admin/departments/all-departments/department.model';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'app/admin/admin/all-admin/admin.service';
import { Admin } from 'app/admin/admin/all-admin/admin.model';

export interface DialogData {
  id: number;
  action: string;
  employees: Plateforme;
}

@Component({
    selector: 'app-all-employees-form',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogClose,
        CommonModule
    ]
})
export class AllEmployeesFormComponent {
  action: string;
  dialogTitle: string;
  employeesForm: UntypedFormGroup;
  employees: Plateforme;

  genres:any[]=[{"id":1,"libelle":"Femme"},{"id":2,"libelle":"Homme"}]

   statuts:any[]=[{"id":1,"libelle":"Actif"},{"id":0,"libelle":"Inactif"}]
  dataSource = new MatTableDataSource<Admin>([]);
  deptTrouve: Department | undefined;


  constructor(
    public dialogRef: MatDialogRef<AllEmployeesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public employeesService: EmployeesService,
       public departmentService: DepartmentService,
           public adminService: AdminService,
       
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults based on action type
    this.action = data.action;
    this.dialogTitle =
      this.action === 'edit'
        ? `Edit Plateforme: ${data.employees.nom}`
        : 'Nouvelle Plateforme';
    this.employees =
      this.action === 'edit' ? data.employees : new Plateforme({} as Plateforme);
    this.employeesForm = this.createEmployeeForm();
  }

   ngOnInit() {
   
    this.loadUsers();
  }

  // Create form group for employee details
  createEmployeeForm(): UntypedFormGroup {
   
    console.log("le departement id=======> ",this.dataSource.data)
    
    return this.fb.group({
      id: [this.employees.id],
      nom: [this.employees.nom],
      url: [this.employees.url, [Validators.required]],
      callbackUrl: [this.employees.callbackUrl, [Validators.required]],
      userId: [this.employees.userId, [Validators.required]],
     /* birthDate: [
        formatDate(this.employees.birthDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],*/
     // role: [this.employees.role, [Validators.required]],
      commissionAgregateur: [this.employees.commissionAgregateur, [Validators.required]],

     
      token: [this.employees.token|| '']
    
    });
  }


  loadUsers() {
      this.adminService.getAllUsers().subscribe({
        next: (data:any) => {
          this.dataSource.data = data.content;
         console.log("Les users===>",this.dataSource.data)

          //this.deptTrouve = this.dataSource.data.find(d => d.nom === this.employees.departement);

          //this.isLoading = false;
        
          this.dataSource.filterPredicate = (data: any, filter: string) =>
            Object.values(data).some((value:any) =>
              value.toString().toLowerCase().includes(filter)
            );
        },
        error: (err) => console.error(err),
      });
    }


 /* createEmployeeForm(): UntypedFormGroup {
  return this.fb.group({
    id: [this.employees.id],
    img: [this.employees.img],
    name: [this.employees.name || this.employees.nomComplet, [Validators.required]],
    email: [this.employees.email, [Validators.required, Validators.email]],
    birthDate: [
      this.employees.birthDate
        ? formatDate(this.employees.birthDate, 'yyyy-MM-dd', 'en')
        : '',
      [Validators.required],
    ],
    role: [this.employees.role || this.employees.titre, [Validators.required]],
    mobile: [this.employees.mobile || this.employees.telephone, [Validators.required]],
    department: [this.employees.department || this.employees.departement, [Validators.required]],
    degree: [this.employees.degree],
    gender: [this.employees.gender],
    address: [this.employees.address],
    joiningDate: [
      this.employees.joiningDate
        ? formatDate(this.employees.joiningDate, 'yyyy-MM-dd', 'en')
        : '',
    ],
    salary: [this.employees.salary, [Validators.required]],
    lastPromotionDate: [
      this.employees.lastPromotionDate
        ? formatDate(this.employees.lastPromotionDate, 'yyyy-MM-dd', 'en')
        : '',
    ],
    employeeStatus: [this.employees.employeeStatus || this.employees.statut],
    workLocation: [this.employees.workLocation],
  });
}*/


  // Dynamic error message retrieval
  getErrorMessage(controlName: string): string {
    const control = this.employeesForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    return ''; // Return empty if no errors
  }

  // Submit form data
  submit() {

    if (this.employeesForm.valid) {
      const employeeData = this.employeesForm.getRawValue();
      if (this.action === 'edit') {
        this.employeesService.updatePlateforme(employeeData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Update Error:', error);
            // Optionally show an error message to the user
          },
        });
      } else {
        this.employeesService.addPlateforme(employeeData).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Add Error:', error);
            // Optionally show an error message to the user
          },
        });
      }
    }
  }

  // Close dialog without action
  onNoClick(): void {
    this.dialogRef.close();
  }
}
