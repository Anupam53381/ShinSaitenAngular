import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaterListComponent } from './rater-list/rater-list.component';
import { RaterRegisterComponent } from './rater-register/rater-register.component';
import { RaterEditComponent } from './rater-edit/rater-edit.component';

const routes: Routes = [
    
    { path: 'user-administration/raterList/:testBrandId/:testBrandName',component:RaterListComponent},
    { path: 'user-administration/rater-register', component: RaterRegisterComponent },
    { path: 'user-administration/raterEdit/:testBrandId/:userId/:mailAddress', component: RaterEditComponent } 
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
export class UserAdministrationRoutingModule { }