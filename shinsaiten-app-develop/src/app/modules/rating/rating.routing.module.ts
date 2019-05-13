import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingComponent } from './rating/rating.component';

const routes: Routes = [
    { path: 'rating/rating/:testBrandId/:testBrandDisplayName', component: RatingComponent }
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
export class RatingRoutingModule { }