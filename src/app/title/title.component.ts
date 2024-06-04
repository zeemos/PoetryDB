import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PoetryService } from "../services/poetry.service";
import { Poem } from "../models/poem";
import { finalize } from "rxjs/operators";

@Component({
    selector: 'title-search',
    templateUrl: 'title.component.html',
    styleUrls: ['title.component.css']
})
export class TitleComponent {

    // ------------------------------------------------------- Member Variables

    poems: Poem[] = [];
    loading: boolean = false;
    error: boolean = false;
    errorMsg: string = '';

    form = this.fb.group({
        title: ['', Validators.required],
        exactMatch: [false]
    });

    // ----------------------------------------------------- Constructor / Init

    constructor(private fb: FormBuilder, private poetryService: PoetryService) {
    }

    // --------------------------------------------------------- Public Methods

    search() {
        // reset flags and data
        this.loading = true;
        this.error = false;
        this.errorMsg = '';
        this.poems = [];

        // call poem service passing in entered title
        const vals = this.form.value;
        this.poetryService.searchByTitle(vals.title as string, vals.exactMatch as boolean)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe(
            resp => {
                if (resp.status && resp.status !== 200) {
                    this.error = true;
                    this.errorMsg = resp.reason;
                } else {
                    this.poems = resp;
                }
            },
            () => {
                this.error = true;
                this.errorMsg = 'Invalid http response';
            }
        );
    }

    // -------------------------------------------------------- Private Methods
}