import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

// import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { RatingBasis } from '../models/rating-basis.model';
import { RatingRegistrationInfo } from '../models/rating-registration-info.model';
import { TestSetManual } from '../models/test-set-manual.model';
import { RatingInstructionsManual } from '../models/rating-instructions-manual.model';
import { RatingUnit } from '../models/rating-unit.model';
import { TestSetItemAnswer } from '../models/testset-item-answer.model';
import { RatingService } from '../services/rating.service';
import { User } from '../../login/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { validateCheckpoints } from '../rating-validation';
import { environment } from '../../../../environments/environment';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { AppComponent } from '../../../app.component';
import * as WaveSurfer from 'wavesurfer.js';

@Component( {
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
} )

export class RatingComponent implements OnInit {
    wavesurfer;
    isPlaying = false;
    isSubmitted: boolean = false;
    disable : boolean=false;
    ratingUnitUnAttemptedStatus: Map<string, boolean>;
    ratingUnitValidationStatus: Map<string, boolean>;
    ratingUnits: Array<RatingUnit> = [];

    currentRatingUnitContext = new Array<RatingBasis>();
    currentRatingUnitItemAnswers = new Array<TestSetItemAnswer>();

    currentRatingInstructionsFileURL: any;
    currentTestPaperFileURL: any;
    currentTestSetItemAnswerFileURL: any;

    ratingUnitContextSelectionMap: Map<string, string>;

    testSetManualFileURL: string;
    testBrandId = '';

    ratingInstructionsManualRatingUnitWise: Map<string, RatingInstructionsManual>;
    ratingUnitContextRatingUnitWise: Map<string, Array<RatingBasis>>;
    testSetItemAnswersRatingUnitWise: Map<string, Array<TestSetItemAnswer>>;

    /*Rating registration*/
    ratingRegistrationData: Map<string, Array<RatingRegistrationInfo>>;

    constructor( private appComponent: AppComponent, private route: ActivatedRoute, private ratingService: RatingService, private fb: FormBuilder, private router: Router, private sanitizer: DomSanitizer ) {
		this.testBrandId = this.route.snapshot.params['testBrandId'];
        this.appComponent.showDefaultHeader = false;
        //first call to check whether rating assignment block availability
		
		this.ratingService.isRatingAssignmentBlockExist(this.testBrandId).subscribe(data => {
			if(data == true){
				//second call to get rating units info
				this.getRatingUnits();
                this.getTestSetManual();
			}else{
				//redirect to show no answers available page.
				console.log("no answer available");
				// redirect to home
				this.router.navigate(['blank']);
			}
		});
    }

    ngOnInit() {
        this.ratingUnitContextSelectionMap = new Map<string, string>();
        this.ratingUnitContextRatingUnitWise = new Map<string, Array<RatingBasis>>();
        this.testSetItemAnswersRatingUnitWise = new Map<string, Array<TestSetItemAnswer>>();
        this.ratingInstructionsManualRatingUnitWise = new Map<string, RatingInstructionsManual>();

        this.ratingUnitValidationStatus = new Map<string, boolean>();

        /*Rating registration param initialization on each init of the rating screen*/
        this.ratingRegistrationData = new Map<string, Array<RatingRegistrationInfo>>();
    }

	getRatingUnits(){
        this.ratingUnits = [];
        this.ratingUnitUnAttemptedStatus = new Map<string, boolean>();
        this.ratingService.getRatingUnits().subscribe(data => {
            this.ratingUnits = data;
            data.forEach(ratingUnit => {
                this.ratingUnitValidationStatus.set(ratingUnit.ratingUnitId, false);
                this.ratingUnitUnAttemptedStatus.set(ratingUnit.ratingUnitId, false);
            });

            this.selectTab(this.ratingUnits[0]);
        });

        return this.ratingUnits;
	}

    activateClass(unit){
        unit.active = !unit.active;    
    }

    enableDisableRadioButton(e, ratingUnitId: string){
        this.ratingUnitUnAttemptedStatus.set(ratingUnitId, (e.target.checked)?true:false);
        //this.ratingUnitValidationStatus.set(ratingUnitId, (e.target.checked)?true:false);
        this.disable=(e.target.checked)?true:false;
    }

    makeUnAttemptedSelection(e, ratingUnitId: string){
        this.disable = this.ratingUnitUnAttemptedStatus.get(ratingUnitId);
    }

    selectTab(tab: RatingUnit) {
        // deactivate all tabs
        this.ratingUnits.forEach(tab => (tab.active = false));

        // activate the tab the user has clicked on.
        tab.active = true;

        this.getRatingBasis(tab.ratingUnitId);

        this.getTestSetItemAnswersForRatingUnit(tab.ratingUnitId);

        this.makeUnAttemptedSelection(event, tab.ratingUnitId);

        this.loadWaveForm(tab.ratingUnitId);
    }

