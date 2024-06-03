import { RouterModule, Routes } from "@angular/router";
import { AuthorSearchComponent } from "./author/author-search.component";
import { NgModule } from "@angular/core";
import { AuthorAndTitleComponent } from "./author-and-title/author.and.title.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: AuthorAndTitleComponent
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