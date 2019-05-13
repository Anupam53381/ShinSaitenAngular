import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './core/directives';
import { AuthGuard } from './core/guards';
import { JwtInterceptor, ErrorInterceptor } from './core/helpers';
import { AlertService, AuthenticationService, UserService } from './core/services';
import { HomeComponent } from './core/home';
import { LoginComponent } from './core/login';
import { ErrorComponent } from './core/error/error.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ServerErrorsInterceptor } from './core/interceptors/server-errors.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { ShinsaitenHTTPTokenInterceptor } from './core/interceptors/server-errors.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { RatingModule } from './modules/rating/rating.module';
import { UserAdministrationModule } from './modules/user-administration/user-administration.module';
import { HomeRoutingModule } from './modules/home/home.routing.module';
import { LoginRoutingModule } from './modules/login/login.routing.module';
import { RatingRoutingModule } from './modules/rating/rating.routing.module';
import { UserAdministrationRoutingModule } from './modules/user-administration/user-administration.routing';
import { RatingProjectManagementModule } from './modules/rating-project-management/rating-project-management.module';
import { RatingProjectManagementRoutingModule } from './modules/rating-project-management/rating-project-management.routing';
import { TestSetRoutingModule } from './modules/test-set/test-set.routing';
import { TestSetModule } from './modules/test-set/test-set.module';
import { HeaderComponent } from './core/header/header.component';
import { RaterHeaderComponent } from './core/raterheader/raterheader.component';
import { FooterComponent } from './core/footer/footer.component';
import { NoAnswerComponent }      from './modules/blank/blank.component';

export function HttpLoaderFactory( http: HttpClient ) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule( {
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        ErrorComponent,
        HeaderComponent,
        FooterComponent,
        RaterHeaderComponent,
		NoAnswerComponent
    ],
    imports: [
        /*Our App modules*/
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoginModule,
        HomeModule,
        RatingModule,
        UserAdministrationModule,
        RatingProjectManagementModule,
        TestSetModule,
        /*Routing modules*/
        AppRoutingModule,
        HomeRoutingModule,
        LoginRoutingModule,
        RatingRoutingModule,
        UserAdministrationRoutingModule,
        RatingProjectManagementRoutingModule,
        TestSetRoutingModule,
        /*Angular Provided Modules */
        BrowserModule,
        HttpClientModule,
        FormsModule,
        /*Module for Internatialization*/
        TranslateModule.forRoot( {
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        } )

    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, {
            provide: HTTP_INTERCEPTORS,
            useClass: ShinsaitenHTTPTokenInterceptor,
            multi: true,
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorsInterceptor,
            multi: true,
        }],
    bootstrap: [AppComponent]
} )
export class AppModule { }

