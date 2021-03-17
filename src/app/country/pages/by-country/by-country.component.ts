import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
    selector: 'app-by-country',
    templateUrl: './by-country.component.html',
    styles: [`
        li {
            cursor: pointer;
        }
    `
    ]
})
export class ByCountryComponent implements OnInit {

    term: string = '';
    errorFound: boolean = false;
    showSuggestions: boolean = false;
    countries: Country[] = [];
    suggestedCountries: Country[] = [];

    constructor(private countryService: CountryService) { }

    ngOnInit(): void { }

    search(term: string) {
        this.errorFound = false;
        this.term = term;
        this.showSuggestions = false;

        this.countryService.searchCountryByName(term)
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
        this.showSuggestions = true;
        this.term = term;

        this.countryService.searchCountryByName(term)
            .subscribe(
                (countries) => this.suggestedCountries = countries.splice(0, 3),
                (err) => this.suggestedCountries = []
            );
    }

    findSuggested(term: string) {
        this.search(term);
    }

}
