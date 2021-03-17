import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Country } from '../interfaces/country.interface';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl: string = 'https://restcountries.eu/rest/v2';

    get httpParams() {
        return new HttpParams()
            .set('fields', 'name;capital;alpha2Code;flag;population');
    }

    constructor(private http: HttpClient) { }

    searchCountryByName(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.http.get<Country[]>(url, { params: this.httpParams });
    }

    searchCountryByCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.http.get<Country[]>(url, { params: this.httpParams });
    }

    searchCountryByCode(alphaCode: string): Observable<Country> {
        const url = `${this.apiUrl}/alpha/${alphaCode}`;
        return this.http.get<Country>(url);
    }

    searchCountryByRegion(region: string): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.http.get<Country[]>(url, { params: this.httpParams }).pipe(tap(console.log));
    }
}
