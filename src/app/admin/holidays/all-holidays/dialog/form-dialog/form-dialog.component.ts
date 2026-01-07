import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HolidayService } from '../../all-holidays.service';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AllHoliday } from '../../all-holidays.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import moment from 'moment';

registerLocaleData(localeFr);

export interface DialogData {
  id: number;
  action: string;
  allHoliday: AllHoliday;
}

@Component({
    selector: 'app-all-holidays-form',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatDialogClose,
    ]
})
export class AllHolidaysFormComponent {
  action: string;
  dialogTitle: string;
  holidayForm: UntypedFormGroup;
  allHoliday: AllHoliday;

  constructor(
    public dialogRef: MatDialogRef<AllHolidaysFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public holidayService: HolidayService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    this.allHoliday =
      this.action === 'edit'
        ? data.allHoliday
        : new AllHoliday({} as AllHoliday);
    this.dialogTitle =
      this.action === 'edit' ? this.allHoliday.service : 'Nouveau domaine';
    this.holidayForm = this.createHolidayForm();
  }

  private createHolidayForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.allHoliday.id],
      hebergeur: [this.allHoliday.hebergeur, [Validators.required]],
      dateExpiration: [this.allHoliday.dateExpiration, [Validators.required]],
      service: [this.allHoliday.service,[Validators.required]],
      forfait: [this.allHoliday.forfait,[Validators.required]],
      description: [this.allHoliday.description],

      montant: [this.allHoliday.montant,[Validators.required]],

      devise: [this.allHoliday.devise,[Validators.required]]
     
    
    });
  }
ngOnInit(){
    if(this.action==='edit'){
    //  const parts = this.employeeSalaryForm.get('datemonitoring')?.value.split('/');
  const parts=this.data.allHoliday.dateExpiration.split('/')

        const formattedDate = new Date(+parts[2], +parts[1] - 1, +parts[0]);

        console.log("formated date==> ",formattedDate)
         console.log("date==> ",this.data.allHoliday.dateExpiration)


        //this.employeeSalaryForm.get('dateMonitoring')?.value=formattedDate
        
       /* patchValue({
          dateMonitoring: 
        });*/

          this.holidayForm.patchValue({
            dateExpiration: formattedDate
          });

    }

}
  getErrorMessage(controlName: string): string {
    const control = this.holidayForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Required field';
    }
    return '';
  }

  submit(): void {
    if (this.holidayForm.valid) {
      const holidayData = this.holidayForm.getRawValue();

          let dateFin=''
            
               
      
          if (moment.isMoment(holidayData.dateMonitoring)) {
            dateFin = holidayData.dateExpiration.format('DD/MM/YYYY');
          } else if (holidayData.dateExpiration instanceof Date) {
            dateFin = moment(holidayData.dateExpiration).format('DD/MM/YYYY');
          } else if (typeof holidayData.dateExpiration === 'string') {
            dateFin = moment(new Date(holidayData.dateExpiration)).format('DD/MM/YYYY');
          }
          else{
           dateFin= holidayData.dateExpiration.format('DD/MM/YYYY')
          }
      
      console.log("Le domaine==> ",holidayData,dateFin)
      
      if (this.action === 'edit') {
        this.holidayService.updateDomaine(holidayData,dateFin).subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Update Error:', error);
           
          },
        });
      } else {
        this.holidayService.addDomaine(holidayData,dateFin).subscribe({
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
