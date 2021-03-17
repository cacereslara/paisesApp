import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-country-input',
    templateUrl: './country-input.component.html',
    styles: [
    ]
})
export class CountryInputComponent implements OnInit {

    @Input() placeholder: string = '';
    @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();
    @Output() onDebounce: EventEmitter<string> = new EventEmitter<string>();

    debouncer: Subject<string> = new Subject<string>();

    term: string = '';

    constructor() { }

    ngOnInit(): void {
        this.debouncer
            .pipe(debounceTime(300))
            .subscribe(value => {
                this.onDebounce.emit(value);
            })
    }

    onKeyPress() {
        this.debouncer.next(this.term);
    }

    search() {
        this.onEnter.emit(this.term);
    }
}
