import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';

const routes: Routes = [
     { path: 'home/user-home', component: UserHomeComponent }
];

@NgModule( {
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ],
    declarations: []
} )

export class HomeRoutingModule { }