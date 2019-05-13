import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { LoginUserComponent } from './login-user/login-user.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [LoginUserComponent],
  exports:[LoginUserComponent],
  providers:[UserService],
})
export class LoginModule { }
