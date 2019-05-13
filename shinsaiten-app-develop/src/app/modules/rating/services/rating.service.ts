import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TestSetManual } from '../models/test-set-manual.model';
import { RatingInstructionsManual } from '../models/rating-instructions-manual.model';
import { RatingBasis } from '../models/rating-basis.model';
import { RatingUnit } from '../models/rating-unit.model';
import { environment } from '../../../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RatingService {
    isRatingBlockAvailable: boolean;
    ratingUnits: Array<RatingUnit>;
    constructor(private http: HttpClient) { }

/*    loadAnswerOfUnit(): Observable<UnitAnswer> {
        //return this.http.get<UnitAnswer>(environment.baseUrl+"/rating/loadAnswerOfUnit");
    }*/

    isRatingAssignmentBlockExist(testBrandId: string){
        return this.http.get<boolean>(environment.baseUrl+'/rating/loadRatingAssignmentBlockInfo/' + testBrandId);
    }

    getRatingUnits(){
		return this.http.get<any[]>(environment.baseUrl+'/rating/getRatingUnitsInfo/');
    }

    //get rating item answers based on provided rating unit
    getTestSetItemAnswers(ratingUnitId: string){
		return this.http.get<any[]>(environment.baseUrl+'/rating/loadAnswerOfUnit/');
    }
    //end of rating unit wise item answers

    //get rating basis based on provided rating unit
    getRatingBasis(ratingUnitId: string){
        return this.http.get<any[]>(environment.baseUrl+'/rating/getRatingBasis/' + ratingUnitId);
    }
    //end of rating unit wise rating basis

    getTestSetManual(){
        return this.http.get<TestSetManual>(environment.baseUrl+'/rating/getTestSetManual/');
    }

    getRatingInstructionsManual(ratingUnitId: string){
        return this.http.get<any>(environment.baseUrl+'/rating/getRatingInstructionsManual/' + ratingUnitId);
    }

    getTestSetItemAnswersForUnit(ratingUnitId: string){
        return this.http.get<any>(environment.baseUrl+'/rating/getAnswersOfUnit/' + ratingUnitId);
    }
}
