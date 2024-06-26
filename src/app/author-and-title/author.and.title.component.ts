import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoetryService } from "../services/poetry.service";
import { Poem } from "../models/poem";
import { finalize } from "rxjs/operators";

@Component({
    selector: 'author-and-title',
    templateUrl: 'author.and.title.component.html',
    styleUrls: ['author.and.title.component.css']
})
export class AuthorAndTitleComponent {

    // ------------------------------------------------------- Member Variables

    poems: Poem[] = [];
    loading: boolean = false;
    error: boolean = false;
    errorMsg: string = '';

    form = this.fb.group({
        author: ['', Validators.required],
        title: ['', Validators.required]
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

        // call poem service passing in entered author and title
        const vals = this.form.value;
        this.poetryService.searchByAuthorAndTitle(vals.author as string, vals.title as string)
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