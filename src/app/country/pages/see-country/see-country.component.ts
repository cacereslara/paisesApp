import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/country.interface';

@Component({
    selector: 'app-see-country',
    templateUrl: './see-country.component.html',
    styles: [
    ]
})
export class SeeCountryComponent implements OnInit {

    country!: Country;
    showJson: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private countryService: CountryService
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                switchMap(({ id }) => this.countryService.searchCountryByCode(id)),
                tap(console.log)
            )
            .subscribe((country) => this.country = country)
    }
}
