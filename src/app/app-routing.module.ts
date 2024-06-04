import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from "./author/author.component";
import { NgModule } from '@angular/core';
import { AuthorAndTitleComponent } from "./author-and-title/author.and.title.component";
import { TitleComponent } from './title/title.component';

const routes: Routes = [
    {
        path: '',
        component: AuthorAndTitleComponent
    },
    {
        path: 'author',
        component: AuthorComponent
    },
    {
        path: 'author-and-title',
        component: AuthorAndTitleComponent
    },
    {
        path: 'title',
        component: TitleComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{
}