import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
    selector: 'app-by-capital',
    templateUrl: './by-capital.component.html',
    styles: [
    ]
})
export class ByCapitalComponent implements OnInit {

    term: string = '';
    errorFound: boolean = false;
    countries: Country[] = [];

    constructor(private countryService: CountryService) { }

    ngOnInit(): void { }

    search(term: string) {
        this.errorFound = false;
        this.term = term;

        this.countryService.searchCountryByCapital(term)
            .subscribe((countries) => {
                console.log(countries);
                this.countries = countries;
            }, (err) => {
                console.log(err);
                this.errorFound = true;
                this.countries = [];
            });
    }

    suggestions(term: string) {
        this.errorFound = false;
        // TODO: Crear sugerencias
    }

}
