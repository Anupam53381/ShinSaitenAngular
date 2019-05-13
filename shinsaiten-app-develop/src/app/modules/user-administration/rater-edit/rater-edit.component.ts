import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RaterEditService } from '../services/rater-edit.service';
import { Rater } from '../models/rater.model';

@Component( {
    selector: 'app-rater-edit',
    templateUrl: './rater-edit.component.html',
    styleUrls: ['./rater-edit.component.css']
} )
export class RaterEditComponent implements OnInit {

    rater: Rater = new Rater();
    mailAddress: string;
    testBrandId: string;
    testBrandName: string;
    userId: string;
    updateMsgFlag: boolean;

    constructor( private route: ActivatedRoute, private router: Router, private raterEditService: RaterEditService ) { }

    ngOnInit() {
        this.testBrandId = this.route.snapshot.params['testBrandId'];
        this.userId = this.route.snapshot.params['userId'];
        this.mailAddress = this.route.snapshot.params['mailAddress'];

        this.loadRaterDetails( this.testBrandId, this.userId, this.mailAddress );

        this.route
            .queryParams
            .subscribe( params => {
                // Defaults to null if no query param provided.
                this.testBrandName = params['testBrandName'];
            } );
    }


    public loadRaterDetails( testBrandId: string, userId: string, mailAddress: string ) {

        this.raterEditService.loadRaterDetails( testBrandId, userId, mailAddress )
            .subscribe( data => {

                this.rater = data;
            } );
    }

    editRater( raterform: any ): void {

        this.rater.testBrandId = this.testBrandId;
        this.raterEditService.editRater( this.rater )
            .subscribe( data => {
                if ( data ) {
                    this.updateMsgFlag = true;
                } else {
                    this.updateMsgFlag = false;
                }
                this.loadRaterList( this.updateMsgFlag );
            }
            );

    }

    onActiveSelectionChange( entry ): void {
        this.rater.isActive = entry;
    }

    loadRaterList(updateMsgFlag: boolean ): void {

        this.router.navigate( ['user-administration/raterList/' + this.testBrandId + '/' + this.testBrandName], { queryParams: { updateMsgFlag: updateMsgFlag } } );
    }

}
