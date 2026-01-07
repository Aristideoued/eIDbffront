import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
  ,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { DepartmentService } from 'app/admin/departments/all-departments/department.service';
import { Department } from 'app/admin/departments/all-departments/department.model';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeesService } from '../allEmployees/employees.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-add-employee',
    templateUrl: './add-employee.component.html',
    styleUrls: ['./add-employee.component.scss'],
    imports: [
        BreadcrumbComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        FileUploadComponent,
        MatButtonModule,
        CommonModule
    ]
})
export class AddEmployeeComponent {
  docForm!: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
   dataSource = new MatTableDataSource<Department>([]);
  constructor(private fb: UntypedFormBuilder,
      public departmentService: DepartmentService,
       public employeService: EmployeesService,  private router: Router) {

  }
passwordsMatchValidator(group: UntypedFormGroup) {
  const password = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return password === confirm ? null : { mismatch: true };
}

  initForm(){

    
    this.docForm = this.fb.group({
      id: [''], // Peut être généré automatiquement côté serveur
     // statut: ['', [Validators.required]], // Statut de l'employé (actif, inactif, etc.)
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]], // Nom de famille
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]], // Prénom
      titre: ['',[Validators.required]], // Titre/Désignation de l'employé
     telephone: [
  '',
  [
    Validators.required,
    Validators.pattern('[0-9]+'),
    Validators.minLength(8),
    Validators.maxLength(8)
  ]
], // Numéro de téléphone
      email: [
        '',
        [Validators.required, Validators.email],
      ],
       password: [
        '',
        [Validators.required, Validators.minLength(12)],
      ],
       confirm: [
        '',
        [Validators.required, Validators.minLength(12)],
      ],
      departement: ['', [Validators.required]], // Département
    },{ validator: this.passwordsMatchValidator });

  }
  
  ngOnInit() {
    this.initForm()
    this.loadDepartement();
  }
    loadDepartement() {
      this.departmentService.getAllDepartments().subscribe({
        next: (data:any) => {
          this.dataSource.data = data.contenu;
          console.log("Les departements===>",this.dataSource.data)
          //this.isLoading = false;
        
          this.dataSource.filterPredicate = (data: Department, filter: string) =>
            Object.values(data).some((value) =>
              value.toString().toLowerCase().includes(filter)
            );
        },
        error: (err) => console.error(err),
      });
    }
  
  onSubmit() {
   /* if (this.docForm.valid) {
      console.log('Form Value', this.docForm.value);
      const employeeData=this.docForm.value

         this.employeService.addEmployee(employeeData).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/employee/dashboard']);

          },
          error: (error) => {
            console.error('Erreur d\'ajout:', error);
            // Optionnellement afficher un message d'erreur à l'utilisateur
          },
        });
      // Ici vous pouvez ajouter la logique pour envoyer les données au serveur
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }*/
  }
  
  // Méthode utilitaire pour marquer tous les champs comme touchés (pour afficher les erreurs)
  private markFormGroupTouched() {
    Object.keys(this.docForm.controls).forEach(key => {
      const control = this.docForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}