    loadWaveForm(ratingUnitId: string){

        this.isPlaying = false;

        if(this.wavesurfer) {
            this.wavesurfer.destroy();
        }

        requestAnimationFrame(() => {

            this.wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'black',
                width: '100%',
                progressColor: 'purple'
            });
            this.wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
        });

        //document.getElementById('audioIcon').className = 'far fa-play-circle';
    }

	getRatingBasis(ratingUnitId: string){
        if(!this.ratingUnitContextRatingUnitWise.get(ratingUnitId)) {
            this.ratingService.getRatingBasis(ratingUnitId).subscribe(data => {
                this.ratingUnitContextRatingUnitWise.set(ratingUnitId, data);
                this.currentRatingUnitContext = data;
            });
        }else{
            this.currentRatingUnitContext = this.ratingUnitContextRatingUnitWise.get(ratingUnitId);
        }
	}

    getTestSetManual(){
        this.ratingService.getTestSetManual().subscribe(data => {
            this.currentTestPaperFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(environment.fileServerUrl + "/" + data.testSetFilePath + "/" + data.testSetFileName + "?#zoom=100");
        });
    }

    getRatingInstructionsManual(ratingUnitId: string){

        if(!this.ratingInstructionsManualRatingUnitWise.get(ratingUnitId)){
            this.ratingService.getRatingInstructionsManual(ratingUnitId).subscribe(data => {
                this.currentRatingInstructionsFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(environment.fileServerUrl + "/" + data.ratingInstructionsFilePath + "/" + data.ratingInstructionsFileName + "?#zoom=100");
                this.ratingInstructionsManualRatingUnitWise.set(ratingUnitId, data);
            });
        }else{
            let currentRatingInstructionsManual = this.ratingInstructionsManualRatingUnitWise.get(ratingUnitId);

            this.currentRatingInstructionsFileURL = this.sanitizer.bypassSecurityTrustResourceUrl(environment.fileServerUrl + "/" + currentRatingInstructionsManual.ratingInstructionsFilePath + "/" + currentRatingInstructionsManual.ratingInstructionsFileName + "?#zoom=100");
        }
    }

    getTestSetItemAnswersForRatingUnit(ratingUnitId: string){
        if(!this.testSetItemAnswersRatingUnitWise.get(ratingUnitId)) {
            this.ratingService.getTestSetItemAnswersForUnit(ratingUnitId).subscribe(data => {
                this.currentTestSetItemAnswerFileURL = environment.fileServerUrl;
                this.testSetItemAnswersRatingUnitWise.set(ratingUnitId, data);
                this.currentRatingUnitItemAnswers = data;
            });
        }else{
            this.currentRatingUnitItemAnswers = this.testSetItemAnswersRatingUnitWise.get(ratingUnitId);
        }
    }

    validateRating(){
        this.isSubmitted = true;
        let validRatingUnits = true;
        this.ratingUnitContextRatingUnitWise.forEach((value: Array<RatingBasis>, key: string) => {
            let isValidRatingUnit = true;
            value.forEach(ratingBasis => {
                if(!this.ratingUnitContextSelectionMap.get(key + ":" + ratingBasis.contextId)){
                    isValidRatingUnit = false;
                    validRatingUnits = false;
                    this.ratingUnitValidationStatus.set(key, false);
                }
            })

            if(isValidRatingUnit){
                this.ratingUnitValidationStatus.set(key, true);
            }else{
                this.ratingUnitValidationStatus.set(key, this.ratingUnitUnAttemptedStatus.get(key));
            }
        });

        if(validRatingUnits){

            this.ratingRegistrationData = new Map<string, Array<RatingRegistrationInfo>>();

            // Prepare model for rating registration selections given by rater
            this.ratingUnitContextSelectionMap.forEach((value: string, key: string) => {
                let ratingUnitIdAndContextId = key.split(":");
                let ratingUnitId = ratingUnitIdAndContextId[0];
                let contextId = ratingUnitIdAndContextId[1];
                let selectedOptionValue = value;

                let ratingRegistrationInfo = new RatingRegistrationInfo();
                ratingRegistrationInfo.contextId = contextId;
                ratingRegistrationInfo.selectedOption = selectedOptionValue;

                let ratingRegistrationInfoList = this.ratingRegistrationData.get(ratingUnitIdAndContextId[0])
                if(!ratingRegistrationInfoList){
                    ratingRegistrationInfoList = new Array<RatingRegistrationInfo>();
                }

                ratingRegistrationInfoList.push(ratingRegistrationInfo);
                this.ratingRegistrationData.set(ratingUnitId, ratingRegistrationInfoList)
            });

            this.ratingRegistrationData.forEach((value: Array<RatingRegistrationInfo>, key: string) => {
                console.log("rating registration data for: " + key);
                value.forEach(ratingRegistrationInfo => {
                    console.log("   context id: " + ratingRegistrationInfo.contextId + ", checkpoint value: " + ratingRegistrationInfo.selectedOption);
                })
            });
        }
    }

    quitRating(){
        console.log("quit rating");
        this.router.navigate(['/'])
    }

    updateRating(ratingUnitId: string, contextId: string, checkPointValue: string){
        this.ratingUnitContextSelectionMap.set(ratingUnitId + ":" + contextId, checkPointValue);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.wavesurfer.pause()
            this.isPlaying = false;
            document.getElementById('audioIcon').className = 'far fa-play-circle';
        } else {
            this.wavesurfer.play();
            this.isPlaying = true;
            document.getElementById('audioIcon').className = 'far fa-pause-circle';
        }
    }

    ngOnDestroy() {
        this.appComponent.showDefaultHeader = true;
    }
}
