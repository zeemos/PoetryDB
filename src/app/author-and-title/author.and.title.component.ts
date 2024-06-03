import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'author-and-title',
    templateUrl: 'author.and.title.component.html',
    styleUrls: ['author.and.title.component.css']
})
export class AuthorAndTitleComponent {

    form = this.fb.group({
        author: ['', Validators.required],
        title: ['', Validators.required]
    })

    constructor(private fb: FormBuilder) {

    }

    search() {
        
    }
}