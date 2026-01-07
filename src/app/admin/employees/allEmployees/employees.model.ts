import { formatDate } from '@angular/common';

export class Plateforme {
  id: string;
  userId: string;
  nom: string;
  url: string;
    callbackUrl: string;

  token: string;
  commissionAgregateur: string;
  userNomPrenom:string;
  userTelephone: string;
  userMail: string;
  totalMontantTransactions:number;
  totalMontantPayouts:number;
  totalMontantTransactionsTTC:number;
  totalMontantPayoutsTTC:number;
  

  
  // Nouvelles propriétés pour correspondre au form-dialog
  /*name: string; // Alias pour nom complet
  birthDate?: Date | string;
  role: string; // Alias pour titre
  mobile: string; // Alias pour telephone
  department: string; // Alias pour departement (en anglais)
  degree?: string;
  gender?: string;
  address?: string;
  joiningDate?: Date | string;
  salary?: number;
  lastPromotionDate?: Date | string;
  employeeStatus?: string;
  workLocation?: string;*/

  constructor(employees: Partial<Plateforme>) {
    this.id = employees.id || this.getRandomID().toString();
    this.token = employees.token || 'Actif';
    this.nom = employees.nom || '';
    this.commissionAgregateur = employees.commissionAgregateur || '';
    this.userId = employees.userId || '';
    this.userMail = employees.userMail || '';
    this.userNomPrenom = employees.userNomPrenom || '';
    this.userTelephone = employees.userTelephone || '';
    this.url = employees.url || '';
    this.callbackUrl = employees.callbackUrl || '';

     this.totalMontantPayouts = employees.totalMontantPayouts || 0;
      this.totalMontantPayoutsTTC = employees.totalMontantPayoutsTTC || 0;
       this.totalMontantTransactions = employees.totalMontantTransactions || 0;
        this.totalMontantTransactionsTTC = employees.totalMontantTransactionsTTC || 0;
    
    
    // Initialiser les nouvelles propriétés
  /*  this.name = employees.name || this.nomComplet;
    this.birthDate = employees.birthDate || '';
    this.role = employees.role || this.titre;
    this.mobile = employees.mobile || this.telephone;
    this.department = employees.department || this.departement;
    this.degree = employees.degree || '';
    this.gender = employees.gender || '';
    this.address = employees.address || '';
    this.joiningDate = employees.joiningDate || '';
    this.salary = employees.salary || 0;
    this.lastPromotionDate = employees.lastPromotionDate || '';
    this.employeeStatus = employees.employeeStatus || this.statut;
    this.workLocation = employees.workLocation || '';*/
  }

  // Getter pour obtenir le nom complet
  /*get nomComplet(): string {
    return `${this.prenom} ${this.nom}`.trim();
  }*/


  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}