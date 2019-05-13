import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { Rater } from '../models/rater.model';
import { RaterRegisterService } from '../services/rater-register.service';
import { ActivatedRoute } from '@angular/router';

@Component( {
    selector: 'app-rater-register',
    templateUrl: './rater-register.component.html',
    styleUrls: ['./rater-register.component.css']
} )
export class RaterRegisterComponent implements OnInit {

    rater: Rater = new Rater();
    errorMessage: string = null;
    successMsgFlag: boolean;
    emailExist: boolean;
    buttonName: string;
    testBrandId: string;
    testBrandName: string;

    constructor(private route: ActivatedRoute, private router: Router, private raterService: RaterRegisterService ) {

    }

    createRater( raterform: any ): void {

        this.rater.testBrandId = this.testBrandId;
        this.buttonName = document.activeElement.getAttribute( 'name' );

        this.raterService.validateEmail( this.rater )
            .subscribe( data1 => {
                this.errorMessage = null;
                this.emailExist = false;
                this.successMsgFlag = null;

                if ( data1 ) {
                    this.emailExist = true;

                } else {
                    this.raterService.createRater( this.rater )
                        .subscribe( data => {
                            if ( data.mailAddress != null ) {
                                this.successMsgFlag = true;
                            } else {
                                this.successMsgFlag = false;
                            }
                            if ( this.successMsgFlag != null ) {
                                if ( this.buttonName === 'register' ) {
                                    this.loadRaterList( this.successMsgFlag );
                                } else {
                                    raterform.resetForm();
                                    this.loadRaterRegister( this.successMsgFlag, this.testBrandName, this.testBrandId );
                                }
                            }
                        }
                        );
                }

            }
            );
    }

    ngOnInit() {

        this.rater.isActive = 'T';

        this.route
        .queryParams
        .subscribe(params => {
          // Defaults to null if no query param provided.
          this.successMsgFlag = params['successMsgFlag'] || false;
          this.testBrandId = params['testBrandId'];
          this.testBrandName = params['testBrandName'];
        });
    }

    onActiveSelectionChange( entry ): void {
        this.rater.isActive = entry;
    }

    loadRaterRegister( successMsgFlag: boolean, testBrandName: string, testBrandId: string ): void {

        this.router.navigate( ['/user-administration/rater-register'], { queryParams: { successMsgFlag: successMsgFlag,
            testBrandName: testBrandName, testBrandId: testBrandId } } );
    }

    loadRaterList( successMsgFlag: boolean ): void {
        this.router.navigate( ['user-administration/raterList/' + this.testBrandId + '/' + this.testBrandName], { queryParams: { successMsgFlag: successMsgFlag } } );
    }

}
