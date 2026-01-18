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
import { MatChipsModule } from '@angular/material/chips';
import { environment } from 'environments/environment.development';
import { EmployeesService } from '../allCitoyens/employees.service';
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog';
import { DocumentFormDialogueComponent } from '../dialogue/form-dialogue/form-dialogue.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
  id:any
  defaultPhoto = 'assets/images/bf.png'; // ton image par défaut
  photoBase:string=environment.apiUrl+"documents/photo/"
  constructor(private route: ActivatedRoute,    
    public employeesService: EmployeesService,
     public dialog: MatDialog,
     private snackBar: MatSnackBar
  ) {}

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  

  if (id) {
    this.id=id
    // mode édition

    this.loadCitoyen(+id)
    this.loadDocument(+id);
    console.log('ID reçu :', id);
  } else {
    // mode ajout
  }
}

onAddDocument() {
  this.openDialog("add",this.id)
}

onEditDocument(doc: any) {
  // ex: ouvrir un dialog avec les données
  // this.dialog.open(EditDocumentDialogComponent, { data: doc });
}



 openDialog(action: 'add' | 'edit', data?: any) {
    let varDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      varDirection = 'rtl';
    } else {
      varDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DocumentFormDialogueComponent, {
      width: '60vw',
      maxWidth: '100vw',
      data: { employees: data, action },
      direction: varDirection,
      autoFocus: false,
    });

 

     dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Le modal a renvoyé une réponse (nouveau ou modifié)
     this.ngOnInit();
        this.showNotification(
          action === 'add' ? 'snackbar-success' : 'black',
          `${action === 'add' ? 'Ajout' : 'Modification'} effectué(e) avec succès !`,
          'bottom',
          'center'
        );
    }
  });
  }


    showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
onDeleteDocument(doc:any){

}

onAddPhoto(doc: any) {
  // ex: ouvrir dialog upload photo
  // this.dialog.open(UploadPhotoDialogComponent, { data: doc });
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
