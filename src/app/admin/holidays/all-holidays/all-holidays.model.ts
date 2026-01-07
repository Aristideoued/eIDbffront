import { formatDate } from '@angular/common';

export class AllHoliday {
  id: number;
  service: string;
  hebergeur: string;
  description: string;
  dateExpiration: string;
  forfait: string;
  devise: string;
  montant: string;
  statut!:string
  nbjour:string


  constructor(holiday: Partial<AllHoliday>) {
    this.id = holiday.id || this.getRandomID();
    this.service = holiday.service || '';
    this.hebergeur = holiday.hebergeur || '';
    this.description = holiday.description || '';
    this.dateExpiration = holiday.dateExpiration || formatDate(new Date(), 'dd-MM-yyyy', 'fr');
    this.forfait = holiday.forfait || '';
    this.devise = holiday.devise || '';
    this.montant = holiday.montant || '';
    this.statut=holiday.statut||''
    this.nbjour=holiday.nbjour||''
   
  }

  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
