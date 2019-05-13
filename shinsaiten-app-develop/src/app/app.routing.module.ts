import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './modules/home/user-home/user-home.component';
import { LoginComponent } from './core/login';
import { LoginUserComponent } from './modules/login/login-user/login-user.component';
import { AuthGuard } from './core/guards';
import { RoleGuard } from './core/guards';
import { RaterListComponent } from './modules/user-administration/rater-list/rater-list.component';
import { ErrorComponent } from './core/error/error.component';
import { NoAnswerComponent } from './modules/blank/blank.component';
import { RaterHeaderComponent } from './core/raterheader/raterheader.component';

const routes: Routes = [
    { path: '', component: UserHomeComponent, canActivate: [AuthGuard]},
	{ path: 'app-error', component: ErrorComponent },
	{ path: 'blank',  component: NoAnswerComponent},
	{ path: 'rater-header',  component: RaterHeaderComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' },
];


export const AppRoutingModule = RouterModule.forRoot(routes);
