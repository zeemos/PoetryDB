import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Poem } from "../models/poem";
import { map, tap } from "rxjs/operators";
import { ErrorResponse } from "../models/error.response";

@Injectable()
export class PoetryService {

    // ------------------------------------------------------- Member Variables

    POETRY_API_BASE_URL: string = 'https://poetrydb.org/';

    // ----------------------------------------------------- Constructor / Init

    constructor(private http: HttpClient) {
    }

    // --------------------------------------------------------- Public Methods

    // search by author and optionally set the exact match flag
    searchByAuthor(author: string, exactMatch: boolean ): Observable<any> {
        let url:string = `${this.POETRY_API_BASE_URL}author/${author}${exactMatch ? ':abs' : ''}`;

        return this.http.get<Poem[]>(url, { observe: 'response' }).pipe(
            tap(resp => {
                console.log(resp);
            }),
            map(resp => {
                if (resp.status === 200) {
                    return resp.body;
                }
                throw new Error('Invalid response code');
            })
        );
    }

    // search by title and optionally set the exact match flag
    searchByTitle(title: string, exactMatch: boolean ): Observable<any> {
        let url:string = `${this.POETRY_API_BASE_URL}title/${title}${exactMatch ? ':abs' : ''}`;

        return this.http.get<Poem[]>(url, { observe: 'response' }).pipe(
            tap(resp => {
                console.log(resp);
            }),
            map(resp => {
                if (resp.status === 200) {
                    return resp.body;
                }
                throw new Error('Invalid response code');
            })
        );
    }

    // search by author and title
    searchByAuthorAndTitle(author: string, title: string): Observable<any> {
        let url:string = `${this.POETRY_API_BASE_URL}author,title/${author};${title}`;

        return this.http.get<Poem[]>(url, { observe: 'response' }).pipe(
            tap(resp => {
                console.log(resp);
            }),
            map(resp => {
                if (resp.status === 200) {
                    return resp.body;
                }
                throw new Error('Invalid response code');
            })
        );
    }
}