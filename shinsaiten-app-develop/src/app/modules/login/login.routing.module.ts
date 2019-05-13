import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
const routes: Routes = [
    { path: 'login/login-user', component: LoginUserComponent},    
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
export class LoginRoutingModule { }