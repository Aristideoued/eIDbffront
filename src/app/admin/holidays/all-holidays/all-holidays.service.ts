import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { AllHoliday } from './all-holidays.model';
import { environment } from 'environments/environment.development';
import { AuthService } from '@core/service/auth.service';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private readonly API_URL = 'assets/data/holidays.json';
  private dataChange: BehaviorSubject<AllHoliday[]> = new BehaviorSubject<
    AllHoliday[]
  >([]);
  token: string;

  constructor(private httpClient: HttpClient,private authService: AuthService) {
            this.token='Basic ' + window.btoa(environment.username + ":" + environment.password);
    
  }

  get data(): AllHoliday[] {
    return this.dataChange.value;
  }

  /** GET: Fetch all holidays */
  getAllHolidays(): Observable<AllHoliday[]> {
    return this.httpClient.get<AllHoliday[]>(this.API_URL).pipe(
      map((holidays) => {
        this.dataChange.next(holidays); // Update the data change observable
        return holidays;
      }),
      catchError(this.handleError)
    );
  }

  /** POST: Add a new holiday */
  addHoliday(holiday: AllHoliday): Observable<AllHoliday> {
    return this.httpClient.post<AllHoliday>(this.API_URL, holiday).pipe(
      map(() => {
        return holiday; // Return the newly added holiday
      }),
      catchError(this.handleError)
    );
  }

  /** PUT: Update an existing holiday */
  updateHoliday(holiday: AllHoliday): Observable<AllHoliday> {
    return this.httpClient.put<AllHoliday>(`${this.API_URL}`, holiday).pipe(
      map(() => {
        return holiday; // Return the updated holiday
      }),
      catchError(this.handleError)
    );
  }

  /** DELETE: Remove a holiday by ID */
  deleteHoliday(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
      map(() => {
        return id; // Return the ID of the deleted holiday
      }),
      catchError(this.handleError)
    );
  }



       updateDomaine(abonnement: AllHoliday,dateExpiration:any): Observable<AllHoliday> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      const userData = {
        id:abonnement.id,
        formule:abonnement.hebergeur,
        service:abonnement.service,
        forfait:abonnement.forfait,
        devise: abonnement.devise,
        montant: abonnement.montant,
        description: abonnement.description,
        dateExpiration: dateExpiration
       
      };

      console.log("Le user envoyé============> ",userData)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "update/abonnement",JSON.stringify(userData) , { headers })
        .pipe(
          map((response) => new AllHoliday({
            id: response.id || abonnement.id
           
          })),
          catchError(this.handleError)
        );
    }

 getAllTransaction(): Observable<Transaction[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<Transaction[]>(environment.apiUrl + "transaction/liste", { headers });
  }

   getAllTransactionByPlateforme(idPlateforme:string): Observable<Transaction[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<Transaction[]>(environment.apiUrl + "transaction/by-plateforme/"+idPlateforme, { headers });
  }
    addDomaine(abonnement: AllHoliday,dateExpiration:any): Observable<AllHoliday> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      const userData = {
        formule:abonnement.hebergeur,
        service:abonnement.service,
        forfait:abonnement.forfait,
        devise: abonnement.devise,
        montant: abonnement.montant,
        description: abonnement.description,
        dateExpiration: dateExpiration
      
       
      };

      console.log("Le domaine envoyé============> ",userData)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "addAbonnement",JSON.stringify(userData) , { headers })
        .pipe(
          map((response) => new AllHoliday({
            id: response.id || abonnement.id,
           
          })),
          catchError(this.handleError)
        );
    }


       deleteDomaine(id: number): Observable<AllHoliday> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      });
  
      const userData = {
        id:id,
      
       
      };

      console.log("Le user envoyé============> ",userData)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "delete/abonnement",JSON.stringify(userData) , { headers })
        .pipe(
          map((response) => new AllHoliday({
            id: response.id || id
           
           
           // role: response.role || admin.role,
          
          })),
          catchError(this.handleError)
        );
    }

  /** Handle Http operation that failed */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
