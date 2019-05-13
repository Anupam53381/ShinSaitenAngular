import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingProjectListComponent } from './rating-project-list/rating-project-list.component';

const routes: Routes = [
    { path: 'rating-project-management/rating-project-list/:testBrandId', component: RatingProjectListComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class RatingProjectManagementRoutingModule { }