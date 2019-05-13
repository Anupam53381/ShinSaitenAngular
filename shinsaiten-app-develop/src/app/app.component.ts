import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './core/guards';

@Component( {
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['./app-error.component.css']

} )

export class AppComponent implements OnInit {
    title = 'Shin Saiten';
    defaultLanguage: string = 'ja';
    showDefaultHeader: boolean = true;
    constructor( private auth: AuthGuard, private router: Router, private translate: TranslateService ) {
        this.setDefaultLanguage();
    }
    ngOnInit() {
        console.log('AppComponent ngOnInit');
		if(!this.auth.getUserId()){
			this.router.navigate(['login/login-user']);
		}
    }
    public setDefaultLanguage() {
        if ( this.translate.getBrowserLang() == 'en' ) {
            this.translate.setDefaultLang( this.translate.getBrowserLang() );
            return;
        }
        this.translate.setDefaultLang( this.defaultLanguage );
    }

   


}
