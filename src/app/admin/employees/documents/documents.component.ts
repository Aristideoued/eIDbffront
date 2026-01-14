import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../allEmployees/employees.service';
import { MatChipsModule } from '@angular/material/chips';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-documents',
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatDividerModule,
        MatCardModule,
        MatChipsModule,
        CommonModule
    ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {


  documents :any=[];
  nomComplet:string=''
  defaultPhoto = 'assets/images/bf.png'; // ton image par défaut
  photoBase:string=environment.apiUrl+"documents/photo/"
  constructor(private route: ActivatedRoute,    
    public employeesService: EmployeesService,
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  

  if (id) {
    // mode édition

    this.loadCitoyen(+id)
    this.loadDocument(+id);
    console.log('ID reçu :', id);
  } else {
    // mode ajout
  }
}
onImageError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = this.defaultPhoto;
}

loadDocument(id:number){
   this.employeesService.getCitoyenDocument(id).subscribe({
        next: (data:any) => {
          
          console.log(data)
          this.documents=data
        },
        error: (err) => console.error(err),
      });
}

loadCitoyen(id:number){
   this.employeesService.getCitoyenById(id).subscribe({
        next: (data:any) => {
          
          //console.log(data)
          this.nomComplet=data['nom']+" "+data['prenom']
          
        },
        error: (err) => console.error(err),
      });
}

}
